import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign",
    name: "SignForm",
    component: () =>
      import(/* webpackChunkName: "sign_form" */ "../views/SignForm.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/saving",
    name: "Saving",
    component: () =>
      import(/* webpackChunkName: "saving" */ "../views/Saving.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/planner",
    name: "Planner",
    component: () =>
      import(/* webpackChunkName: "planner" */ "../views/Planner.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not_found" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("auth/initAuthentication").then((user) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      if (user) next();
      else next({ name: "SignForm", query: { redirectTo: to.path } });
    } else if (to.matched.some((route) => route.meta.requiresGuest)) {
      if (!user) next();
      else next({ name: "Home" });
    } else next();
  });
});

export default router;
