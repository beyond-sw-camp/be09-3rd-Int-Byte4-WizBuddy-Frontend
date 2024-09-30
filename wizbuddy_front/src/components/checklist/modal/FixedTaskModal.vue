<template>
  <div class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
          <h2>고정 업무 목록</h2>

          <!-- 고정 업무 선택 -->
          <div class="task-list">
              <label v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
                  <input type="checkbox" v-model="selectedTasks" :value="task" />
                  <span class="task-title">{{ task.title }}</span>
              </label>
          </div>

          <div class="button-container">
              <button class="add-task-button" @click="submit">고정 업무 추가</button>
              <button class="close-button" @click="close">닫기</button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 고정 업무 목록을 props로 받음
const props = defineProps({
  fixedTasks: {
      type: Array,
      required: true,
  },
});

const emit = defineEmits(['close', 'add-task']);
const selectedTasks = ref([]);

// 모달 닫기 함수
const close = () => {
  emit('close');
};

// 업무 추가 함수
const submit = () => {
  selectedTasks.value.forEach(task => emit('add-task', task));
  selectedTasks.value = [];
  close();
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
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.task-item {
  display: inline-flex;
  align-items: center;
  background-color: #fce4ec;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 2px;
  white-space: nowrap;
}

.task-item input[type="checkbox"] {
  margin-right: 5px;
}

.task-title {
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.add-task-button, .close-button {
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.add-task-button {
  background-color: #4caf50;
}

.add-task-button:hover {
  background-color: #388e3c;
}

.close-button {
  background-color: #f44336;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>