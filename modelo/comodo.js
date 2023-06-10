const Sequelize = require("sequelize");
const banco = require("../db.js");
const Equipamento = require("./equipamento");

const Comodo = banco.define("comodo", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false,
        unique: true
    },
    area:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false
    }
});

module.exports = Comodo;