const { response } = require("express");

module.exports = app => {
  const save = (request, response, next) => {
    response.send("user saved");
  }

  return { save };
};