<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <h3 class="modal-title">스케줄 등록</h3>
        <form @submit.prevent="submitForm" class="modal-form">
          <div class="form-group">
            <label for="date">시작일 선택 (월요일):</label>
            <input 
              type="date" 
              id="date" 
              v-model="schedule.date" 
              :min="minDate" 
              :disabled="isDateDisabled(schedule.date)"
              @change="validateMonday" 
              required 
              class="input-field" 
            />
          </div>
          <p v-if="!isValid" class="error-message">선택한 날짜는 월요일이 아닙니다.</p>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">취소</button>
            <button type="submit" class="submit-btn" :disabled="!isValid">등록</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    disabledMondays: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(["close", "submit"]);
  
  function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  
  const schedule = ref({
    date: ""
  });
  
  const isValid = ref(true);
  const minDate = ref(formatDate(new Date()));
  
  function closeModal() {
    emit("close");
  }
  
  function submitForm() {
    if (isValid.value) {
      emit("submit", schedule.value);
      closeModal();
    }
  }
  
  function validateMonday() {
    const selectedDate = new Date(schedule.value.date);
    isValid.value = selectedDate.getDay() === 1;
  }
  
  function isDateDisabled(date) {
    if (!date) return false;
    return props.disabledMondays.includes(formatDate(date));
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
    background-color: #DCEDF9;
    padding: 30px;
    border-radius: 20px;
    width: 400px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .modal-title {
    font-size: 25px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 30px;
    color: #000;
  }
  
  .modal-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .input-field {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .cancel-btn, .submit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-size: 18px;
    cursor: pointer;
    width: 45%;
  }
  
  .cancel-btn {
    background-color: #f0f0f0;
    color: #000;
  }
  
  .submit-btn {
    background-color: #4285F4;
    color: #fff;
  }
  
  .cancel-btn:hover {
    background-color: #ddd;
  }
  
  .submit-btn:hover {
    background-color: #357ae8;
  }
  </style>
  