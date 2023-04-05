
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const borrow_table = sequelize.define(
    "borrow_table",
    {
        user_id: Sequelize.INTEGER,
        book_id: Sequelize.INTEGER,
        book_name: Sequelize.STRING,
        borrow_date: Sequelize.DATE,
        return_date: Sequelize.DATE,
        userEmail: Sequelize.STRING,
    },  
    { tableName: "borrow_table" }
);

borrow_table.sync();

module.exports = borrow_table;