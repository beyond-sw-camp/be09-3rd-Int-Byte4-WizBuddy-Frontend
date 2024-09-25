<template>
  <AppHeader />    <!-- 헤더 컴포넌트 -->
  <main>
    <RouterView />  <!-- 라우트에 따라 페이지가 출력됨 -->
  </main>

  <!-- v-if로 LoginPage일 경우에는 AppFooter가 보이지 않도록 함 -->
  <AppFooter v-if="!isLoginPage"/>    <!-- 푸터 컴포넌트 -->
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import {ref, watch} from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const route = useRoute();

const isLoginPage = ref(false);

watch(() => route.path, (newPath) => {
  isLoginPage.value = newPath === '/login';
},
{ 
  immediate: true 
}); 
</script> 

<style scoped>
main {
  padding: 20px;
  background-color: #F3F7FA;
}
</style>
