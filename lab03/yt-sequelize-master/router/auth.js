const express = require('express');
const routers=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');

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
        // create and assign a token
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
      });

module.exports=routers;