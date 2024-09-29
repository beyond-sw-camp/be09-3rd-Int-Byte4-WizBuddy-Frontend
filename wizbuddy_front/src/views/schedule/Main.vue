<template>
  <SideMenu>
    <ScheduleCalendar
      :currentYear="currentYear"
      :currentMonth="currentMonth - 1"
      :months="months"
      :weekdays="weekdays"
      :blanks="blanks"
      :daysInMonth="daysInMonth"
      :selectedDay="selectedDay"
      :isToday="isToday"
      :groupSchedulesByType="groupSchedulesByType"
      @selectSchedule="selectSchedule"
      :prevMonth="prevMonth"
      :nextMonth="nextMonth"
      :enableDaySelect="enableDaySelect"
      :enableScheduleSelect="enableScheduleSelect"
    />

    <ScheduleInfoModal
      v-if="isScheduleModalOpen"
      :isOpen="isScheduleModalOpen"
      :schedules="selectedSchedules"
      :currentMonth="months[currentMonth - 1]"
      :selectedDate="selectedDay"
      @close="closeScheduleModal"
    />
  </SideMenu>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SideMenu from '@/components/SideMenu.vue';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
import ScheduleInfoModal from '@/components/schedule/modal/ScheduleInfoModal.vue';

const selectedDay = ref(null);
const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth() + 1);
const currentYear = ref(currentDate.value.getFullYear());

const selectedSchedules = ref([]);
const isScheduleModalOpen = ref(false);

const enableDaySelect = ref(false);
const enableScheduleSelect = ref(true);

const today = ref(new Date());

const months = [
  '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
];

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

const scheduleData = ref([]);
const blanks = ref([]);
const daysInMonth = ref([]);

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1);
const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);

const loadScheduleData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/schedules');
    scheduleData.value = response.data;
    updateCalendar();
  } catch (error) {
    console.error('Failed to fetch schedule data:', error);
  }
};

const updateCalendar = () => {
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value, 0);

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
    currentMonth.value === today.value.getMonth() + 1 &&
    day === today.value.getDate()
  );
};

const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 1) {
    currentMonth.value = 12;
    currentYear.value--;
  }
  loadScheduleData();  // 이전 달로 갈 때 스케줄을 다시 불러옵니다.
  updateCalendar();
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 12) {
    currentMonth.value = 1;
    currentYear.value++;
  }
  loadScheduleData();  // 다음 달로 갈 때 스케줄을 다시 불러옵니다.
  updateCalendar();
};


const groupSchedulesByType = (day) => {
  const daySchedules = getSchedulesForDay(day);

  if (!daySchedules.length) {
    return [];  // 스케줄이 없는 경우 빈 배열을 반환합니다.
  }

  const groupedSchedules = {};
  daySchedules.forEach(schedule => {
    if (!groupedSchedules[schedule.type]) {
      groupedSchedules[schedule.type] = {
        type: schedule.type,
        time: schedule.time,
        names: [],
        id: schedule.id
      };
    }
    groupedSchedules[schedule.type].names.push(schedule.name);
  });
  return Object.values(groupedSchedules);
};


const getSchedulesForDay = (day) => {
  return scheduleData.value.filter(schedule => schedule.day === day && schedule.month === currentMonth.value);
};

const selectSchedule = ({ day, group }) => {
  if (enableScheduleSelect.value) {
    selectedDay.value = day;
    selectedSchedules.value = group.names.map(name => ({
      name: name,
      time: group.time,
      type: group.type,
      id: group.id  // id로 변경
    }));
    isScheduleModalOpen.value = true;
  }
};

const closeScheduleModal = () => {
  isScheduleModalOpen.value = false;
};

onMounted(() => {
  loadScheduleData();
  updateCalendar();
});
</script>

<style scoped>
  @import url('@/assets/css/schedule/Main.css');
</style>
