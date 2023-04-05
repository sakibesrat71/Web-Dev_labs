const express = require('express');
const routers=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');
const loggedin = require('../middleware/loggedin');

// router to borrow a book
routers.post('/borrow',loggedin, async (req, res) => {
    // get user id from token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;
    const userEmail = decoded.email;

    const borrow_table = await borrow_table.create({
        book_id,
        user_id,
        borrow_date,
        return_date,
        userEmail,
    });
    res.json(borrow_table);
});

module.exports=routers;