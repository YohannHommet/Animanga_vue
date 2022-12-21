import type { Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../views/home.view.vue'),
    },
    {
      path: '/anime/:animeId',
      name: 'anime',
      component: () => import('../../views/anime.view.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../../views/about.view.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../../views/not-found.view.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const title: string = to.name as string;
  document.title = title.charAt(0).toUpperCase() + title.slice(1).replace(/[-_]/g, ' ');
  next();
});

export default router;
