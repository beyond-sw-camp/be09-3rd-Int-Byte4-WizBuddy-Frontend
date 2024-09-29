<template>
    <div class="schedule-container">
      <div class="schedule-header">
        <button class="prev-next-button" @click="prevWeek">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2>{{ months[currentMonth] }}월 {{ currentWeek }}주차 스케줄</h2>
        <button class="prev-next-button" @click="nextWeek">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="date-range">
        {{ months[currentMonth] }}월 {{ currentWeek }}주차 ({{ currentWeekRange.start }} ~ {{ currentWeekRange.end }})
      </div>
      <div class="time-header">
        <div>1T(9:00 ~ 14:00)</div>
        <div>2T(14:00 ~ 17:00)</div>
        <div>3T(17:00 ~ 21:00)</div>
      </div>
      <div class="schedule-grid">
        <div class="day-container">
          <div class="day-column" v-for="(day, index) in days" :key="index">
            <div class="day-header">{{ day }}</div>
            <div class="day-margin"></div>
            <div class="time-slot" v-for="time in 3" :key="time">
              <div class="schedule-item" v-if="hasSchedule(day, time)">
                {{ getSchedule(day, time).name }} - {{ getSchedule(day, time).time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const currentDate = ref(new Date());
  const currentYear = ref(currentDate.value.getFullYear());
  const currentMonth = ref(currentDate.value.getMonth());
  const currentWeek = ref(getWeekOfMonth(currentDate.value));
  const currentWeekRange = ref(getWeekRange(currentYear.value, currentMonth.value, currentWeek.value));
  
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  
  const schedules = ref([]);
  const activeSchedules = ref([]);
  
  function getWeekOfMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const currentDay = date.getDate();
    return Math.ceil((currentDay + firstDay) / 7);
  }
  
  function getWeekRange(year, month, week) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstMonday = new Date(firstDayOfMonth.setDate(1 + ((8 - firstDayOfMonth.getDay()) % 7)));
  
    const startDate = new Date(firstMonday);
    startDate.setDate(startDate.getDate() + (week - 1) * 7);
  
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  
    return {
      start: formatDate(startDate),
      end: formatDate(endDate)
    };
  }
  
  function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  
  function getWeeksInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return Math.ceil((lastDayOfMonth.getDate() + new Date(year, month, 1).getDay()) / 7);
  }
  
  const prevWeek = () => {
    const newDate = new Date(currentDate.value.setDate(currentDate.value.getDate() - 7));
    currentDate.value = newDate;
    currentWeek.value = getWeekOfMonth(newDate);
    currentWeekRange.value = getWeekRange(currentYear.value, currentMonth.value, currentWeek.value);
    loadScheduleData(); 
  };
  
  const nextWeek = () => {
    const newDate = new Date(currentDate.value.setDate(currentDate.value.getDate() + 7));
    currentDate.value = newDate;
    currentWeek.value = getWeekOfMonth(newDate);
    currentWeekRange.value = getWeekRange(currentYear.value, currentMonth.value, currentWeek.value);
    loadScheduleData(); 
  };
  
  onMounted(async () => {
    await loadScheduleData();
  });
  
  const loadScheduleData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/schedules');
      const startDateFormatted = formatDate(new Date(currentWeekRange.value.start));
  
      activeSchedules.value = response.data.filter(schedule => 
        schedule.schedule_start_date === startDateFormatted
      );
  
      schedules.value = activeSchedules.value.flatMap(schedule => schedule.employee_working_part);
    } catch (error) {
      console.error('Failed to fetch schedule data:', error);
    }
  };
  
  const hasSchedule = (day, time) => {
    return schedules.value.some(part => part.day === getDayOfWeek(day) && part.time.startsWith(`${time}T`));
  };
  
  const getSchedule = (day, time) => {
    return schedules.value.find(part => part.day === getDayOfWeek(day) && part.time.startsWith(`${time}T`)) || { name: '', time: '' };
  };
  
  function getDayOfWeek(day) {
    const daysMapping = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5, '토': 6, '일': 7 };
    return daysMapping[day];
  }
  </script>
  
  <style scoped>
  @import url('@/assets/css/schedule/WeeklyScheduleContainer.css');
  </style>
  