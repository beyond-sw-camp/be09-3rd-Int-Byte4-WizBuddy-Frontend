<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">{{ currentMonth }} {{ selectedDate }}일</h3>
          <ul>
            <li v-for="schedule in schedules" :key="schedule.name">
              {{ schedule.time }}: {{ schedule.name }}
              <button class="edit-btn" @click="editSchedule(schedule)">수정</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  import { defineEmits } from 'vue';

  const props = defineProps({
    isOpen: Boolean,
    selectedDate: Number,
    schedules: Array,
    currentMonth: String
  });
  
  const emit = defineEmits(['close']);
  const router = useRouter();
  
  function closeModal() {
    emit('close');
  }

  function editSchedule(schedule) {
    router.push({
      name: 'ScheduleEdit',
      query: {
        id: schedule.id,
        date: `${props.currentMonth} ${props.selectedDate}일`,
        worker: schedule.name,
        timeSlot: schedule.time
      }
    });
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
