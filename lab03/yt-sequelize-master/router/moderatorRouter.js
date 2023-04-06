const express = require('express');
const routers = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');
const loggedin = require('../middleware/loggedin');
const borrow_table = require('../model/borrow_table');
const fine_table = require('../model/fine_table');
const book_table = require('../model/book_table');

// router to get total number of users, total books and fined users
routers.get('/getStats', async (req, res) => {
    const users = await user_table.findAll();
    const books = await book_table.findAll();
    const fines = await fine_table.findAll();
    const stats = {
        users: users.length,
        books: books.length,
        fines: fines.length,
    };
    console.log(stats);
    res.json(stats);
});

module.exports = routers;