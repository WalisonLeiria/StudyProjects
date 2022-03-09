import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home.vue";
import AdminPages from "@/components/admin/AdminPages.vue";
import ArticleByCategory from "@/components/article/ArticleByCategory.vue";
import ArticleById from "@/components/article/ArticleById.vue";

Vue.use(VueRouter);

const routes = [{
  name: "home",
  path: "/",
  component: Home
}, {
  name: "adminPages",
  path: "/admin",
  component: AdminPages
}, {
  name: "articleByCategory",
  path: "/categories/:id/articles",
  component: ArticleByCategory
}, {
  name: "articleById",
  path: "/articles/:id",
  component: ArticleById
}];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;