// initialize a sequelize instance

const Sequelize = require('sequelize');
const sequelize = new Sequelize("test", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));

  

module.exports = sequelize;