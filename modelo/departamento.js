const Sequelize = require("sequelize");
const banco = require("../db.js");
const Funcionario = require("./funcionario");

const Departamento = banco.define("departamento", {
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
    sala:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false,
        unique: true

    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    }
});

module.exports = Departamento;