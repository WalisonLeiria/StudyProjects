module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validator;

  const save = async (request, response, next) => {
    const category = { ...request.body };

    if (request.params.id) category.id = request.params.id;

    try {
      existsOrError(category.name, "Nome não informado!");
    } catch (msg) {
      return response.status(400).send(msg);
    }

    if (category.id) {
      app.db("categories")
        .update(category)
        .where({ id: category.id })
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    } else {
      app.db("categories")
        .insert(category)
        .then(() => response.status(204).send())
        .catch(error => response.status(500).send(error));
    }
  }

  const remove = async (request, response) => {
    try {
      existsOrError(request.params.id, "Código da categoria não informado!");

      const subCategory = await app.db("categories").where({ parentId: request.params.id });
      notExistsOrError(subCategory, "Categoria possui sub-categorias!");

      const articles = await app.db("articles").where({ categoryId: request.params.id });
      notExistsOrError(articles, "Categoria possui artigos!");

      const rowsDeleted = await app.db("categories").where({ id: request.params.id }).del();
      existsOrError(rowsDeleted, "Categoria não foi encontrada!");

      response.status(204).send();
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  const get = (request, response) => {
    app.db("categories")
      .then(data => response.json(withPath(data)))
      .catch(error => response.status(500).send(error));
  }

  const getById = (request, response) => {
    app.db("categories")
      .where({ id: request.params.id })
      .first()
      .then(data => response.json(data))
      .catch(error => response.status(500).send(error));
  }

  const getTree = (request, response) => {
    app.db("categories")
      .then(data => response.json(toTree(withPath(data))))
      .catch(error => response.status(500).send(error));
  }

  const withPath = categories => {
    const getParent = (catgeories, parentId) => {
      let parent = categories.filter(item => item.id === parentId);
      return parent.length ? parent[0] : null;
    }

    const categoriesWithPath = categories.map(category => {
      let path = category.name;
      let parent = getParent(categories, category.parentId);

      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parentId);
      }

      return { ...category, path };
    });

    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    return categoriesWithPath;
  }

  const toTree = (categories, tree) => {
    if (!tree) tree = categories.filter(c => !c.parentId);

    tree = tree.map(parentNode => {
      const isChild = node => node.parentId === parentNode.id;
      parentNode.children = toTree(categories, categories.filter(isChild));
      return parentNode;
    });

    return tree;
  }

  return { save, remove, get, getById, getTree };
}