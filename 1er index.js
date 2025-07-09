const express = require('express');
const app = express();
const port = 3000;

var objetos = [
  {nombre:"Polo",edad:50,nivel:"admin"},
  {nombre:"Leopoldo",edad:100, nivel:"admin"},
  {nombre:"Mario",edad:36, nivel:"admin"},
  {nombre:"Susana",edad:28, nivel:"admin"},
  {nombre:"Carlos",edad:22, nivel:"admin"},
]

app.get('/', (req, res) => {
  res.send(objetos);
});

app.get('/Leopoldo', (req, res) => {
  res.send(objetos[1]);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});