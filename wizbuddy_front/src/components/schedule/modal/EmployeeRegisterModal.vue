<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <h3 class="modal-title">직원 등록</h3>
      <form @submit.prevent="submitForm" class="modal-form">
        <div class="form-group">
          <label for="date">날짜</label>
          <input type="text" id="date" :value="selectedDate" readonly class="input-field" />
        </div>
        <div class="form-group">
          <label for="employee">직원</label>
          <input type="text" id="employee" v-model="schedule.employee" required class="input-field" />
        </div>
        <div class="form-group">
          <label for="time">시간대</label>
          <select id="time" v-model="schedule.time" required class="input-field">
            <option value="1T">1T (9:00 ~ 14:00)</option>
            <option value="2T">2T (14:00 ~ 17:00)</option>
            <option value="3T">3T (17:00 ~ 21:00)</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="closeModal">취소</button>
          <button type="submit" class="submit-btn">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  selectedDate: String,
});

const emit = defineEmits(["close", "submit"]);

const schedule = ref({
  date: props.selectedDate,
  employee: "",
  time: "",
});

function closeModal() {
  emit("close");
}

function submitForm() {
  emit("submit", schedule.value);
  closeModal();
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
