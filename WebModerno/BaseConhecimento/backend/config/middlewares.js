const bodyParser = require("body-parser");
const cors = require("cors");

exports.exports = app => {
  app.use(bodyParser.json());
  app.use(cors());
};