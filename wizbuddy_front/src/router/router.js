import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/user/MainPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

import ManualBoardRoutes from './manualBoard';
import NoticeBoardRoutes from './noticeBoard';
import ScheduleRoutes from './schedule';
import ChecklistRoutes from './checklist';
import TaskRoutes from './task';

const routes = [
  { path: "/", component: MainPage },
  { 
    path: "/login", 
    component: LoginPage,
  },

  {
    path: "/signup",
    component: SignupPage,
  },
  {
    path: "/main",
    component: MainPage
  },
  ...ManualBoardRoutes,
  ...NoticeBoardRoutes,
  ...ScheduleRoutes,
  ...ChecklistRoutes,
  ...TaskRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;