import { createRouter, createWebHistory } from 'vue-router';
import ManualBoard from '@/views/ManualBoard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ManualBoard
  ]
});

export default router;