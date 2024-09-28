<template>
  <div class="modal-overlay" @click="closeEditModal">
    <div class="modal-content" @click.stop>
      <h2>체크리스트 수정</h2>

      <!-- 체크리스트 제목 -->
      <input v-model="checklistTitle" class="checklist-title" placeholder="체크리스트 제목을 입력하세요" />

      <!-- 고정 업무 구역 -->
      <div class="section">
        <div class="section-header">
          <h3>고정 업무</h3>
          <div class="divider"></div>
          <button @click="openFixedTaskModal" class="add-task-button">고정 업무 추가</button>
        </div>
        <div class="task-items-container">
          <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
            <div class="task-content">{{ task.title }}</div>
            <button class="remove-task-button" @click="removeTask(task)">x</button>
          </div>
        </div>
      </div>

      <!-- 비고정 업무 구역 -->
      <div class="section">
        <div class="section-header">
          <h3>비고정 업무</h3>
          <div class="divider"></div>
          <button @click="openNonFixedTaskModal" class="add-task-button">비고정 업무 추가</button>
        </div>
        <div class="task-items-container">
          <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
            <div class="task-content">{{ task.title }}</div>
            <button class="remove-task-button" @click="removeTask(task)">x</button>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button class="save-button" @click="submit">저장</button>
        <button class="close-button" @click="closeEditModal">닫기</button>
      </div>

      <FixedTaskModal
          v-if="isFixedTaskModalOpen"
          :fixedTasks="availableFixedTasksFiltered"
          @close="closeFixedTaskModal"
          @add-task="addFixedTask"
        />
  
        <NonFixedTaskModal
          v-if="isNonFixedTaskModalOpen"
          :nonFixedTasks="availableNonFixedTasksFiltered"
          @close="closeNonFixedTaskModal"
          @add-task="addNonFixedTask"
        />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import FixedTaskModal from '@/components/checklist/modal/FixedTaskModal.vue';
import NonFixedTaskModal from '@/components/checklist/modal/NonFixedTaskModal.vue';

// props로 checklist와 tasks를 받음
const props = defineProps({
  checklist: {
    type: Object,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
});

// checklist를 수정 가능한 상태로 복사
const submitChecklist = ref({ ...props.checklist });

// emit을 정의하여 부모에게 수정된 데이터를 전달
const emit = defineEmits(['close', 'save']);

// 제목과 고정/비고정 업무를 각각 관리
const checklistTitle = ref(submitChecklist.value.title);
const fixedTasks = computed(() => submitChecklist.value.tasks.filter(task => task.isFixed));
const nonFixedTasks = computed(() => submitChecklist.value.tasks.filter(task => !task.isFixed));

// 모달 상태 관리
const isFixedTaskModalOpen = ref(false);
const isNonFixedTaskModalOpen = ref(false);

// 사용 가능한 고정/비고정 업무 목록 계산
const availableFixedTasksFiltered = computed(() =>
  props.tasks.filter(task => task.isFixed && !fixedTasks.value.some(t => t.id === task.id))
);

const availableNonFixedTasksFiltered = computed(() =>
  props.tasks.filter(task => !task.isFixed && !nonFixedTasks.value.some(t => t.id === task.id))
);

// 모달 닫기
const closeEditModal = () => {
  emit('close');
};

// 제출 함수에서 수정된 데이터를 부모로 전달
const saveChanges = () => {
  submitChecklist.value.title = checklistTitle.value; // 수정된 제목 반영
  emit('save', submitChecklist.value); // 부모로 수정된 데이터 전달
  closeEditModal();
};

// 고정 업무 모달 열기/닫기
const openFixedTaskModal = () => {
  isFixedTaskModalOpen.value = true;
};

const closeFixedTaskModal = () => {
  isFixedTaskModalOpen.value = false;
};

// 비고정 업무 모달 열기/닫기
const openNonFixedTaskModal = () => {
  isNonFixedTaskModalOpen.value = true;
};

const closeNonFixedTaskModal = () => {
  isNonFixedTaskModalOpen.value = false;
};

// 고정 업무 추가
const addFixedTask = (task) => {
  if (!fixedTasks.value.some(t => t.id === task.id)) {
    submitChecklist.value.tasks.push({ ...task, isFixed: true });
  }
};

// 비고정 업무 추가
const addNonFixedTask = (task) => {
  if (!nonFixedTasks.value.some(t => t.id === task.id)) {
    submitChecklist.value.tasks.push({ ...task, isFixed: false });
  }
};

// 업무 삭제
const removeTask = (task) => {
  const taskIndex = submitChecklist.value.tasks.findIndex(t => t.id === task.id);
  if (taskIndex !== -1) {
    submitChecklist.value.tasks.splice(taskIndex, 1);
  }
};

// 서버에 데이터를 전송하고 수정 완료
const submit = async () => {
  try {
    const response = await fetch(`http://localhost:8080/checklists/${submitChecklist.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitChecklist.value), // 수정된 submitChecklist 전송
    });

    if (!response.ok) {
      throw new Error('서버 응답이 실패했습니다.');
    }
    
    const editChecklist = await response.json();
    emit('save', submitChecklist.value); // 수정된 데이터를 부모로 전달
    closeEditModal();
  } catch (error) {
    console.error('체크리스트 수정 중 오류 발생:', error);
    alert('체크리스트 수정에 실패했습니다. 다시 시도해주세요.');
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
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.checklist-title {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  color: #555;
  margin-right: 10px;
  white-space: nowrap;
}

.divider {
  flex-grow: 1;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #ccc 0,
    #ccc 4px,
    transparent 4px,
    transparent 8px
  );
  margin-right: 10px;
}

.add-task-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
  font-size: 14px;
}

.add-task-button:hover {
  background-color: #1e88e5;
}

.task-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  flex: 0 1 auto;
  min-width: 150px;
  max-width: 100%;
}

.fixed-task {
  background-color: #fce4ec;
}

.non-fixed-task {
  background-color: #e3f2fd;
}

.task-content {
  flex: 1;
  margin-right: 10px;
  word-break: break-word;
}

.remove-task-button {
  background-color: transparent;
  border: none;
  color: #f44336;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.save-button, .close-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  margin-left: 10px;
}

.save-button {
  background-color: #4caf50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.close-button {
  background-color: #f44336;
  color: white;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>