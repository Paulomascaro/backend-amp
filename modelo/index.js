const Comodo = require("./comodo");
const Equipamento = require("./equipamento");
const Usuario = require("./usuario");


Usuario.hasMany(Comodo, {
    foreignKey: "id_usuario"
})
Comodo.belongsTo(Usuario, {
    constraint: true,
    foreignKey: "id_usuario"
})

Comodo.hasMany(Equipamento, {
    foreignKey: "id_comodo"
})
Equipamento.belongsTo(Comodo, {
    constraint: true,
    foreignKey: "id_comodo"
})

module.exports = {Comodo, Equipamento, Usuario};