const router = require("express").Router();
const Funcionario = require('../modelo/funcionario');

// cadastrando funcionario
router.post('/adicionar', async (req, res) => {
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
});

// listando todos os funcionarios
router.get('/listartodos', async (req, res) => {
    await Funcionario.sync();
    console.log(`listando todos funcionarios ${req.body.nome} no banco`);
    const funcionarios = await Funcionario.findAll();

    res.send(JSON.stringify(funcionarios, null, 2));
});

// listar unico funcionario
router.get('/listarfuncionario/:email', async (req, res) => {
    await Funcionario.sync();
    console.log(`listando funcionario ${req.body.email}`);
    const funcionario = await Funcionario.findOne({ 
        where: { email: req.params.email }
    });
    
    res.json(funcionario);
});

// deletando funcionario
router.delete('/excluir/:email', async (req, res) => {
    await Funcionario.sync();
    const funcionario = await Funcionario.destroy({
        where: { email: req.params.email }
    });
    
    res.send(`funcionario ${req.params.email} excluido!`);
});

// editar funcionario
router.put('/editar/:email', async (req, res) => {
    await Funcionario.sync();

    const funcionario = await Funcionario.update({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        salario: req.body.salario,
        cargo: req.body.cargo
    }, {
        where:{email: req.params.email}
    });
    
    res.send(`funcionario ${req.params.email} editado!`);
});


module.exports = router;