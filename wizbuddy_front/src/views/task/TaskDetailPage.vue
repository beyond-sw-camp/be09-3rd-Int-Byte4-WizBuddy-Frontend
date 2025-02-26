<template>
  <div class="task-detail-page">
    <h1>업무 상세</h1>
    <TaskDetail 
      v-if="selectedTask" 
      :task="selectedTask" 
    />
    <div v-else>
      <p>해당 업무를 찾을 수 없습니다.</p>
    </div>

    <div class="action-buttons" v-if="selectedTask && userRole !== 'employee'">
      <button class="edit-button" @click="editTask">수정</button>
      <button class="delete-button" @click="deleteTask">삭제</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskDetail from '@/components/task/TaskDetail.vue'; // TaskDetail 컴포넌트 가져오기

const router = useRouter();
const route = useRoute();
const selectedTask = ref(null);
const user = JSON.parse(localStorage.getItem('user'));
const userRole = user?.role || null; // 사용자 역할 가져오기

// 페이지가 로드될 때 db.json으로부터 task를 받아옴
onMounted(async () => {
  const taskId = route.params.id;
  try {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`);
    if (response.ok) {
      selectedTask.value = await response.json();
    } else {
      console.error("업무를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
  }
});

// 수정 버튼 클릭 시 로직
const editTask = () => {
  router.push(`/task/edit/${selectedTask.value.id}`);
};

// 삭제 버튼 클릭 시 로직
const deleteTask = async () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${selectedTask.value.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 체크리스트에서 태스크 제거
        await removeTaskFromChecklists(selectedTask.value.id);
        
        alert("업무가 삭제되었습니다.");
        router.push('/task');
      } else {
        alert("삭제하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  }
};

// 체크리스트에서 태스크 제거하는 함수
const removeTaskFromChecklists = async (taskId) => {
  try {
    // 모든 체크리스트 가져오기
    const checklistResponse = await fetch('http://localhost:8080/checklists');
    const checklists = await checklistResponse.json();

    // 각 체크리스트에서 태스크를 제거
    for (const checklist of checklists) {
      const updatedTasks = checklist.tasks.filter(task => task.id !== taskId);

      // 체크리스트가 비어있다면 삭제
      if (updatedTasks.length === 0) {
        await fetch(`http://localhost:8080/checklists/${checklist.id}`, {
          method: 'DELETE',
        });
      } else {
        // 체크리스트 업데이트
        await fetch(`http://localhost:8080/checklists/${checklist.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...checklist,
            tasks: updatedTasks, // 수정된 태스크 목록 포함
          }),
        });
      }
    }
  } catch (error) {
    console.error("체크리스트에서 태스크 제거 중 오류 발생:", error);
  }
};
</script>

<style scoped>
.task-detail-page {
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

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.edit-button,
.delete-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}
</style>
