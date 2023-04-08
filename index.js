const express = require("express");
const app = express();
const port = 8888

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/usuario", require("./controller/usuarioControl"));

app.use("/funcionario", require("./controller/funcionarioControl.js"));

app.use("/departamento", require("./controller/departamentoControl.js"));

app.use("/funcionarioDepartamento", require("./controller/funcionarioDepartamentoControl"))

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})