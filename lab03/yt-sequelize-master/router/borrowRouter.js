const express = require('express');
const routers = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_table = require('../model/user_table');
const loggedin = require('../middleware/loggedin');
const borrow_table = require('../model/borrow_table');
const fine_table = require('../model/fine_table');
const borrow_history = require('../model/borrow_history');

// router to borrow a book
routers.post('/borrow', loggedin, async (req, res) => {
    // get user id from token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;
    const userEmail = decoded.email;

    const book_id = req.body.book_id;
    // CHANGE THIS TO ORIGINAL
    const borrow_date = req.body.borrow_date;
    // const borrow_date = Date.parse(new Date()) - (1000 * 60 * 60 * 24 * 11);
    // CHANGE THIS TO ORIGINAL
    const return_date = req.body.return_date;
    // const return_date = Date.parse(new Date());
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
            borrow_date: borrow_date,
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

// fine users if book is not returned on time
routers.get('/fine', loggedin, async (req, res) => {
    console.log("fine edhukse");
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
    borrowedBooks.forEach(async (borrowedBook) => {
        const return_date = borrowedBook.return_date;
        const today = new Date();
        if (today > return_date) {
            // fine user 20 rupees per day
            const finedMoney = (today - return_date) * 0.000115741;

            console.log(finedMoney);

            // check if user is already fined
            const fined = await fine_table.findOne({
                where: {
                    user_id: user_id,
                    book_id: borrowedBook.book_id,
                },
            });
            if (fined) {
                // update fine
                fined.fine = fined.fine + finedMoney;
                try {
                    const savedFine = await fined.save();
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {

                const fine = await fine_table.build({
                    user_id,
                    userEmail,
                    book_id: borrowedBook.book_id,
                    book_name: borrowedBook.book_name,
                    borrow_date: borrowedBook.borrow_date,
                    return_date: borrowedBook.return_date,
                    fine: finedMoney,
                    finePaid: "NO",
                });
                try {
                    const savedFine = await fine.save();
                    
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    });

    // get all fines of a user
    const fines = await fine_table.findAll({
        where: {
            user_id: user_id,
        },
    });
    res.json(fines);
});

// get all the borrowed books
routers.get('/allBorrowedBooks', async (req, res) => {
    const borrowedBooks = await borrow_table.findAll();
    res.json(borrowedBooks);
});

// return a book
routers.post('/return', async (req, res) => {
    // get user id from body
    const user_id = req.body.user_id;
    const book_id = req.body.book_id;

    // delete the book from borrow table
    const borrowedBook = await borrow_table.findOne({
        where: {
            user_id: user_id,
            book_id: book_id,
        },
    });
    if (borrowedBook) {
        try {
            const borrowHistory = await borrow_history.build({
                book_id: borrowedBook.book_id,
                book_name: borrowedBook.book_name,
                user_id: borrowedBook.user_id,
                borrow_date: borrowedBook.borrow_date,
                return_date: new Date(),
                userEmail: borrowedBook.userEmail,
            });
            const savedBorrowHistory = await borrowHistory.save();
            const deletedBorrowedBook = await borrowedBook.destroy();
            res.json(deletedBorrowedBook);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res.send("book not borrowed");
    }
});

// fine payed route
routers.put('/finePayed', async (req, res) => {
    const user_id = req.body.user_id;
    const book_id = req.body.book_id;
    const fine = await fine_table.findOne({
        where: {
            user_id: user_id,
            book_id: book_id,
        },
    });
    const borrow = await borrow_table.findOne({
        where: {
            user_id: user_id,
            book_id: book_id,
        },
    });
    if (fine) {
        await fine.destroy();
        if (borrow) {
            await borrow.destroy();
        }
        
    }
    

    else {
        res.send("fine not found");
    }
})

// delete fine route
routers.delete('/deleteFine', async (req, res) => {
    console.log(req.body);
    const fine = await fine_table.findOne({
        where: {
            user_id: req.body.user_id,
            book_id: req.body.book_id,
        },
    });
    if (fine) { 
        try {
            const deletedFine = await fine.destroy();
            res.json(deletedFine);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res.send("fine not found");
    }
})




module.exports = routers;