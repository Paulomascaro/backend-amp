const router = require("express").Router();
const Usuario = require('../modelo/index').Usuario;

// login
router.post('/login', async (req, res) => {
    try {
        if(req.body.email != null && req.body.senha != null) {
            const usuario = await Usuario.findOne({where: {email: req.body.email}})
            if(usuario != null){
                if(req.body.senha === usuario.senha){
                    res.status(200).json({success: true})
                } else {
                    res.status(401).json({Erro: "Senha Invalida!"})
                }
            } else{
                res.status(401).json({Erro: "Usuario não encontrado!"})
            }
        } else {
            res.status(422).json({Erro: "Parametros faltando"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// cadastrando usuario
router.post('/adicionar', async (req, res) => {
    try {
        await Usuario.sync();
        if(req.body.nome != null && req.body.senha != null && req.body.email != null) {
            console.log(`inserindo usuario ${req.body.nome} no banco`);
            const usuario = await Usuario.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })
            console.log(req.body)
            res.json(usuario)
        } else {
            res.status(422).json({Erro: "Parametros faltando"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// // listando todos os usuarios
// router.get('/listartodos', async (req, res) => {
//     try {
//         await Usuario.sync();
//         console.log(`listando todos usuarios ${req.body.nome} no banco`);
//         const usuarios = await Usuario.findAll();
//
//         res.send(JSON.stringify(usuarios, null, 2));
//     } catch (e) {
//         res.status(500).json({Erro:"Erro no servidor!"})
//     }
// });

// // listar unico usuario
// router.get('/listarusuario/:email', async (req, res) => {
//     try {
//         await Usuario.sync();
//         console.log(`listando usuario ${req.body.email}`);
//         const usuario = await Usuario.findOne({
//             where: {email: req.params.email}
//         });
//
//         res.json(usuario);
//     } catch (e) {
//         res.status(500).json({Erro:"Erro no servidor!"})
//     }
// });

// deletando usuario
// router.delete('/excluir/:email', async (req, res) => {
//     try {
//         await Usuario.sync();
//         const usuario = await Usuario.destroy({
//             where: {email: req.params.email}
//         });
//
//         res.send(`usuario ${req.params.email} excluido!`);
//     } catch (e) {
//         res.status(500).json({Erro:"Erro no servidor!"})
//     }
// });

// editar usuario
router.put('/editar/:email', async (req, res) => {
    try {
        if (req.body.nome != null && req.body.senha != null && req.body.email != null) {
            await Usuario.sync();

            const usuario = await Usuario.update({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }, {
                where: {email: req.params.email}
            });

            res.send(`usuario ${req.params.email} editado!`);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

module.exports = router;