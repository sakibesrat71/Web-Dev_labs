
// import sequilize
const Sequelize = require('sequelize');

// const sequelize = new Sequelize("test", "root", "password", {
//     dialect: "mysql",
//     host: "localhost"
//   });

const sequelize = require('./dbinitializer');

const book_table = sequelize.define(
    "book_table",
    {
      name: Sequelize.STRING,
      author: Sequelize.TEXT,
      genre: Sequelize.STRING,
    },
    { tableName: "book_table" }
  );
  
  book_table.sync();

  module.exports = book_table;