import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

import ManualBoardRoutes from './manualBoard';
import ScheduleRoutes from './schedule.js';

import ChecklistRoutes from './checklist';
import TaskRoutes from './task';

const routes = [
  { path: "/", component: MainPage }, // 메인 경로를 루트로 설정
  { 
    path: "/login", 
    component: LoginPage,
  },
  {
    path: "/signup",
    component: SignupPage
  },

  ...ManualBoardRoutes,
  ...ScheduleRoutes,
  ...ChecklistRoutes,
  ...TaskRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;