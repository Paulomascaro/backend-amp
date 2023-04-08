const router = require("express").Router();
const FuncionarioDepartamento = require('../modelo/funcionarioDepartamento');

// cadastrando relacao entre funcionario e departamento
router.post('/adicionar', async (req, res) => {
    await FuncionarioDepartamento.sync();
    const funcionarioDepartamento = await FuncionarioDepartamento.create({
        servico: req.body.servico,
        funcionarioId: req.body.funcionarioId,
        departamentoId: req.body.departamentoId
    })
    console.log(req.body)
    res.json(funcionarioDepartamento);
});

// listando relacao entre funcionario e departamento
router.get('/listartodos', async (req, res) => {
    await FuncionarioDepartamento.sync();
    const funcionarioDepartamento = await FuncionarioDepartamento.findAll();

    res.send(JSON.stringify(funcionarioDepartamento, null, 2));
});

// deletando relacao entre funcionario e departamento
router.delete('/excluir/:id', async (req, res) => {
    await FuncionarioDepartamento.sync();
    const funcionarioDepartamento = await FuncionarioDepartamento.destroy({
        where:{id: req.params.id}
    });

    res.send(`relacao entre funcionario e departamento ${req.params.id} excluido!`);
});

// editar relacao entre funcionario e departamento
router.put('/editar/:id', async (req, res) => {
    await FuncionarioDepartamento.sync();

    const funcionarioDepartamento = await FuncionarioDepartamento.update({
        servico: req.body.servico
    }, {
        where:{id: req.params.id}
    });

    res.json(funcionarioDepartamento);
});


module.exports = router;