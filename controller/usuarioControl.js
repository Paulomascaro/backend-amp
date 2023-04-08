const router = require("express").Router();
const Usuario = require('../modelo/usuario');

// cadastrando usuario
router.post('/adicionar', async (req, res) => {
    await Usuario.sync();
    console.log(`inserindo usuario ${req.body.nome} no banco`);
    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })
    console.log(req.body)
    res.json(usuario);
});

// listando todos os usuarios
router.get('/listartodos', async (req, res) => {
    await Usuario.sync();
    console.log(`listando todos usuarios ${req.body.nome} no banco`);
    const usuarios = await Usuario.findAll();

    res.send(JSON.stringify(usuarios, null, 2));
});

// listar unico usuario
router.get('/listarusuario/:email', async (req, res) => {
    await Usuario.sync();
    console.log(`listando usuario ${req.body.email}`);
    const usuario = await Usuario.findOne({ 
        where: { email: req.params.email }
    });
    
    res.json(usuario);
});

// deletando usuario
router.delete('/excluir/:email', async (req, res) => {
    await Usuario.sync();
    const usuario = await Usuario.destroy({
        where:{email: req.params.email}
    });
    
    res.send(`usuario ${req.params.email} excluido!`);
});

// editar usuario
router.put('/editar/:email', async (req, res) => {
    await Usuario.sync();

    const usuario = await Usuario.update({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }, {
        where:{email: req.params.email}
    });
    
    res.send(`usuario ${req.params.email} editado!`);
});


module.exports = router;