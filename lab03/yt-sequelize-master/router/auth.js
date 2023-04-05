const express = require('express');
const routers=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');
const otp_cache = require('../model/otpCache');
const nodemailer = require('nodemailer');

// implement user signup
routers.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    // check user already exists
    const user = await user_table.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.send("user already exists");
      // res.status(401);
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const saveUser = user_table.build({
      name: name,
      email: email,
      password: hashPassword,
      isVerified: false,
    });
    try {
      await saveUser.save();
      res.send("user signed up");
    }
    catch (err) {
      console.log(err);
    }
  });

    // implement user login
    routers.post("/login", async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
      
        // check user already exists
        const user = await user_table.findOne({
          where: {
            email: email,
          },
        });
        if (!user) {
          res.send("user not found");
          return;
        }
        // check password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          res.send("invalid password");
          return;
        }
        // check user verified
        if (!user.isVerified) {
          res.send("user not verified");
          return;
        }
        // create and assign a token
        const token = jwt.sign({ _id: user.id,email:user.email }, process.env.TOKEN);
        res.header('auth-token', token).status(200).send(token);
      });

    // send otp using nodemailer
    routers.post("/sendotp", async (req, res) => {
        const email = req.body.email;
        const otp = Math.floor(1000 + Math.random() * 900000);
        const saveOtp = otp_cache.build({
          email: email,
          otp: otp,
          createdAt: Date.now(),
        });
        try {
          await saveOtp.save();
          // send otp
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for LMS verification",
            text: "Your OTP is " + otp,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
          );
          res.send("otp sent");
        }
        catch (err) {
          console.log(err);
        }
      });

    // verify otp
    routers.post("/verifyotp", async (req, res) => {
        const email = req.body.email;
        const otp = req.body.otp;

        // check otp exists
        const otpData = await otp_cache.findOne({
          where: {
            email: email,
          },
        });
        if (!otpData) {
          res.send("otp not found");
          return;
        }
        // check otp
        if (otpData.otp != otp) {
          res.send("invalid otp");
          return;
        }
        // check otp expiry
        const otpExpiry = otpData.createdAt;
        const currentTime = Date.now();
        const diff = currentTime - otpExpiry;
        if (diff > 300000) {
          res.send("otp expired");
          return;
        }
        // update user table
        const user = await user_table.findOne({
          where: {
            email: email,
          },
        });
        user.isVerified = true;
        try {
          await user.save();
          await otpData.destroy();
          res.send("otp verified");
        }
        catch (err) {
          console.log(err);
        }
      });

      // check user logged in
      routers.get("/loggedin", async (req, res) => {
        console.log("loggedin edhukse");
        // get Authorization bearer token
        const token = req.header("auth-token");
        console.log(token);
        if (!token) {
          res.status(202).send("user not logged in");
          return; 
        }
        const decoded = jwt.verify(token, process.env.TOKEN);
        const user_id = decoded._id;
        const userEmail = decoded.email;
        const user = await user_table.findOne({
          where: {
            id: user_id,
          },    
        });
        if (!user) {
          res.status(203).send("user not found");
          return;
        }
        res.status(200).send(user);
      });

module.exports=routers;