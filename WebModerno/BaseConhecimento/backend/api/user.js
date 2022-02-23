const bcrypt = require("bcrypt");

module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  const save = async (request, response, next) => {
    const user = { ...request.body };

    if (request.params.id) user.id = request.params.id;
    if (!request.originalUrl.startsWith("/users")) user.admin = false;
    if (!request.user || !request.user.admin) user.admin = false;

    try {
      existsOrError(user.name, "Nome não informado!");
      existsOrError(user.email, "Email não informado!");
      existsOrError(user.password, "Senha não infomada!");
      existsOrError(user.confirmPassword, "Senha não confirmada!");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem!");

      const userFromDb = await app.db("users").where({ email: user.email }).whereNull("deletedAt").first();

      if (!user.id) {
        notExistsOrError(userFromDb, "Usuário já cadastrado!");
      }
    } catch (msg) {
      return response.status(400).send(msg);
    }

    user.password = encryptPassword(request.body.password);
    delete user.confirmPassword;

    if (user.id) {
      app.db("users")
        .update(user)
        .where({ id: user.id })
        .whereNull("deletedAt")
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    } else {
      app.db("users")
        .insert(user)
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    }
  }

  const get = (request, response) => {
    app.db("users")
      .select("id", "name", "email", "admin")
      .whereNull("deletedAt")
      .then(users => response.json(users))
      .catch(error => response.status(500).send(error));
  }

  const getById = (request, response) => {
    app.db("users")
      .select("id", "name", "email", "admin")
      .where({ id: request.params.id })
      .whereNull("deletedAt")
      .first()
      .then(user => response.json(user))
      .catch(error => response.status(500).send(error));
  }

  const remove = async (req, res) => {
    try {
      const articles = await app.db("articles").where({ userId: req.params.id });
      notExistsOrError(articles, "Usuário possui artigos!");

      const rowsUpdated = await app.db("users").update({ deletedAt: new Date() }).where({ id: req.params.id });
      existsOrError(rowsUpdated, "Usuário não encontrado!");

      res.status(204).send();
    } catch (error) {
      res.status(400).send(error);
    }
  };

  return { save, get, getById, remove };
};