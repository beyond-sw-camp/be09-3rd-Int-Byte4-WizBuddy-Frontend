import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
// import Board from "@/views/Board.vue";

import manualBoardRoute from './manualBoard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    manualBoardRoute
  ]
});

export default router;