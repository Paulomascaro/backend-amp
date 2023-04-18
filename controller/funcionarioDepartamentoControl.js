const router = require("express").Router();
const FuncionarioDepartamento = require('../modelo/funcionarioDepartamento');

// cadastrando relacao entre funcionario e departamento
router.post('/adicionar', async (req, res) => {
    try {
        if (req.body.servico != null) {
            await FuncionarioDepartamento.sync();
            const funcionarioDepartamento = await FuncionarioDepartamento.create({
                servico: req.body.servico,
                funcionarioId: req.body.funcionarioId,
                departamentoId: req.body.departamentoId
            })
            console.log(req.body)
            res.json(funcionarioDepartamento);
        } else {
            res.status(422).json({Erro: "Parametros faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// listando relacao entre funcionario e departamento
router.get('/listartodos', async (req, res) => {
    try {
        await FuncionarioDepartamento.sync();
        const funcionarioDepartamento = await FuncionarioDepartamento.findAll();

        res.send(JSON.stringify(funcionarioDepartamento, null, 2));
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// deletando relacao entre funcionario e departamento
router.delete('/excluir/:id', async (req, res) => {
    try {
        await FuncionarioDepartamento.sync();
        const funcionarioDepartamento = await FuncionarioDepartamento.destroy({
            where: {id: req.params.id}
        });

        res.send(`relacao entre funcionario e departamento ${req.params.id} excluido!`);
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});

// editar relacao entre funcionario e departamento
router.put('/editar/:id', async (req, res) => {
    try {
        if (req.body.servico != null && req.body.funcionarioId != null && req.departamentoId != null) {
            await FuncionarioDepartamento.sync();

            const funcionarioDepartamento = await FuncionarioDepartamento.update({
                servico: req.body.servico
            }, {
                where: {id: req.params.id}
            });

            res.json(funcionarioDepartamento);
        } else {
            res.status(422).json({Erro: "Parametro faltando!"})
        }
    } catch (e) {
        res.status(500).json({Erro:"Erro no servidor!"})
    }
});


module.exports = router;