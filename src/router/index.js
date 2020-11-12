import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// initiate all routes
const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/pages/home"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "*",
      component: () => import("@/pages/notfound"),
      meta: {
        layout: "auth-layout",
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (localStorage.getItem("isAuth") === "true") {
      next();
    } else {
      next({
        path: "login",
      });
    }
  } else {
    next();
  }
});

export default router;
