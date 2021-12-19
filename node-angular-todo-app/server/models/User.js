const { DataTypes } = require("sequelize");
const DB = require("../database/connection");
const Todo = require("./Todo");

const User = DB.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    { tableName: "users", freezeTableName: true }
);

User.hasMany(Todo, { foreignKey: "userId", as: "Todo" });

Todo.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
