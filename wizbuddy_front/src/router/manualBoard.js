import { createRouter, createWebHistory } from 'vue-router';
import BoardBackground from '@/components/board/BoardBackground.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/board',
      component: BoardBackground
    },
    AppFooter,
    AppHeader
  ]
});

export default router;