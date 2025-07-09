const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var objetos = [
  {nombre:"Polo",edad:50,nivel:"admin"},
  {nombre:"Leopoldo",edad:100, nivel:"admin"},
  {nombre:"Mario",edad:36, nivel:"admin"},
  {nombre:"Susana",edad:28, nivel:"admin"},
  {nombre:"Carlos",edad:22, nivel:"admin"},
]
var datos;

let con = mysql.createConnection({ //con = conexión
  host: "localhost",
  user: "root",
  password: "",
  database: "animales_db" //Al poner un campo nuevo se ponen comas ",".
});

function Autorizar(req, res, next){
  const F1 = req.headers.authorization; //Hay 3 "=" y se usa para comparar valor y el tipo de dato.
  if(F1 === "A1C2E3"){
    next();
  }
  else{
    res.send("No hay autorización");
  }
}

con.connect(function(err) {
  if (err) throw err; //err = error, throw = a devolver y en párametro devuelve el error, si no que esta hecho.
  con.query("SELECT * FROM animales",
   function (err, result, fields) {
    if (err) throw err;
    datos = result;
  });
});


app.get('/', Autorizar, (req, res) => {
  res.send(datos);
});

app.get('/datos', (req, res) => {
  res.send(datos);
});

app.get('/Leopoldo', (req, res) => {
  res.send(objetos[1]);
});

app.post('/insertar', Autorizar, (req, res) =>{
  const data = req.body.nombre;  //Con estas dos lineas ya se manda y recibe la variable.
  const edad = req.body.edad;
  const dim = req.body.dim;
  console.log('Datos recibidos:' + data);
  console.log('Datos recibidos:' + edad);
  console.log('Datos recibidos:' + dim);

 con.query(
  ('INSERT INTO animales(nombre,edad,dimension) VALUES('${nombre}','${edad}','${tam}'');
    if (err) throw err;
      datos = result;
        res.json({message: 'Datos recibidos exitosamente'}); //Con estas dos lineas se confirma el mensaje.
    });

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});