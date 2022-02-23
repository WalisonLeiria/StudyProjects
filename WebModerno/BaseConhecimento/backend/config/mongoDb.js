const mongoose = require("mongoose");
const { noSql } = require("../.env");

mongoose.connect(noSql.uri, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected!"))
  .catch(e => {
  const msg = "FALHA: Não foi possível conectar com o MongoDB!";
  console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
});