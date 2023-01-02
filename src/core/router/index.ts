import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../../views/home.view.vue")
    },
    {
      path: "/anime/:animeId/:animeTitle",
      name: "anime",
      component: () => import("../../views/anime.view.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        const isValid = Number.isInteger(Number(to.params.animeId));

        !isValid
          ? next({ name: "home" })
          : next();
      }
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../../views/chat.view.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../../views/about.view.vue")
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("../../views/not-found.view.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const title: string = to.name as string;
  document.title = title.charAt(0).toUpperCase() + title.slice(1).replace(/[-_]/g, " ");
  next();
});

export default router;
