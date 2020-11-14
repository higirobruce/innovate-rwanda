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
      component: () => import("@/pages/home/Index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/why-rwanda",
      component: () => import("@/pages/whyrwanda/Index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/companies",
      component: () => import("@/pages/dashboard/companies/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/my-company",
      component: () => import("@/pages/dashboard/mycompany/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/users",
      component: () => import("@/pages/dashboard/users/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content",
      component: () => import("@/pages/dashboard/content/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings",
      component: () => import("@/pages/dashboard/settings/Index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "*",
      component: () => import("@/pages/notfound/Index.vue"),
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
