<template>
  <SideMenu>
    <ScheduleCalendar
      :currentYear="currentYear"
      :currentMonth="currentMonth"
      :months="months"
      :weekdays="weekdays"
      :blanks="blanks"
      :daysInMonth="daysInMonth"
      :selectedDay="selectedDay"
      :isToday="isToday"
      :groupSchedulesByType="groupSchedulesByType"
      :prevMonth="prevMonth"
      :nextMonth="nextMonth"
      @selectDay="selectDay"
      :enableDaySelect="true"
      :enableScheduleSelect="false"
    />

    <EmployeeRegisterModal
      v-if="isRegisterModalOpen"
      :isOpen="isRegisterModalOpen"
      :selectedDate="selectedDate"
      @close="closeRegisterModal"
      @submit="handleEmployeeRegister"
    />
  </SideMenu>
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import EmployeeRegisterModal from '@/components/schedule/modal/EmployeeRegisterModal.vue';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';

const selectedDay = ref(null); // Number 타입
const selectedDate = ref('');  // String 타입

const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth());
const currentYear = ref(currentDate.value.getFullYear());

const today = ref(new Date());
const isRegisterModalOpen = ref(false);

const months = [
  '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
];

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

const blanks = ref([]);
const daysInMonth = ref([]);

const updateCalendar = () => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);

  const numBlanks = firstDay.getDay();
  blanks.value = Array(numBlanks).fill(null);

  const daysArray = [];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    daysArray.push(day);
  }
  daysInMonth.value = daysArray;
};

const isToday = (day) => {
  return (
    currentYear.value === today.value.getFullYear() &&
    currentMonth.value === today.value.getMonth() &&
    day === today.value.getDate()
  );
};

const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  updateCalendar();
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  updateCalendar();
};

const selectDay = (day) => {
  selectedDay.value = day; // Number 타입
  // 날짜 문자열 생성
  selectedDate.value = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  openRegisterModal();
};

function openRegisterModal() {
  isRegisterModalOpen.value = true;
}

function closeRegisterModal() {
  isRegisterModalOpen.value = false;
}

function handleEmployeeRegister(employeeData) {
  console.log("등록된 직원:", employeeData);
  closeRegisterModal();
}

const scheduleData = [
  { day: 15, title: '유제은', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '백경석', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '조제훈', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '이서현', type: 'important', time: '2T (14:00 ~ 17:00)' },
  { day: 15, title: '이나현', type: 'personal', time: '3T (17:00 ~ 21:00)' },
];

const groupSchedulesByType = (day) => {
  const daySchedules = scheduleData.filter(schedule => schedule.day === day);
  const groupedSchedules = {};

  daySchedules.forEach((schedule) => {
    if (!groupedSchedules[schedule.type]) {
      groupedSchedules[schedule.type] = {
        type: schedule.type,
        time: schedule.time,
        names: []
      };
    }
    groupedSchedules[schedule.type].names.push(schedule.title);
  });

  return Object.values(groupedSchedules);
};

updateCalendar();
</script>

<style scoped>
  @import url('@/assets/css/schedule/RegisterPage.css');
</style>
