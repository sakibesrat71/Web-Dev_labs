
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const borrow_history = sequelize.define(
    "borrow_history",
    {
        user_id: Sequelize.INTEGER,
        book_id: Sequelize.INTEGER,
        book_name: Sequelize.STRING,
        borrow_date: Sequelize.DATE,
        return_date: Sequelize.DATE,
        userEmail: Sequelize.STRING,
    },  
    { tableName: "borrow_history" }
);

borrow_history.sync();

module.exports = borrow_history;