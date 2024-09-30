<template>
  <div class="task-create-page">
    <h1>업무 등록 화면</h1>
    <TaskForm @submitTask="handleTaskSubmit" submitButtonLabel="등록" />
  </div>
</template>

<script setup>
import TaskForm from '@/components/task/TaskForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 로컬 스토리지에서 shop 정보를 가져오기
const shop = JSON.parse(localStorage.getItem('shop'));
const shopId = shop?.id || null; // shop 정보가 없으면 null 처리

const handleTaskSubmit = async (newTask) => {
  if (!shopId) {
    alert('매장 정보가 없습니다. 먼저 매장을 선택해 주세요.');
    return;
  }

  // newTask에 shopId 추가
  newTask.shopId = shopId;

  try {
    const addedTask = await fetchLastIdAndAddNewTask(newTask);
    if (addedTask) {
      console.log('등록된 업무:', addedTask);
      router.push('/task'); // 등록 완료 후 task 리스트 페이지로 이동
    }
  } catch (error) {
    console.error('Error:', error);
    alert('업무 등록 중 오류가 발생했습니다.');
  }
};

// 새로운 업무 추가 로직
const fetchLastIdAndAddNewTask = async (newTask) => {
  const response = await fetch('http://localhost:8080/tasks');
  const tasks = await response.json();

  if (tasks.length === 0) {
    newTask.id = "1";
  } else {
    const lastTask = tasks[tasks.length - 1];
    const lastId = lastTask.id;

    let newId;
    if (!isNaN(lastId)) {
      newId = (parseInt(lastId, 10) + 1).toString();
    } else {
      newId = generateUniqueId();
    }

    newTask.id = newId;
  }

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

  return await addResponse.json();
};

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
