<template>
  <div class="task-list-page">
    <div class="sidebar">
      <button @click="goToTaskCreatePage" class="register-button">등록</button>
    </div>
    <div class="main-content">
      <h1>업무 리스트</h1>
      <div class="task-container">
        <TaskItem v-for="task in tasks" :task="task" :key="task.id" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TaskItem from '@/components/task/TaskItem.vue'; // TaskItem 컴포넌트 경로 확인

// Task 데이터 예시
const tasks = ref([
  { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
  { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
  { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소', isFixed: true },
  { id: 4, number: 4, title: '네 번째 업무', content: '재고 확인', isFixed: false }
]);

const router = useRouter();


const goToTaskCreatePage = () => {
  router.push('/task/create');
}


</script>

<style scoped>
.task-list-page {
  display: flex;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.sidebar {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 20px;
  top: 0;
  bottom: 0;
}

.register-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.main-content {
  flex: 1;
  margin-left: 120px;
  /* 사이드바 너비 + 여백 */
}

h1 {
  text-align: center;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 768px) {
  .task-list-page {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
    flex-direction: row;
    padding: 20px 0;
  }

  .main-content {
    margin-left: 0;
  }
}
</style>