<template>
    <div class="task-list-page">
      <h1>업무 리스트</h1>
      <div class="task-container">
        <!-- TaskItem 컴포넌트를 사용하여 목록 렌더링 -->
        <TaskItem v-for="task in tasks" :task="task" :key="task.id" />
      </div>

<!-- 왼쪽 사이드바 등록 버튼 -->
    <div class="sidebar">
      <button @click="goToTaskCreatePage" class="register-button">등록</button>
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


  const goToTaskCreatePage = () =>{
    router.push('/task/create');
  }


  </script>
  
  <style scoped>
 .task-list-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar {
  position: absolute;
  left: 20px;
  bottom: 20px;
}

.register-button {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 1000; /* 푸터에 가리지 않도록 z-index 추가 */
}
  </style>