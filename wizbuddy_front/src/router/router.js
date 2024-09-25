import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";

const routes = [
  { path: "/", component: MainPage }, // 메인 경로를 루트로 설정
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
