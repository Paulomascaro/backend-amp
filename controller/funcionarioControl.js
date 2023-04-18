const router = require("express").Router();
const Funcionario = require('../modelo/funcionario');

// cadastrando funcionario
router.post('/adicionar', async (req, res) => {
    try {
        if(req.body.nome != null && req.body.email != null && req.body.senha != null && req.body.salario != null && req.body.cargo != null) {
            await Funcionario.sync();
            console.log(`inserindo funcionario ${req.body.nome} no banco`);
            const funcionario = await Funcionario.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                salario: req.body.salario,
                cargo: req.body.cargo
            })
            console.log(req.body)
            res.json(funcionario);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listando todos os funcionarios
router.get('/listartodos', async (req, res) => {
    try {
        await Funcionario.sync();
        console.log(`listando todos funcionarios ${req.body.nome} no banco`);
        const funcionarios = await Funcionario.findAll();

        res.send(JSON.stringify(funcionarios, null, 2));
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listar unico funcionario
router.get('/listarfuncionario/:email', async (req, res) => {
    try {
        await Funcionario.sync();
        console.log(`listando funcionario ${req.body.email}`);
        const funcionario = await Funcionario.findOne({
            where: {email: req.params.email}
        });

        res.json(funcionario);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// deletando funcionario
router.delete('/excluir/:email', async (req, res) => {
    try {
        await Funcionario.sync();
        const funcionario = await Funcionario.destroy({
            where: {email: req.params.email}
        });

        res.send(`funcionario ${req.params.email} excluido!`);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// editar funcionario
router.put('/editar/:email', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.email != null && req.body.senha != null && req.body.salario != null && req.body.cargo != null) {
            await Funcionario.sync();
            const funcionario = await Funcionario.update({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                salario: req.body.salario,
                cargo: req.body.cargo
            }, {
                where: {email: req.params.email}
            });

            res.send(`funcionario ${req.params.email} editado!`);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});


module.exports = router;