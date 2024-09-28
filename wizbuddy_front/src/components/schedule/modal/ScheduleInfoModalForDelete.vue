<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <h3 class="modal-title">{{ currentMonth }} {{ selectedDate }}일 스케줄</h3>
      <ul>
        <li v-for="schedule in schedules" :key="schedule.title">
          {{ schedule.time }}: {{ schedule.title }}
          <button @click="requestDelete(schedule)">삭제</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  selectedDate: Number,
  schedules: Array,
  currentMonth: String
});

const emit = defineEmits(['close', 'deleteRequest']);

function closeModal() {
  emit('close');
}

function requestDelete(schedule) {
  emit('deleteRequest', schedule);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

ul {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
