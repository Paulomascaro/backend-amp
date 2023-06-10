const express = require("express");
const app = express();
const port = 8888
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async() => {
  //await db.sync({force:true}) resetar banco
  await db.sync();
})();

app.use("/usuario", require("./controller/usuarioControl"));

app.use("/equipamento", require("./controller/equipamentoControl.js"));

app.use("/comodo", require("./controller/comodoControl.js"));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})