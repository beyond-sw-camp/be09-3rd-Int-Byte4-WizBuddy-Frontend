<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <h3 class="modal-title">{{ isRegistered ? '등록 완료' : '스케줄 등록' }}</h3>

      <template v-if="!isRegistered">
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
          <div v-if="isDuplicate" class="error-message">이미 등록된 월요일입니다. 다른 날짜를 선택해주세요.</div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">취소</button>
            <button type="submit" class="submit-btn" :disabled="!isValid || isDuplicate">등록</button>
          </div>
        </form>
      </template>

      <template v-else>
        <p class="success-message">스케줄이 등록되었습니다.</p>
        <div class="modal-actions">
          <button @click="closeModal" class="confirm-btn">확인</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  isOpen: Boolean,
  disabledMondays: {
    type: Array,
    default: () => []
  },
  existingSchedules: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["close", "submit"]);

const schedule = ref({
  date: "",
  title: "",
  employee_working_part: []
});

const isValid = ref(true);
const isDuplicate = ref(false);
const isRegistered = ref(false);
const minDate = ref(formatDate(new Date()));

// 로컬스토리지에서 shopId 가져오기
const shopId = JSON.parse(localStorage.getItem('shop'))?.id;

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function closeModal() {
  if (isRegistered.value) {
    isRegistered.value = false;
    schedule.value.date = "";
  }
  emit("close");
}

async function submitForm() {
  if (isValid.value && !isDuplicate.value) {
    const selectedDate = new Date(schedule.value.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const weekNumber = getWeekNumber(selectedDate);
    schedule.value.title = `${year}년 ${month}월 ${weekNumber}주차 스케줄`;

    const newSchedule = {
      id: Date.now().toString(),
      title: schedule.value.title,
      schedule_start_date: formatDate(schedule.value.date),
      shopId, // shopId를 포함
      employee_working_part: []
    };

    try {
      await axios.post('http://localhost:8080/schedules', newSchedule);

      isRegistered.value = true;
      setTimeout(() => {
        emit("submit", newSchedule);
        closeModal();
      }, 500);
    } catch (error) {
      console.error("스케줄 등록 중 오류 발생:", error);
      alert("스케줄 등록 중 문제가 발생했습니다.");
    }
  }
}

function validateMonday() {
  const selectedDate = new Date(schedule.value.date);
  isValid.value = selectedDate.getDay() === 1;

  const formattedDate = formatDate(selectedDate);
  isDuplicate.value = props.existingSchedules.some(schedule => 
    schedule.employee_working_part.some(part => formatDate(new Date(part.year, part.month - 1, part.day)) === formattedDate)
  );
}

function isDateDisabled(date) {
  if (!date) return false;
  return props.disabledMondays.includes(formatDate(date)) || isDuplicate.value;
}

function getWeekNumber(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstMonday = firstDayOfMonth.getDay() === 1 ? firstDayOfMonth : new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (1 - firstDayOfMonth.getDay() + 7) % 7));
  const diffInDays = (date - firstMonday) / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays / 7) + 1;
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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.success-message {
  color: #4285F4;
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
}

.confirm-btn {
  background-color: #4285F4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
}

.confirm-btn:hover {
  background-color: #357ae8;
}
</style>
