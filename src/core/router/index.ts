import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "animanga",
      component: () => import("@/views/AnimangaView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const title: string = to.name as string;
  document.title = title.charAt(0).toUpperCase() + title.slice(1).replace(/[-_]/g, " ");
  next();
});

export default router;
