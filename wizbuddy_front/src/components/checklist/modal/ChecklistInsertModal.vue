<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>새 체크리스트 등록</h2>

      <div class="input-group">
        <input v-model="newChecklist.title" id="title" placeholder="체크리스트 제목을 입력하세요" />
      </div>

      <div class="section-header">
        <h3>고정 업무</h3>
        <div class="divider"></div>
        <button @click="openFixedTaskModal" class="add-task-button">고정업무 추가</button>
      </div>

      <div class="task-list">
        <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
          <span class="task-title">{{ task.title }}</span>
          <button @click="removeTask(task)" class="remove-task-button">x</button>
        </div>
      </div>

      <div class="section-header">
        <h3>비고정 업무</h3>
        <div class="divider"></div>
        <button @click="openNonFixedTaskModal" class="add-task-button">비고정 업무 추가</button>
      </div>

      <div class="task-list">
        <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
          <span class="task-title">{{ task.title }}</span>
          <button @click="removeTask(task)" class="remove-task-button">x</button>
        </div>
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

      <div class="button-group">
        <button @click="submit" class="submit-button">등록</button>
        <button @click="close" class="close-button">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NonFixedTaskModal from './NonFixedTaskModal.vue';
import FixedTaskModal from './FixedTaskModal.vue';

// 로컬 스토리지에서 shop 정보를 가져오기
const shop = JSON.parse(localStorage.getItem('shop'));
const shopId = shop?.id || null; // shop 정보가 없으면 null 처리

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const newChecklist = ref({
  title: '',
  tasks: [],
  shopId: shopId, // shopId 추가
});

// 새로운 태스크를 추가하는 함수
const createTask = (task) => {
  return {
    ...task,
    finishedState: false, // 기본값: false
    userId: null, // 기본값: null
    createdAt: null, 
    updatedAt: new Date().toISOString(),
  };
};

const fixedTasks = computed(() => newChecklist.value.tasks.filter(task => task.isFixed));
const nonFixedTasks = computed(() => newChecklist.value.tasks.filter(task => !task.isFixed));

const addFixedTasksToChecklist = () => {
  props.tasks.forEach(task => {
    if (task.isFixed && !newChecklist.value.tasks.some(t => t.id === task.id)) {
      newChecklist.value.tasks.push(createTask(task)); // 수정된 부분
    }
  });
};

onMounted(() => {
  addFixedTasksToChecklist();
});

const isNonFixedTaskModalOpen = ref(false);
const isFixedTaskModalOpen = ref(false);

const openNonFixedTaskModal = () => {
  isNonFixedTaskModalOpen.value = true;
};

const openFixedTaskModal = () => {
  isFixedTaskModalOpen.value = true;
};

const closeNonFixedTaskModal = () => {
  isNonFixedTaskModalOpen.value = false;
};

const closeFixedTaskModal = () => {
  isFixedTaskModalOpen.value = false;
};

const availableNonFixedTasksFiltered = computed(() =>
  props.tasks.filter(task => !task.isFixed && !newChecklist.value.tasks.some(t => t.id === task.id))
);

const availableFixedTasksFiltered = computed(() =>
  props.tasks.filter(task => task.isFixed && !newChecklist.value.tasks.some(t => t.id === task.id))
);

const addNonFixedTask = (task) => {
  newChecklist.value.tasks.push({ ...createTask(task), isFixed: false }); // 수정된 부분
};

const addFixedTask = (task) => {
  newChecklist.value.tasks.push({ ...createTask(task), isFixed: true }); // 수정된 부분
};

const removeTask = (task) => {
  newChecklist.value.tasks = newChecklist.value.tasks.filter(t => t.id !== task.id);
};

const emit = defineEmits(['submit', 'close', 'checklist-added']);

const submit = async () => {
  if (!newChecklist.value.title || newChecklist.value.tasks.length === 0) {
    alert('체크리스트 제목과 업무를 입력해주세요.');
    return;
  }

  // ID 생성 로직 추가
  try {
    const response = await fetch('http://localhost:8080/checklists');
    const allChecklists = await response.json();
    const maxId = Math.max(...allChecklists.map(checklist => parseInt(checklist.id, 10)), 0); // 최대 ID 찾기
    newChecklist.value.id = (maxId + 1).toString(); // 새로운 ID 설정

    // 체크리스트 추가
    const addResponse = await fetch('http://localhost:8080/checklists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChecklist.value),
    });

    if (!addResponse.ok) {
      throw new Error('서버 응답이 실패했습니다.');
    }

    const addedChecklist = await addResponse.json();
    emit('checklist-added', addedChecklist);
    emit('submit', addedChecklist);
    close();
  } catch (error) {
    console.error('체크리스트 추가 중 오류 발생:', error);
    alert('체크리스트 추가에 실패했습니다. 다시 시도해주세요.');
  }
};

const close = () => {
  emit('close');
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
  padding: 40px;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  margin-bottom: 25px;
  color: #333;
}

.input-group {
  margin-bottom: 25px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 18px;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #2196f3;
  outline: none;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 20px;
  margin-right: 20px;
  white-space: nowrap;
  color: #555;
}

.divider {
  flex-grow: 1;
  height: 1px;
  background: repeating-linear-gradient(to right, #ccc 0, #ccc 5px, transparent 5px, transparent 7px);
}

.add-task-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 20px;
  white-space: nowrap;
  font-size: 16px;
}

.add-task-button:hover {
  background-color: #1e88e5;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
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

.task-title {
  flex: 1;
  margin-right: 10px;
  word-break: break-word;
}

.remove-task-button {
  background-color: transparent;
  border: none;
  color: #f44336;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  margin-left: 10px;
  line-height: 1;
}

.remove-task-button:hover {
  color: #d32f2f;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.submit-button, .close-button {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px;
  background-color: white;
}

.submit-button {
  color: #4caf50;
  border: 1px solid #4caf50;
}

.submit-button:hover {
  background-color: #4caf50;
  color: white;
}

.close-button {
  color: #f44336;
  border: 1px solid #f44336;
}

.close-button:hover {
  background-color: #f44336;
  color: white;
}
</style>