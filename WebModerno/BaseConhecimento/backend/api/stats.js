const mongoose = require("mongoose");

const defaultStats = {
  users: 0,
  categories: 0,
  articles: 0
};

const StatSchema = new mongoose.Schema({
  users: Number,
  categories: Number,
  articles: Number,
  createdAt: Date
});

module.exports = app => {
  const Stat = mongoose.model("Stat", StatSchema);

  const get = (req, res) => {
    Stat.findOne({}, {}, { sort: {"createdAt": -1 } })
      .then(data => res.json(data || defaultStats));
  }

  return { Stat, get };
}