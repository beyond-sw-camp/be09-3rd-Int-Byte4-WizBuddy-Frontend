import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import coupleRoutes from './couple';
import diaryRoutes from './diary';
import momentRoutes from './moment';
import momentcourseRoutes from './momentcourse';
import randomquestionRoutes from './randomquestion';
import scheduleRoutes from './schedule';
import todocourseRoutes from './todocourse';
import userRoutes from './user';

// 공통 Home 페이지
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: HomeView, // 메인 홈 페이지
  },
  ...coupleRoutes,
  ...diaryRoutes,
  ...momentRoutes,
  ...momentcourseRoutes,
  ...randomquestionRoutes,
  ...scheduleRoutes,
  ...todocourseRoutes,
  ...userRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;