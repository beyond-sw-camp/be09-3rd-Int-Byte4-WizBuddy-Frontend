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
const handleTaskSubmit = async (newTask) => {
  console.log('등록된 업무:', newTask);

  // db.json에서 마지막 id를 가져와서 +1로 설정하는 함수 호출
  await fetchLastIdAndAddNewTask(newTask);

  // 업무 등록 후 페이지 이동
  router.push('/task');  // 업무 리스트 페이지로 리다이렉트
};

// 새로운 task를 추가하는 함수
const fetchLastIdAndAddNewTask = async (newTask) => {
  try {
    // 기존 tasks 데이터를 모두 가져옴
    const response = await fetch('http://localhost:8080/tasks');
    const tasks = await response.json();

    if (tasks.length === 0) {
      newTask.id = "1";  // 데이터가 없으면 첫 번째 id를 1로 설정
    } else {
      // 마지막 task의 id 값 찾기
      const lastTask = tasks[tasks.length - 1]; // 배열의 마지막 task
      const lastId = lastTask.id;

      // 만약 id가 숫자 형태라면 숫자로 변환 후 +1
      let newId;
      if (!isNaN(lastId)) {
        newId = (parseInt(lastId, 10) + 1).toString(); // 숫자로 변환 후 문자열로
      } else {
        // 만약 id가 문자열이면 다른 로직을 고려해야 함
        newId = generateUniqueId(); // UUID 등 고유한 값 생성 로직 필요
      }

      // 새로운 task에 새로운 id 할당
      newTask.id = newId;
    }

    // 새로운 task 추가 요청
    const addResponse = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!addResponse.ok) {
      throw new Error('Task 추가에 실패했습니다.');
    }

    const addedTask = await addResponse.json();
    console.log('새로 추가된 task:', addedTask);
    return addedTask;

  } catch (error) {
    console.error('Error:', error);
  }
};

// UUID 생성 함수 (id가 문자열인 경우 사용할 수 있음)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
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
</style>
