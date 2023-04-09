const jwt = require('jsonwebtoken');
const loggedin = require('../middleware/loggedin');
const notifications = require('../model/notifications');
const fine_table = require('../model/fine_table');
const book_table = require('../model/book_table');
const borrow_table = require('../model/borrow_table');

module.exports = async function dateRemainingNotification(req, res, next) {

    console.log("dateRemainingNotification middleware called");
    const token = req.header('auth-token');
    if (!token) {
        console.log("nai token");
        return res.status(407).json({ msg: 'No token, authorization denied' });
    }
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);

        console.log("token verified");

        
        const borrowHistory = await borrow_table.findAll({
            where: {
                user_id: decoded._id,
            },
        });
        borrowHistory.forEach(async (borrowedBook) => {
            const dayRemaining = (borrowedBook.return_date - new Date()) / 86400000;
            if (true) {

                const notification = await notifications.build({
                    user_id: decoded.id,
                    notificationType: "borrow",
                    notificationMessage: "You have " + dayRemaining + " days remaining to return " + borrowedBook.book_name,
                    notificationDate: new Date(),
                });
                try {
                    const savedNotification = await notification.save();
                    console.log("notification saved");
                }
                catch (err) {
                    console.log(err);
                }
            }
        });

        next();

    }
    catch (err) {
        res.status(405).json({ msg: 'Token is not valid' });
    }


}