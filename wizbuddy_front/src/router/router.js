import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import TaskMainPage from "@/views/checklist/TaskMainPage.vue";
import TaskInsertPage from "@/views/checklist/TaskInsertPage.vue";
import BoardView from "@/components/board/BoardBackground.vue";

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
  {
    path: '/board',
    component: BoardView
  }
  {
    path: "/task", name: 'TaskMainPage', component: TaskMainPage 
  },
  { 
    path: "/task/insert", 
    name: 'TaskInsertPage', 
    component: () => import('@/views/checklist/TaskInsertPage.vue') 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;