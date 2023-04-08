const Sequelize = require("sequelize");
const banco = require("../db.js");
const Funcionario = require("./funcionario.js");
const Departamento = require("./departamento");

const FuncionarioDepartamento = banco.define("funcionarioDepartamento", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    servico: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: false
    }
});

Funcionario.belongsToMany(Departamento, { through: FuncionarioDepartamento });
Departamento.belongsToMany(Funcionario, { through: FuncionarioDepartamento });

module.exports = FuncionarioDepartamento;

