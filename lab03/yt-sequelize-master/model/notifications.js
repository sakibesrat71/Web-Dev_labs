
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const notifications = sequelize.define(
    "notifications",
    {
        user_id: Sequelize.INTEGER,
        notificationType: Sequelize.STRING,
        notificationMessage: Sequelize.STRING,
        notificationDate: Sequelize.DATE
    },   
    { tableName: "notifications" }
);

notifications.sync();

module.exports = notifications;