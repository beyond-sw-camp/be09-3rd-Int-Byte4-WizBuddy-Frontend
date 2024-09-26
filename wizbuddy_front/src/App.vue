<template>
  <AppHeader v-if="isLoginPage"/>    <!-- 헤더 컴포넌트 -->
  <AppHeaderInShop v-if="isSchedulePage"/>
  <AppHeaderInShop v-if="isCheckListPage"/>
  <AppHeaderInShop v-if="isNoticeBoardPage"/>
  <AppHeaderInShop v-if="isManualBoardPage"/>
  <AppHeaderInShop v-if="isSubsBoardPage"/>
  
  <main>
    <RouterView />  <!-- 라우트에 따라 페이지가 출력됨 -->
  </main>
  
  <!-- v-if로 LoginPage일 경우에는 AppFooter가 보이지 않도록 설정 -->
  <AppFooter v-if="!(isLoginPage || isSignupPage)"/>    <!-- 푸터 컴포넌트 -->
</template>

<script setup>
import './assets/css/style.css';
import { RouterView, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppHeaderInShop from '@/components/AppHeaderInShop.vue';

const route = useRoute();

const isLoginPage = ref(false);
const isSignupPage = ref(false);
const isSchedulePage = ref(false);
const isCheckListPage = ref(false);
const isNoticeBoardPage = ref(false);
const isManualBoardPage = ref(false);
const isSubsBoardPage = ref(false);

watch(() => route.path, (newPath) => {
  isLoginPage.value = newPath === '/login';
  isSignupPage.value = newPath === '/signup';
  isSchedulePage.value = newPath === '/schedule';
  isCheckListPage.value = newPath === '/checklist';
  isNoticeBoardPage.value = newPath === '/noticeboard';
  isManualBoardPage.value = newPath === '/manualboard';
  isSubsBoardPage.value = newPath === '/subsboard';
}, { 
  immediate: true 
}); 
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    height: 100vh; /* 화면 전체를 100%로 사용 */
    overflow: hidden; /* 스크롤 제거 */
}

main {
    flex-grow: 1; /* 남은 공간을 모두 차지 */
    display: flex;
    justify-content: center;
    align-items: center; /* 달력 등을 화면 가운데 정렬 */
    background-color: #F3F7FA; /* 배경 색을 채우기 위해 설정 */
}

.footer {
    background-color: #3A4E8B;
    padding: 10px;
    text-align: center;
    color: white;
    position: fixed; /* 화면 하단에 고정 */
    bottom: 0;
    width: 100%;
    left: 0;
}
</style>
