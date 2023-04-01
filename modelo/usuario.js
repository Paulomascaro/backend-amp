const Sequelize = require("sequelize");
const banco = require("../db.js");

const Usuario = banco.define("usuario", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    }
});

module.exports = Usuario;