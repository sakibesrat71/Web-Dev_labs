
const Sequelize = require("sequelize");

const sequelize = require("./dbinitializer");

const otp_cache = sequelize.define(
    "otp_cache",
    {
        email: Sequelize.STRING,
        otp: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
    },  
    { tableName: "otp_cache" }
);

otp_cache.sync();

module.exports = otp_cache;