const app = require("express")();
const consign = require("consign");
const db = require("./config/db.js");
const mongoose = require("mongoose");
require("./config/mongoDb.js");

// middlewares
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// Config Knex
app.db = db;
app.mongoose = mongoose;

/* O Consign serve para gerenciar as dependencias do projeto */
consign()
  .include("./config/passport.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.js")
  .into(app);

app.listen(3000, () => {
  console.log("Backend executando...");
});