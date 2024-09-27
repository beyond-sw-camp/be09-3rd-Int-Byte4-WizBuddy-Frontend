import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

import ManualBoardRoutes from './manualBoard';
import NoticeBoardRoutes from './noticeBoard';
import ScheduleRoutes from './schedule';


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
  // {
  //   path: "/task", name: 'TaskMainPage', component: TaskMainPage 
  // },
  { 
    path: "/task/insert", 
    name: 'TaskInsertPage', 
    component: () => import('@/views/checklist/TaskInsertPage.vue') 
  },
  ...ManualBoardRoutes,
  ...NoticeBoardRoutes,
  ...ScheduleRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;