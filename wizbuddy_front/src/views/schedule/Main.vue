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
    :currentMonth="months[currentMonth]"
    :selectedDate="selectedDay"
    @close="closeScheduleModal"
/>


  </SideMenu>
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
import ScheduleInfoModal from '@/components/schedule/modal/ScheduleInfoModal.vue';

const selectedDay = ref(null);
const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth());
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

const scheduleData = [
  { day: 15, title: '유제은', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '백경석', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '조제훈', type: 'fun', time: '1T (09:00 ~ 14:00)' },
  { day: 15, title: '이서현', type: 'important', time: '2T (14:00 ~ 17:00)' },
  { day: 15, title: '이나현', type: 'personal', time: '3T (17:00 ~ 21:00)' },
];

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1);
const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);

const blanks = ref([]);
const daysInMonth = ref([]);

const updateCalendar = () => {
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);
  const lastDay = getLastDayOfMonth(currentYear.value, currentMonth.value);

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
  
const groupSchedulesByType = (day) => {
  const daySchedules = getSchedulesForDay(day);

  const groupedSchedules = {};
  daySchedules.forEach(schedule => {
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



const getSchedulesForDay = (day) => {
  return scheduleData.filter(schedule => schedule.day === day);
};

const selectSchedule = ({ day, group }) => {
    if (enableScheduleSelect.value) {
        selectedDay.value = day;
        selectedSchedules.value = group.names.map(name => ({
            title: name,
            time: group.time,
            type: group.type,
        }));
        isScheduleModalOpen.value = true;
    }
};


const closeScheduleModal = () => {
  isScheduleModalOpen.value = false;
};

updateCalendar();
</script>

<style scoped>
  @import url('@/assets/css/schedule/Main.css');
</style>
