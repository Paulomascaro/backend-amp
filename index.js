const express = require("express");
const app = express();
const port = 8888

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/usuario", require("./controller/usuarioControl"));

app.use("/funcionario", require("./controller/funcionarioControl.js"));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})