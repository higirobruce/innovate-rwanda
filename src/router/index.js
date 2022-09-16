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
      path: "/activate-account/:token",
      component: () => import("@/pages/activate-account/index.vue"),
      meta: {
        layout: "auth-layout",
      },
    },
    {
      path: "/unsubscribe",
      component: () => import("@/pages/unsubscribe/index.vue"),
      meta: {
        layout: "auth-layout",
      },
    },
    {
      path: "/forgot-password",
      component: () => import("@/pages/forgot-password/index.vue"),
      meta: {
        layout: "auth-layout",
      },
    },
    {
      path: "/reset-password/:token",
      component: () => import("@/pages/reset-password/index.vue"),
      meta: {
        layout: "auth-layout",
      },
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
      path: "/directory/:slug",
      component: () => import("@/pages/directory/slug.vue"),
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
        layout: "overview-layout",
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
      path: "/dashboard/directory/individuals",
      component: () => import("@/pages/dashboard/directory/individuals.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/directory/area-of-interests",
      component: () =>
        import("@/pages/dashboard/directory/areaOfInterests.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/company/:companyId",
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
      path: "/dashboard/subscribers",
      component: () => import("@/pages/dashboard/subscribers/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/resources",
      component: () => import("@/pages/dashboard/resources/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/resources/new",
      component: () => import("@/pages/dashboard/resources/new.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/resources/edit/:id",
      component: () => import("@/pages/dashboard/resources/edit.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content",
      component: () => import("@/pages/dashboard/content/blog/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/blog/new",
      component: () => import("@/pages/dashboard/content/blog/new.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/blog/edit/:slug",
      component: () => import("@/pages/dashboard/content/blog/edit.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/events",
      component: () => import("@/pages/dashboard/content/events/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/events/new",
      component: () => import("@/pages/dashboard/content/events/new.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/events/edit/:slug",
      component: () => import("@/pages/dashboard/content/events/edit.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/jobs",
      component: () => import("@/pages/dashboard/content/jobs/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/jobs/new",
      component: () => import("@/pages/dashboard/content/jobs/new.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/content/jobs/edit/:slug",
      component: () => import("@/pages/dashboard/content/jobs/edit.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/messages",
      component: () => import("@/pages/dashboard/messages/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/blog",
      component: () => import("@/pages/blog/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/blog/:slug",
      component: () => import("@/pages/blog/post.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/events",
      component: () => import("@/pages/events/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/event/:slug",
      component: () => import("@/pages/events/post.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
     path: "/find-talents",
     component: () => import("@/pages/find-talents/index.vue"),
     meta: {
       layout: "default-layout",
     },
   },
    {
       path: "/jobs",
       component: () => import("@/pages/jobs/index.vue"),
       meta: {
         layout: "default-layout",
       },
     },
    {
      path: "/job/:slug",
      component: () => import("@/pages/jobs/post.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/resources",
      component: () => import("@/pages/resources/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/resources/:id",
      component: () => import("@/pages/resources/post.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/dashboard/settings",
      component: () => import("@/pages/dashboard/settings/profile.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/reset-password",
      component: () => import("@/pages/dashboard/settings/reset.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/business-activities",
      component: () => import("@/pages/dashboard/settings/activities.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/company-types",
      component: () => import("@/pages/dashboard/settings/types.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/categories",
      component: () => import("@/pages/dashboard/settings/categories.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/event-types",
      component: () => import("@/pages/dashboard/settings/event-types.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/settings/resource-types",
      component: () => import("@/pages/dashboard/settings/resource-types.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: "/dashboard/notifications",
      component: () => import("@/pages/dashboard/notifications/index.vue"),
      meta: {
        layout: "dashboard-layout",
      },
    },
    {
      path: '/dashboard/logs',
      component: () => import('@/pages/dashboard/activities/index.vue'),
      meta: {
        layout: 'dashboard-layout'
      }
    },
    {
      path: "/about",
      component: () => import("@/pages/about/index.vue"),
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/disclaimer",
      component: () => import("@/pages/disclaimer/index.vue"),
      meta: {
        layout: "terms-layout",
      },
    },
    {
      path: "/terms",
      component: () => import("@/pages/terms/index.vue"),
      meta: {
        layout: "terms-layout",
      },
    },
    {
      path: "/cookies-policy",
      component: () => import("@/pages/cookies/index.vue"),
      meta: {
        layout: "terms-layout",
      },
    },
    {
      path: "/privacy-policy",
      component: () => import("@/pages/privacy-policy/index.vue"),
      meta: {
        layout: "terms-layout",
      },
    },
    {
      path: "/redirect/:url*",
      component: () => import("@/pages/redirect/_url.vue"),
      meta: {
        layout: "default-layout",
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
