const Sequelize = require("sequelize");
const banco = require("../db.js");

const Funcionario = banco.define("funcionario", {
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
        primaryKey: false,
        unique: true

    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },
    cargo:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },
    salario:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        primaryKey: false    
    }


});

module.exports = Funcionario;