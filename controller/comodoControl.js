const router = require("express").Router();
const Comodo = require('../modelo/index').Comodo;

// cadastrando comodo
router.post('/adicionar', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.area != null && req.body.id_usuario != null) {
            await Comodo.sync();
            console.log(`inserindo comodo ${req.body.nome} no banco`);
            const comodo = await Comodo.create({
                nome: req.body.nome,
                area: req.body.area,
                id_usuario: req.body.id_usuario
            })
            console.log(req.body)
            res.json(comodo);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listando todos os comodos
router.get('/listartodos', async (req, res) => {
    try {
        await Comodo.sync();
        console.log(`listando todos comodo ${req.body.nome} no banco`);
        const comodos = await Comodo.findAll();

        res.send(JSON.stringify(comodos, null, 2));
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listar unico comodo
router.get('/listarcomodo/:nome', async (req, res) => {
    try {
        await Comodo.sync();
        console.log(`listando comodo ${req.params.nome}`);
        const comodo = await Comodo.findOne({
            where: {nome: req.params.nome}
        });

        res.json(comodo);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// deletando departamento
router.delete('/excluir/:nome', async (req, res) => {
    try {
        await Comodo.sync();
        const comodo = await Comodo.destroy({
            where: {nome: req.params.nome}
        });

        res.send(`comodo ${req.params.nome} excluido!`);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// editar comodo
router.put('/editar/:nome', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.area != null) {
            await Comodo.sync();

            const comodo = await Comodo.update({
                nome: req.body.nome,
                area: req.body.area,
                id_usuario: req.body.id_usuario
            }, {
                where: {nome: req.params.nome}
            });

            res.send(`comodo ${req.params.nome} editado!`);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});


module.exports = router;