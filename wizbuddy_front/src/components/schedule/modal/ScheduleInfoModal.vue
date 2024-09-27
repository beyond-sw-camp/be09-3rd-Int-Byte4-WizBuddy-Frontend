<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">{{ currentMonth }} {{ selectedDate }}일</h3>
          <button @click="closeModal" class="close-btn">X</button>
        </div>
        <div class="modal-body">
          <div v-for="(schedule, index) in flatSchedules" :key="index" class="schedule-item">
            <p>{{ getTimeSlot(schedule.type) }}: {{ schedule.title }}</p>
            <button class="edit-btn">수정</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { computed } from 'vue';

  const props = defineProps({
    isOpen: Boolean,
    selectedDate: Number,
    schedules: Array,
    currentMonth: String
  });

  const emit = defineEmits(['close']);

  function closeModal() {
    emit('close');
  }

  // Flatten the schedules to separate each name into its own entry
  const flatSchedules = computed(() => {
    return props.schedules.map(schedule => ({
      title: schedule.title,
      time: schedule.time,
      type: schedule.type
    }));
  });

  // Function to get time slot based on schedule type
  function getTimeSlot(type) {
    switch (type) {
      case 'fun':
        return '1T 09:00 ~ 14:00';
      case 'important':
        return '2T 14:00 ~ 17:00';
      case 'personal':
        return '3T 17:00 ~ 21:00';
      default:
        return '';
    }
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
    padding: 20px;
    border-radius: 10px;
    width: 450px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .modal-title {
    font-size: 20px;
    font-weight: bold;
  }

  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .schedule-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .edit-btn {
    background-color: #4285f4;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-btn:hover {
    background-color: #357ae8;
  }
  </style>
