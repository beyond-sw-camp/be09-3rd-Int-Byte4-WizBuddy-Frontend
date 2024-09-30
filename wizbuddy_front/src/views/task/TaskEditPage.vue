<template>
  <div class="task-edit-page">
    <h1>업무 수정</h1>
    <!-- TaskForm 컴포넌트를 사용하여 수정, 버튼 라벨을 "수정"으로 설정 -->
    <TaskForm :task="selectedTask" @submitTask="updateTask" submitButtonLabel="수정" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskForm from '@/components/task/TaskForm.vue'; // TaskForm 컴포넌트 가져오기

const selectedTask = ref(null); // 선택된 Task를 저장하는 변수
const route = useRoute();
const router = useRouter();

// 라우트에서 전달받은 ID로 수정할 Task 가져오기
onMounted(async () => {
  const taskId = route.params.id; // URL 파라미터에서 task ID 가져오기
  try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`);
      if (response.ok) {
          selectedTask.value = await response.json();
      } else {
          console.error('업무를 찾을 수 없습니다.');
          router.push('/task'); // 업무를 찾을 수 없는 경우 목록 페이지로 이동
      }
  } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
  }
});

// Task 업데이트 로직
const updateTask = async (updatedTask) => {
  try {
      // 1. 작업 업데이트
      const response = await fetch(`http://localhost:8080/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask), // 수정된 task 데이터를 JSON으로 변환하여 전송
      });

      if (!response.ok) {
          throw new Error('업무 수정 중 오류가 발생했습니다.');
      }

      // 2. 체크리스트 내의 모든 task 업데이트
      await updateTasksInChecklists(updatedTask);

      console.log('업무가 수정되었습니다:', await response.json());
      router.push('/task'); // 수정 후, 목록 페이지로 이동
  } catch (error) {
      console.error('업무 수정 중 오류 발생:', error);
  }
};

// 체크리스트 내의 task 업데이트
const updateTasksInChecklists = async (updatedTask) => {
  try {
      const checklistResponse = await fetch('http://localhost:8080/checklists');
      const checklists = await checklistResponse.json();

      // 각 체크리스트를 순회하면서 task 업데이트
      for (const checklist of checklists) {
          const taskIndex = checklist.tasks.findIndex(task => task.id === updatedTask.id);
          if (taskIndex !== -1) {
              // task 정보 업데이트
              checklist.tasks[taskIndex] = { ...checklist.tasks[taskIndex], ...updatedTask };

              // 체크리스트 업데이트
              await fetch(`http://localhost:8080/checklists/${checklist.id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(checklist),
              });
          }
      }
  } catch (error) {
      console.error('체크리스트 업데이트 중 오류 발생:', error);
  }
};
</script>

<style scoped>
.task-edit-page {
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
