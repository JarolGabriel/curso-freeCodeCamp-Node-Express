const express = require("express");
const app = express();

const { infoCursos } = require("./datos/cursos.js");

//Router
const routerProgramacion = require("./router/programacion.js");
app.use("/api/cursos/programacion", routerProgramacion);

//router matematicas
const routerMatematicas = require("./router/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

app.get("/", (req, res) => {
  res.send("Mi primer servidor con express. curso 💻");
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`el servidor esta escuchando en el puerto ${PUERTO}...`);
});
