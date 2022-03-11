import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home.vue";
import AdminPages from "@/components/admin/AdminPages.vue";
import ArticleByCategory from "@/components/article/ArticleByCategory.vue";
import ArticleById from "@/components/article/ArticleById.vue";
import Auth from "@/components/auth/Auth.vue";

import global from "../global";

Vue.use(VueRouter);

const routes = [{
  name: "home",
  path: "/",
  component: Home
}, {
  name: "adminPages",
  path: "/admin",
  component: AdminPages,
  meta: {
    requiresAdmin: true
  }
}, {
  name: "articleByCategory",
  path: "/categories/:id/articles",
  component: ArticleByCategory
}, {
  name: "articleById",
  path: "/articles/:id",
  component: ArticleById
}, {
  name: "auth",
  path: "/auth",
  component: Auth
}];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(global.userKey);

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
})

export default router;