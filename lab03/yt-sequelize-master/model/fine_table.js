
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const fine_table = sequelize.define(
    "fine_table",
    {
        user_id: Sequelize.INTEGER,
        book_id: Sequelize.INTEGER,
        book_name: Sequelize.STRING,
        borrow_date: Sequelize.DATE,
        return_date: Sequelize.DATE,
        userEmail: Sequelize.STRING,
        fine: Sequelize.INTEGER,
        finePayed: Sequelize.STRING,
        finePayingDate: Sequelize.DATE,
    },  
    { tableName: "fine_table" }
);

fine_table.sync();

module.exports = fine_table;