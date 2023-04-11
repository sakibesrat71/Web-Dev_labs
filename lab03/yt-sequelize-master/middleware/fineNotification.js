const jwt = require('jsonwebtoken');
const loggedin = require('../middleware/loggedin');
const notifications = require('../model/notifications');
const fine_table = require('../model/fine_table');

const book_table = require('../model/book_table');

module.exports = async function fineNotification(req, res, next) {

    // console.log("fineNotification middleware called");

    // get the user id from the token
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user_id = decoded._id;

    // get the latest 2 fines of the user
    const fines = await fine_table.findAll({
        where: {
            user_id: user_id,
        },
        limit: 2,
        order: [
            ['createdAt', 'DESC']
        ],
    });

    fines.forEach(async (fine) => {
        // check if the user is already notified

        // create a notification
        const newNotification = await notifications.build({
            user_id: user_id,
            notification_type: "fine",
            notification: `You have to pay ${fine.fine} taka as fine for ${fine.book_name}`,
        });
        try {
            const savedNotification = await newNotification.save();
            console.log("FINE notification saved");
        }
        catch (err) {
            console.log(err);
        }

    });

    next();

}