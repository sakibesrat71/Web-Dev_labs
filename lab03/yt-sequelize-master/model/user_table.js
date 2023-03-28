
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const user_table = sequelize.define(
    "user_table",
    {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    { tableName: "user_table" }
  );

    user_table.sync();

    module.exports = user_table;