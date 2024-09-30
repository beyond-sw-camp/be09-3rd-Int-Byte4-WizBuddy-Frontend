<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>{{ checklist.title }}</h2>

      <!-- 고정 업무 구역 -->
      <div class="task-list">
        <h3>고정 업무</h3>
        <div class="task-items-container">
          <div
            v-for="task in fixedTasks"
            :key="task.id"
            class="task-item fixed-task"
            :class="{ 'task-completed': task.finishedState, 'task-red': task.isCompleted }"
            @click="toggleTaskStatus(task)"
          >
            <div class="task-content">{{ task.title }}</div>
          </div>
        </div>
      </div>

      <!-- 고정 업무와 비고정 업무 사이 회색 실선 -->
      <hr class="separator">

      <!-- 비고정 업무 구역 -->
      <div class="task-list non-fixed-tasks">
        <h3>비고정 업무</h3>
        <div class="task-items-container">
          <div
            v-for="task in nonFixedTasks"
            :key="task.id"
            class="task-item non-fixed-task"
            :class="{ 'task-completed': task.finishedState, 'task-blue': task.isCompleted }"
            @click="toggleTaskStatus(task)"
          >
            <div class="task-content">{{ task.title }}</div>
          </div>
        </div>
      </div>

      <button class="close-button" @click="close">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  checklist: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

// 로컬 스토리지에서 user 정보를 가져오기
const user = JSON.parse(localStorage.getItem('user'));

const close = () => {
  emit('close');
};

// 고정 업무와 비고정 업무를 구분
const fixedTasks = computed(() =>
  props.checklist.tasks.filter(task => task.isFixed)
);

const nonFixedTasks = computed(() =>
  props.checklist.tasks.filter(task => !task.isFixed)
);

// 태스크 상태 토글 함수
const toggleTaskStatus = async (task) => {
  // 수정할 태스크의 updatedAt, createdAt, userId, finishedState를 업데이트
  const updatedTask = {
    ...task,
    finishedState: !task.finishedState,
    updatedAt: new Date().toISOString(), // 현재 시간으로 수정
    userId: user?.id || null, // 로컬 스토리지에서 user ID 가져오기
    createdAt: task.createdAt || new Date().toISOString(), // 기존 createdAt 유지, null이면 현재 시간으로 설정
    isCompleted: !task.isCompleted // 완료 상태 추가
  };

  // 체크리스트 내의 태스크를 찾아서 업데이트
  const checklistTasks = props.checklist.tasks; // 현재 체크리스트의 태스크 목록
  const index = checklistTasks.findIndex(t => t.id === task.id); // 태스크 인덱스 찾기

  if (index !== -1) {
    checklistTasks[index] = updatedTask; // 태스크 업데이트
  }

  // 서버에 업데이트 요청
  try {
    const response = await fetch(`http://localhost:8080/checklists/${props.checklist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...props.checklist,
        tasks: checklistTasks // 수정된 태스크 목록 포함
      }),
    });

    if (!response.ok) {
      throw new Error('서버 응답이 실패했습니다.');
    }

    console.log('체크리스트의 태스크 상태가 수정되었습니다:', await response.json());
  } catch (error) {
    console.error('태스크 상태 수정 중 오류 발생:', error);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #000000;
}

.task-list {
  margin-bottom: 20px;
}

.task-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.task-item {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 0 1 auto;
  max-width: 100%;
  word-wrap: break-word;
  cursor: pointer; /* 커서 포인터로 변경 */
}

.fixed-task {
  background-color: #fce4ec;
}

.non-fixed-task {
  background-color: #e3f2fd;
}

.task-completed {
  background-color: #d32f2f; /* 완료된 태스크 색상 */
  color: white; /* 텍스트 색상 변경 */
}

.task-red {
  background-color: #f44336; /* 고정 업무 클릭 시 색상 */
}

.task-blue {
  background-color: #2196f3; /* 비고정 업무 클릭 시 색상 */
}

.close-button {
  padding: 10px 20px;
  border: 1px solid #f44336;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 16px;
  background-color: white;
  color: #f44336;
}

.close-button:hover {
  background-color: #f44336;
  color: white;
}
</style>
