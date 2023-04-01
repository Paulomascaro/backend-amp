const router = require("express").Router();
const Usuario = require('../modelo/usuario');


router.post('/add', async (req, res) => {
    await Mestre.sync();
    console.log(`inserindo mestre ${req.body.nome} no banco`);
    const mestre = await Mestre.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
    })
    console.log(req.body)
    res.json(mestre)
});

module.exports = router;