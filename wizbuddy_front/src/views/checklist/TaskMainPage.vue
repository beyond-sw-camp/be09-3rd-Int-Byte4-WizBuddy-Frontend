<template>
  <div class="task-main-page">
    <h1>업무 리스트</h1>
    <!-- TaskMain 컴포넌트만 포함 -->
    <TaskMain />
  </div>
</template>

<script setup>
import TaskMain from '@/components/checklist/TaskMain.vue'; // checklist 패키지 경로 추가
</script>

<style scoped>
.task-main-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>