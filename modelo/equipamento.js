const Sequelize = require("sequelize");
const banco = require("../db.js");
const Comodo = require("./comodo");

const Equipamento = banco.define("equipamento", {
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
    categoria: {
        type: Sequelize.ENUM,
        values: ['ALARME', 'CAMERA', 'SENSOR'],
        defaultValue: 'CAMERA'
    }
});

module.exports = Equipamento;