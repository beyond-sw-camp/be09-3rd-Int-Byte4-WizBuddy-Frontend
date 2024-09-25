<template>
  <AppHeader />    <!-- 헤더 컴포넌트 -->
  <main>
    <RouterView />  <!-- 라우트에 따라 페이지가 출력됨 -->
  </main>
  <AppFooter />    <!-- 푸터 컴포넌트 -->
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
