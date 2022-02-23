const schedule = require("node-schedule");

module.exports = app => {
  schedule.scheduleJob("*/1 * * * *", async function() {
    const usersCount = await app.db("users").whereNull("deletedAt").count("id").first();
    const articlesCount = await app.db("articles").count("id").first();
    const categoriesCount = await app.db("categories").count("id").first();
    
    const { Stat } = app.api.stats;
    const lastStats = await Stat.findOne({}, {}, { sort: {"createdAt": -1 } });

    const stat = new Stat({
      users: usersCount['count(`id`)'],
      categories: categoriesCount['count(`id`)'],
      articles: articlesCount['count(`id`)'],
      createdAt: new Date()
    });

    const changeUsers = !lastStats || stat.users !== lastStats.users;
    const changeArticles = !lastStats || stat.articles !== lastStats.articles;
    const changeCategories = !lastStats || stat.categories !== lastStats.categories;
    
    if (changeArticles || changeCategories || changeUsers) {
      stat.save().then(() => console.log("[Stats] Estatísticas atualizadas!"));
    }
  });
}