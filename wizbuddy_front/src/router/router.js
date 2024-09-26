import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/common/MainPage.vue";
import LoginPage from "@/views/common/LoginPage.vue";
import TaskMainPage from "@/views/checklist/TaskMainPage.vue";
import TaskInsertPage from "@/views/checklist/TaskInsertPage.vue";

const routes = [
  { path: "/", component: MainPage }, // 메인 경로를 루트로 설정
  { path: "/login", component: LoginPage},
  { path: "/task", name: 'TaskMainPage', component: TaskMainPage },
  { path: "/task/insert", name: 'TaskInsertPage', component: () => import('@/views/checklist/TaskInsertPage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
