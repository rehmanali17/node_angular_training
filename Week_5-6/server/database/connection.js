const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
    username: "postgres",
    password: "074269",
    host: "localhost",
    database: "todos_management",
    dialect: "postgres",
    logging: false,
});
