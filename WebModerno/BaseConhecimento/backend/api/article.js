const queries = require("./queries");

module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validator;

  const save = async (request, response, next) => {
    const article = { ...request.body };

    if (request.params.id) article.id = request.params.id;

    try {
      existsOrError(article.name, "Nome não informado!");
      existsOrError(article.description, "Descrição não informada!");
      existsOrError(article.categoryId, "Categoria não informada!");
      existsOrError(article.userId, "Usuário não informado!");
      existsOrError(article.content, "Conteúdo não informado!");
    } catch (msg) {
      return response.status(400).send(msg);
    }

    if (article.id) {
      app.db("articles")
        .update(article)
        .where({ id: article.id })
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    } else {
      app.db("articles")
        .insert(article)
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    }
  }

  const remove = async (request, response) => {
    try {
      const rowsDeleted = await app.db("articles").where({ id: request.params.id }).del();
      existsOrError(rowsDeleted, "Artigo não foi encontrado!");

      response.status(204).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  const limit = 10;

  const get = async (request, response) => {
    const page = request.query.page || 1;

    const result = await app.db("articles").count("id").first();
    const count = parseInt(result['count(`id`)']);
    app.db("articles")
      .select("id", "name", "description")
      .limit(limit).offset(page * limit - limit)
      .then(data => response.json({ data, count, limit }))
      .catch(error => response.status(500).send(error));
  }

  const getById = (request, response) => {
    app.db("articles")
      .where({ id: request.params.id })
      .first()
      .then(data => {
        data.content = data.content.toString();
        return response.json(data);
      })
      .catch(error => response.status(500).send(error));
  }

  const getByCategory = async (request, response) => {
    const page = request.query.page || 1;
    const catgeoryId = request.params.id;
    const categories = await app.db.raw(queries.categoryWithChildren, catgeoryId);
    const ids = categories.rows.map(r => r.id);

    app.db({a: "articles", u: "users"})
      .select("a.id", "a.name", "a.descrption", "a.imageUrl", { author: "u.name" })
      .limit(limit).offset(page * limit - limit)
      .whereRaw("?? = ??", ["u.id", "a.userId"])
      .whereNull("a.deletedAt")
      .whereIn("categoryId", ids)
      .orderBy("a.id", "desc")
      .then(data => response.json(data))
      .catch(error => response.status(500).send(error));
  }

  return { save, remove, get, getById, getByCategory };
}