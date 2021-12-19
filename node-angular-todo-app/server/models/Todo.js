const { DataTypes } = require("sequelize");
const DB = require("../database/connection");

const Todo = DB.define(
    "Todo",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        task: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        isDone: DataTypes.BOOLEAN,
    },
    { tableName: "todos", freezeTableName: true }
);

module.exports = Todo;
