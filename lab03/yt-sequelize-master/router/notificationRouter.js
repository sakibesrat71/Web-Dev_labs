const express = require('express');
const routers = express.Router();
const book_table = require('../model/book_table');
const borrow_table = require('../model/borrow_table');
const borrow_history = require('../model/borrow_history');
const loggedin = require('../middleware/loggedin');
const jwt = require('jsonwebtoken');
const notifications = require('../model/notifications');
const dateRemainingNotification = require('../middleware/dateRemainingNotification');
const fineNotification = require('../middleware/fineNotification');

// GET /notification

routers.get('/hh', loggedin,dateRemainingNotification,fineNotification, async (req, res) => {
    // get the user id from the token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;

    console.log(user_id);
    // get the latest 4 notifications
    const notification = await notifications.findAll({
        where: {
            user_id: user_id,
        },
        limit: 4,
        order: [['createdAt', 'DESC']],  
    });

   // console.log(notification);
  
    // get the oldest 3 notifications
    const notification2 = await notifications.findAll({
        where: {
            user_id: user_id,
        },
        limit: 3,
        offset: 4,
        order: [['createdAt', 'DESC']],
    });

    // delete notification2 from the database
    notification2.forEach(async (notification) => {
        const deletedNotification = await notification.destroy();
    });

    res.json(notification);
}
);

module.exports = routers;

