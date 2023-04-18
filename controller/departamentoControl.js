const router = require("express").Router();
const Departamento = require('../modelo/departamento');

// cadastrando departamento
router.post('/adicionar', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.sala != null && req.body.telefone != null) {
            await Departamento.sync();
            console.log(`inserindo departamento ${req.body.nome} no banco`);
            const departamento = await Departamento.create({
                nome: req.body.nome,
                sala: req.body.sala,
                telefone: req.body.telefone
            })
            console.log(req.body)
            res.json(departamento);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listando todos os departamentos
router.get('/listartodos', async (req, res) => {
    try {
        await Departamento.sync();
        console.log(`listando todos departamentos ${req.body.nome} no banco`);
        const departamentos = await Departamento.findAll();

        res.send(JSON.stringify(departamentos, null, 2));
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listar unico departamento
router.get('/listardepartamento/:nome', async (req, res) => {
    try {
        await Departamento.sync();
        console.log(`listando departamento ${req.params.nome}`);
        const departamento = await Departamento.findOne({
            where: {nome: req.params.nome}
        });

        res.json(departamento);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// deletando departamento
router.delete('/excluir/:nome', async (req, res) => {
    try {
        await Departamento.sync();
        const departamento = await Departamento.destroy({
            where: {nome: req.params.nome}
        });

        res.send(`departamento ${req.params.nome} excluido!`);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// editar departamento
router.put('/editar/:nome', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.sala != null && req.body.telefone != null) {
            await Departamento.sync();

            const departamento = await Departamento.update({
                nome: req.body.nome,
                sala: req.body.sala,
                telefone: req.body.telefone
            }, {
                where: {nome: req.params.nome}
            });

            res.send(`departamento ${req.params.nome} editado!`);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});


module.exports = router;