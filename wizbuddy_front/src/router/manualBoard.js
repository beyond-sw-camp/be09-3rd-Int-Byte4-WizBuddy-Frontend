import { createRouter, createWebHistory } from 'vue-router';
import Board from '@/views/Board.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    Board
  ]
});

export default {
    path: '/manualboard',
    name: 'manualboard',
    component: Board
};



// export default router;