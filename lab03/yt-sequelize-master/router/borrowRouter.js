const express = require('express');
const routers = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');
const loggedin = require('../middleware/loggedin');
const borrow_table = require('../model/borrow_table');

// router to borrow a book
routers.post('/borrow', loggedin, async (req, res) => {
    // get user id from token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;
    const userEmail = decoded.email;

    const book_id = req.body.book_id;

    const borrow_date = req.body.borrow_date;
    const return_date = req.body.return_date;
    const book_name = req.body.book_name;

    // check if book is already borrowed
    const borrowedBook2 = await borrow_table.findOne({
        where: {
            book_id: book_id,
            user_id: user_id,
        },
    });
    if (borrowedBook2) {
        res.send("book already borrowed");
        return;
    }
    else {
        borrowedBook = await borrow_table.build({
            book_id,
            book_name,
            user_id,
            borrow_date,
            return_date,
            userEmail,
        });
        try {
            const savedBorrowedBook = await borrowedBook.save();
            res.json(savedBorrowedBook);
        }
        catch (err) {
            console.log(err);
        }
    }
});

// router to get all borrowed books of a user
routers.get('/borrowedBooks', loggedin, async (req, res) => {
    // get user id from token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;
    const userEmail = decoded.email;

    const borrowedBooks = await borrow_table.findAll({
        where: {
            user_id: user_id,
        },
    });
    res.json(borrowedBooks);
});

module.exports = routers;