import { createRouter, createWebHistory } from 'vue-router';

import WelcomePage from '@/views/welcome/WelcomePage.vue';

import UserRoutes from './user';
import ShopRoutes from './shop';
import ManualBoardRoutes from './manualBoard';
import NoticeBoardRoutes from './noticeBoard';
import SubsBoardRoutes from './subsBoard';
import ScheduleRoutes from './schedule';
import ChecklistRoutes from './checklist';
import TaskRoutes from './task';

function isLoggedIn() {
  // localStorage는 vue.js에서 전역으로 사용할 수 있는 storage
  return !!localStorage.getItem('token'); 
}

// meta: {requireAuth: true} 로그인이 필요한 페이지에 추가하기
const routes = [
  { path: "/", component: WelcomePage },
  ...ManualBoardRoutes,
  ...NoticeBoardRoutes,
  ...ScheduleRoutes,
  ...ChecklistRoutes,
  ...TaskRoutes,
  ...UserRoutes,
  ...ShopRoutes,
  ...SubsBoardRoutes
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