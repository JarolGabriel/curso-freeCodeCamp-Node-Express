const express = require("express");
const { matematica } = require("../datos/cursos.js").infoCursos;

const routerMatematicas = express.Router();

//matematica
routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(matematica));
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultado = matematica.filter((curso) => curso.tema === tema);

  if (resultado.length === 0) {
    return res.status(404).send(`No se puedo encontrar el tema ${tema}`);
  }

  res.send(JSON.stringify(resultado));
});

module.exports = routerMatematicas;
