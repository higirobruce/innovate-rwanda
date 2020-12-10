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
      component: () => import("@/pages/home/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/login",
      component: () => import("@/pages/login/index.vue"),
    },
    {
      path: "/join",
      component: () => import("@/pages/register/index.vue"),
      meta: {
        layout: "auth-layout",
      },
    },
    {
      path: "/why-rwanda",
      component: () => import("@/pages/whyrwanda/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/directory",
      component: () => import("@/pages/directory/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/directory/enablers",
      component: () => import("@/pages/directory/enablers.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/directory/companies",
      component: () => import("@/pages/directory/companies.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/company/:slug",
      component: () => import("@/pages/company/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/directory",
      component: () => import("@/pages/dashboard/directory/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/directory/pending",
      component: () => import("@/pages/dashboard/directory/pending.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/directory/area-of-interests",
      component: () => import("@/pages/dashboard/directory/areaOfInterests.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/my-company",
      component: () => import("@/pages/dashboard/mycompany/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/users",
      component: () => import("@/pages/dashboard/users/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content",
      component: () => import("@/pages/dashboard/content/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings",
      component: () => import("@/pages/dashboard/settings/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "*",
      component: () => import("@/pages/notfound/index.vue"),
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
