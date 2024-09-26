<template>
  <div class="task-main">
    <h2>업무 리스트</h2>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <div :class="getTaskClass(task.isFixed)" class="task-header">
        {{ task.number }}번 업무
      </div>
      <div class="task-body">
        {{ task.content }}
        <span v-if="task.isFixed" class="fixed-indicator"></span>
      </div>
    </div>

    <!-- 등록 버튼 -->
    <button @click="goToInsertPage" class="register-button">등록</button>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 세션스토리지에서 데이터를 불러오거나, 초기 데이터를 설정
const loadTasks = () => {
  const savedTasks = sessionStorage.getItem('tasks'); // sessionStorage 사용
  if (savedTasks) {
    return JSON.parse(savedTasks);  // 세션 스토리지에 저장된 데이터가 있으면 사용
  }
  return [
    { id: 1, number: 1, content: '첫 번째 업무 내용입니다. 이 업무는 화장실 청소...', isFixed: true },
    { id: 2, number: 2, content: '두 번째 업무 내용입니다. 이 업무는 ...', isFixed: false },
    { id: 3, number: 3, content: '세 번째 업무 내용입니다. 이 업무는 ...', isFixed: true }
  ];  // 최초 로딩 시 초기 데이터
};

// tasks 배열 관리
const tasks = ref(loadTasks());

const router = useRouter();
const route = useRoute();

// 고정 여부에 따라 다른 클래스 적용
const getTaskClass = (isFixed) => {
  return isFixed ? 'fixed-task' : 'non-fixed-task';
};

// 새로 추가된 업무 처리
onBeforeMount(() => {
  const newTaskString = route.query.newTask;
  if (newTaskString) {
    try {
      const newTask = JSON.parse(newTaskString);  // 전달받은 JSON 문자열을 다시 객체로 변환
      console.log("받은 newTask 데이터:", newTask);  // 받은 데이터를 콘솔에 출력하여 확인
      tasks.value = [...tasks.value, newTask];  // 기존 배열에 추가

      // 세션 스토리지에 저장
      sessionStorage.setItem('tasks', JSON.stringify(tasks.value));
    } catch (error) {
      console.error('JSON 파싱 에러:', error);
    }
  }
});

// "등록" 버튼 클릭 시 task/insert 페이지로 이동
const goToInsertPage = () => {
  router.push('/task/insert');
};
</script>

<style scoped>
.task-main {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.task-item {
  background-color: #f4f4f9;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.task-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
}

.fixed-task {
  background-color: #f28b82;
  color: white;
}

.non-fixed-task {
  background-color: #aecbfa;
  color: white;
}

.task-body {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fixed-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
}

/* 등록 버튼 스타일 */
.register-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>
