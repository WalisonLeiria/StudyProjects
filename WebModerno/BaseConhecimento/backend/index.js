const app = require("express")();
const consign = require("consign");
const db = require("./config/db.js");

app.db = db;

/* O Consign serve para gerenciar as dependencias do projeto */
consign()
  .then("./config/middlewares.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(3000, () => {
  console.log("Backend executando...");
});