const express = require("express");
const app = express();
const port = 8003

app.get('/oi', (req, res) => {
  res.send('ola mundo!')
})

app.post('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})