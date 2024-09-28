<template>
  <div class="task-create-page">
    <h1>업무 등록 화면</h1>
    <!-- TaskForm 컴포넌트 사용, 버튼 라벨을 "등록"으로 설정 -->
    <TaskForm @submitTask="handleTaskSubmit" submitButtonLabel="등록" />
  </div>
</template>

<script setup>
import TaskForm from '@/components/task/TaskForm.vue'; // TaskForm 컴포넌트 가져오기
import { useRouter } from 'vue-router';

const router = useRouter();

// TaskForm에서 넘겨받은 데이터를 처리하는 함수
const handleTaskSubmit = (newTask) => {
  console.log('등록된 업무:', newTask);

  // 이곳에서 실제로 등록된 업무 데이터를 처리 (API 호출 등)

  // 업무 등록 후 페이지 이동 (예: Task 리스트 페이지로 이동)
  router.push('/task');  // 업무 리스트 페이지로 리다이렉트
};
</script>

<style scoped>
.task-create-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.task-create-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
}
</style>
