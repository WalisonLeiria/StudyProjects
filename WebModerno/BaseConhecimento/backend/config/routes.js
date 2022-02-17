const admin = require("./admin");

module.exports = app => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signIn);
  app.post("/validatetoken", app.api.auth.validateToken);

  app.route("/users")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get));

  app.route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById));

  app.route("/categpries")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.category.save))
    .get(app.api.category.get);

  app.route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  app.route("/categpries/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.category.save))
    .get(app.api.category.getById)
    .delete(admin(app.api.category.remove));

  app.route("/article")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.article.save))
    .get(app.api.article.get);

  app.route("/article/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.article.save))
    .get(app.api.article.getById)
    .delete(admin(app.api.article.remove));

  app.route("/categories/:id/article")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);
};