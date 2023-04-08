const router = require("express").Router();
const Departamento = require('../modelo/departamento');

// cadastrando departamento
router.post('/adicionar', async (req, res) => {
    await Departamento.sync();
    console.log(`inserindo departamento ${req.body.nome} no banco`);
    const departamento = await Departamento.create({
        nome: req.body.nome,
        sala: req.body.sala,
        telefone: req.body.telefone
    })
    console.log(req.body)
    res.json(departamento);
});

// listando todos os departamentos
router.get('/listartodos', async (req, res) => {
    console.log("Muito sexo");
    await Departamento.sync();
    console.log(`listando todos departamentos ${req.body.nome} no banco`);
    const departamentos = await Departamento.findAll();

    res.send(JSON.stringify(departamentos, null, 2));
});

// listar unico departamento
router.get('/listardepartamento/:nome', async (req, res) => {
    await Departamento.sync();
    console.log(`listando departamento ${req.params.nome}`);
    const departamento = await Departamento.findOne({
        where: { nome: req.params.nome }
    });

    res.json(departamento);
});

// deletando departamento
router.delete('/excluir/:nome', async (req, res) => {
    await Departamento.sync();
    const departamento = await Departamento.destroy({
        where:{nome: req.params.nome}
    });

    res.send(`departamento ${req.params.nome} excluido!`);
});

// editar departamento
router.put('/editar/:nome', async (req, res) => {
    await Departamento.sync();

    const departamento = await Departamento.update({
        nome: req.body.nome,
        sala: req.body.sala,
        telefone: req.body.telefone
    }, {
        where:{nome: req.params.nome}
    });

    res.send(`departamento ${req.params.nome} editado!`);
});


module.exports = router;