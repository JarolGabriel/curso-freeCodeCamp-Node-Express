const express = require("express");

const { programacion } = require("../datos/cursos.js").infoCursos;

const routerProgramacion = express.Router();

//Middleware: las funciones middleware se ejecutan: Despues de recibir una solicitud. y/o antes de enviar una respuesta
routerProgramacion.use(express.json());

//programacion
routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }

  res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultado = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultado.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }

  res.send(JSON.stringify(resultado));
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  }

  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch("./:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }

  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("./:id", (req, res) => {
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
  }

  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
