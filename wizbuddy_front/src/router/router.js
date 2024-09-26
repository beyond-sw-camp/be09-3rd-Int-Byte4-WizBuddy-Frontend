import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import ScheduleMainPage from "@/components/schedule/Main.vue";
// import CheckListPage from '@/views/CheckListPage.vue'; // CheckListPage 컴포넌트 경로 확인
// import NoticeBoardPage from '@/views/NoticeBoardPage.vue'; // NoticeBoardPage 컴포넌트 경로 확인
// import ManualBoardPage from '@/views/ManualBoardPage.vue'; // ManualBoardPage 컴포넌트 경로 확인
// import SubsBoardPage from '@/views/SubsBoardPage.vue'; // SubsBoardPage 컴포넌트 경로 확인
import SignupPage from "@/views/user/SignupPage.vue";
import TaskMainPage from "@/views/checklist/TaskMainPage.vue";
// import TaskInsertPage from "@/views/checklist/TaskInsertPage.vue";
import ManualBoardRoutes from './manualBoard';
import NoticeBoardRoutes from './noticeBoard';

const routes = [
  { path: '/schedule', component: ScheduleMainPage },
  // { path: '/checklist', component: CheckListPage },
  // { path: '/noticeboard', component: NoticeBoardPage },
  // { path: '/subsboard', component: SubsBoardPage },
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
    path: "/task", name: 'TaskMainPage', component: TaskMainPage 
  },
  { 
    path: "/task/insert", 
    name: 'TaskInsertPage', 
    component: () => import('@/views/checklist/TaskInsertPage.vue') 
  },
  ...ManualBoardRoutes,
  ...NoticeBoardRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;