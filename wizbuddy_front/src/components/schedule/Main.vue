<template>
  <div class="main-container">
    <aside class="left-side">
      <ScheduleTab/>
      <EmployerSideMenu/>
    </aside>
    <!-- 나중에 json 하면서 아래 코드처럼 바꿔줘야 함 (확정 X)-->
    <!-- <aside class="left-side" v-if="userType = 'EMPLOYEE'">
      <ScheduleTab/>
    </aside>
    <aside class="left-side" v-else>
      <ScheduleTab/>
      <EmployerSideMenu/>
    </aside> -->
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="prevMonth" class="prev-next-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2>{{ currentYear }}년 {{ months[currentMonth] }} 스케줄 </h2>
        <button @click="nextMonth" class="prev-next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
  
      <div class="calendar-body">
        <div class="calendar-weekdays">
          <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <div v-for="(blank, index) in blanks" :key="index" class="calendar-day blank"></div>
          
          <div 
            v-for="day in daysInMonth"
            :key="day"
            class="calendar-day"
            :class="{ today: isToday(day), selected: day === selectedDay }"
            @click="selectDay(day)"
          >
            <div class="day-number">{{ day }}</div>
            <div class="schedules">
              <div v-for="(schedule, index) in getSchedulesForDay(day)" :key="index" :class="['schedule', schedule.type]">
                {{ schedule.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <aside class="right-side">
      <UserProfileMenu/>
    </aside>
  </div>
</template>
  
<script setup>

  import {ref} from 'vue';
  import ScheduleTab from './ScheduleTab.vue';
  import UserProfileMenu from '../UserProfileMenu.vue';
import EmployerSideMenu from './EmployerSideMenu.vue';

  const currentDate = ref(new Date());
  const currentMonth = ref(currentDate.value.getMonth());
  const currentYear = ref(currentDate.value.getFullYear());
  
  const today = ref(new Date());
  
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  const selectedDay = ref(null);
  
  // 스케줄 데이터 예시
  const scheduleData = [
    { day: 15, title: '유제은, 백경석, 조제훈', type: 'fun' },
    { day: 15, title: '이서현', type: 'important' },
    { day: 15, title: '이나현', type: 'personal' },
    // 다른 스케줄 데이터 추가 가능
  ];
  
  // 특정 날짜의 스케줄을 가져오는 함수
  const getSchedulesForDay = (day) => {
    return scheduleData.filter(schedule => schedule.day === day).slice(0, 2); // 최대 2개의 항목만 반환
  };
  
  // 특정 달의 첫 번째 날과 마지막 날 계산
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1);
  const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);
  
  // 빈 셀 계산 (첫 번째 요일에 따라 빈 셀 추가)
  const blanks = ref([]);
  
  // 현재 월의 날짜 배열
  const daysInMonth = ref([]);
  
  // 달력을 업데이트하는 함수
  const updateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);
    const lastDay = getLastDayOfMonth(currentYear.value, currentMonth.value);
  
    // 첫 번째 요일을 기준으로 빈 셀 계산
    const numBlanks = firstDay.getDay();
    blanks.value = Array(numBlanks).fill(null);
  
    // 각 달의 날짜 계산
    const daysArray = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(day);
    }
    daysInMonth.value = daysArray;
  };
  
  // 오늘 날짜인지 확인하는 함수
  const isToday = (day) => {
    return (
      currentYear.value === today.value.getFullYear() &&
      currentMonth.value === today.value.getMonth() &&
      day === today.value.getDate()
    );
  };
  
  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    currentMonth.value--;
  
    if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value--;
    }
    updateCalendar();
  };
  
  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    currentMonth.value++;
  
    if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value++;
    }
    updateCalendar();
  };
  
  // 날짜 선택 함수
  const selectDay = (day) => {
    selectedDay.value = day;
    console.log('선택한 날짜:', `${currentYear.value}-${currentMonth.value + 1}-${day}`);
  };
  
  // 초기 달력 데이터 업데이트
  updateCalendar();
  </script>
  
  <style scoped>
    @import url('@/assets/css/schedule/Main.css');
  </style>
