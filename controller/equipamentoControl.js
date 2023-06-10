const router = require("express").Router();
const Equipamento = require('../modelo/index').Equipamento;

// cadastrando equipamento
router.post('/adicionar', async (req, res) => {
    try {
        if(req.body.nome != null && req.body.categoria != null && req.body.id_comodo != null) {
            await Equipamento.sync();
            console.log(`inserindo funcionario ${req.body.nome} no banco`);
            const equipamento = await Equipamento.create({
                nome: req.body.nome,
                categoria: req.body.categoria,
                id_comodo: req.body.id_comodo
            })
            res.json(equipamento);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listando todos os equipamentos
router.get('/listartodos', async (req, res) => {
    try {
        await Equipamento.sync();
        console.log(`listando todos equipamentos ${req.body.nome} no banco`);
        const equipamentos = await Equipamento.findAll();

        res.send(JSON.stringify(equipamentos, null, 2));
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listar unico equipamento
router.get('/listarequipamento/:nome', async (req, res) => {
    try {
        await Equipamento.sync();
        console.log(`listando equipamento ${req.body.nome}`);
        const equipamento = await Equipamento.findOne({
            where: {nome: req.params.nome}
        });

        res.json(equipamento);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// deletando equipamento
router.delete('/excluir/:nome', async (req, res) => {
    try {
        await Equipamento.sync();
        const equipamento = await Equipamento.destroy({
            where: {nome: req.params.nome}
        });

        res.send(`equipamento ${req.params.nome} excluido!`);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// editar equipamento
router.put('/editar/:nome', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.categoria != null && req.body.id_comodo != null) {
            await Equipamento.sync();
            const equipamento = await Equipamento.update({
                nome: req.body.nome,
                categoria: req.body.categoria,
                id_comodo: req.body.id_comodo
            }, {
                where: {nome: req.params.nome}
            });

            res.send(`equipamento ${req.params.nome} editado!`);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});


module.exports = router;