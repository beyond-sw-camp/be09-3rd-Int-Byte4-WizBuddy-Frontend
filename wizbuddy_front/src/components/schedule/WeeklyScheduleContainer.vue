<template>
    <div class="schedule-container">
      <div class="schedule-header">
        <button class="prev-next-button" @click="changeWeek(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2>{{ currentMonth + 1 }}월 {{ currentWeek }}주차 스케줄</h2>
        <button class="prev-next-button" @click="changeWeek(1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="date-range">
        {{ currentMonth + 1 }}월 {{ currentWeek }}주차 ({{ currentWeekRange.start }} ~ {{ currentWeekRange.end }})
      </div>
      <div class="time-header">
        <div>1T(9:00 ~ 14:00)</div>
        <div>2T(14:00 ~ 17:00)</div>
        <div>3T(17:00 ~ 21:00)</div>
      </div>
      <div class="schedule-grid">
        <div class="day-container" v-for="(day, index) in days" :key="index">
          <div class="day-header">{{ day }}</div>
          <div class="time-slot" v-for="time in 3" :key="time">
            <div 
              class="schedule-item" 
              v-if="hasSchedule(day, time)"
              :class="getScheduleClass(getSchedule(day, time).type)"
            >
              {{ getSchedule(day, time).name }} - {{ getSchedule(day, time).time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import axios from 'axios';
  
  const currentDate = ref(new Date());
  const currentYear = ref(currentDate.value.getFullYear());
  const currentMonth = ref(currentDate.value.getMonth());
  const currentWeek = ref(getWeekOfMonth(currentDate.value));
  const currentWeekRange = ref(getWeekRange(currentDate.value));
  
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const schedules = ref([]);
  
  const filteredSchedules = computed(() => {
    const startDate = new Date(currentWeekRange.value.start);
    const endDate = new Date(currentWeekRange.value.end);
  
    return schedules.value.flatMap(schedule => 
      schedule.employee_working_part.filter(part => {
        const partDate = new Date(part.year, part.month - 1, part.day);
        return partDate >= startDate && partDate <= endDate;
      })
    );
  });
  
  const getScheduleClass = (type) => {
    switch(type) {
      case 'fun':
        return 'schedule-fun';
      case 'important':
        return 'schedule-important';
      case 'personal':
        return 'schedule-personal';
      default:
        return '';
    }
  };
  
  function getWeekOfMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // 첫 주의 월요일 찾기
    let firstMonday = new Date(firstDayOfMonth);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }
  
    // 주차 계산
    const daysDifference = Math.floor((date - firstMonday) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.floor(daysDifference / 7) + 1;
  
    // 첫 주가 이전 달에 속하는 경우 처리
    if (firstMonday < firstDayOfMonth) {
      weekNumber -= 1;
    }
  
    // 마지막 주가 다음 달에 속하는 경우 처리
    if (weekNumber === 0) {
      const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      return getWeekOfMonth(lastDayOfPrevMonth);
    }
  
    return weekNumber;
  }
  
  function getWeekRange(date) {
    const currentDay = date.getDay();
    const diff = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // 월요일 기준으로 조정
    
    const weekStart = new Date(date.setDate(diff));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
  
    return {
      start: formatDate(weekStart),
      end: formatDate(weekEnd)
    };
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const changeWeek = (direction) => {
    currentDate.value.setDate(currentDate.value.getDate() + direction * 7);
    updateCurrentWeek();
  };
  
  const updateCurrentWeek = () => {
    currentYear.value = currentDate.value.getFullYear();
    currentMonth.value = currentDate.value.getMonth();
    currentWeek.value = getWeekOfMonth(currentDate.value);
    currentWeekRange.value = getWeekRange(currentDate.value);
    loadScheduleData();
  };
  
  const loadScheduleData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/schedules');
      schedules.value = response.data;
    } catch (error) {
      console.error('Failed to fetch schedule data:', error);
    }
  };
  
  const hasSchedule = (day, time) => {
    const dayIndex = days.indexOf(day);
    const scheduleDate = new Date(currentWeekRange.value.start);
    scheduleDate.setDate(scheduleDate.getDate() + dayIndex);
  
    return filteredSchedules.value.some(part => 
      part.day === scheduleDate.getDate() &&
      part.month === scheduleDate.getMonth() + 1 &&
      part.year === scheduleDate.getFullYear() &&
      part.time.startsWith(`${time}T`)
    );
  };
  
  const getSchedule = (day, time) => {
    const dayIndex = days.indexOf(day);
    const scheduleDate = new Date(currentWeekRange.value.start);
    scheduleDate.setDate(scheduleDate.getDate() + dayIndex);
  
    return filteredSchedules.value.find(part => 
      part.day === scheduleDate.getDate() &&
      part.month === scheduleDate.getMonth() + 1 &&
      part.year === scheduleDate.getFullYear() &&
      part.time.startsWith(`${time}T`)
    ) || { name: '', time: '' };
  };
  
  watch([currentWeekRange], () => {
    loadScheduleData();
  });
  
  onMounted(() => {
    loadScheduleData();
  });
  </script>
  
  <style scoped>
  @import url('@/assets/css/schedule/WeeklyScheduleContainer.css');
  </style>