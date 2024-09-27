import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/user/MainPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

import ManualBoardRoutes from './manualBoard';
import ScheduleRoutes from './schedule';

import ChecklistRoutes from './checklist';
import TaskRoutes from './task';

function isLoggedIn() {
  // localStorage는 vue.js에서 전역으로 사용할 수 있는 storage
  return !!localStorage.getItem('token'); 
}

// meta: {requireAuth: true} 로그인이 필요한 페이지에 추가하기
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
  ...ScheduleRoutes,
  ...ChecklistRoutes,
  ...TaskRoutes

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn  = isLoggedIn();

if (to.matched.some(record => record.meta.requiresAuth)) {
  if (!loggedIn) {
    next('/login');
  } else {
    next();
  }
} else {
  next();
}
});


export default router;