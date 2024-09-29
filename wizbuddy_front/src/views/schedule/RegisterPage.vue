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
      :highlightedWeeks="highlightedWeeks"
      :groupSchedulesByType="groupSchedulesByType"
      @selectDay="selectDay"
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
      :enableDaySelect="enableDaySelect"
    />

    <EmployeeRegisterModal
      v-if="isRegisterModalOpen"
      :isOpen="isRegisterModalOpen"
      :selectedDate="formattedSelectedDate"
      :selectedDay="selectedDay.value"
      :currentMonth="currentMonth.value"
      :currentYear="currentYear.value"
      :scheduleData="sortedScheduleData"
      @close="closeRegisterModal"
      @submit="handleEmployeeSubmit"
    />
  </SideMenu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import SideMenu from '@/components/SideMenu.vue';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
import EmployeeRegisterModal from '@/components/schedule/modal/EmployeeRegisterModal.vue';

const selectedDay = ref(null);
const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth() + 1);
const currentYear = ref(currentDate.value.getFullYear());
const scheduleData = ref([]);

const isRegisterModalOpen = ref(false);
const enableDaySelect = ref(true);

const today = ref(new Date());
const highlightedWeeks = ref([]);

const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const blanks = ref([]);
const daysInMonth = ref([]);

const formattedSelectedDate = computed(() => {
  if (selectedDay.value) {
    return `${currentMonth.value}월 ${selectedDay.value}일`;
  }
  return '';
});

const loadScheduleData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/schedules');
    scheduleData.value = response.data;
    highlightRegisteredWeeks(scheduleData.value);
    updateCalendar();
  } catch (error) {
    console.error('스케줄 데이터를 불러오는 중 오류 발생:', error);
  }
};

const sortedScheduleData = computed(() => {
  return scheduleData.value.map((schedule) => {
    schedule.employee_working_part = schedule.employee_working_part.sort((a, b) => {
      const timeOrder = ['1T', '2T', '3T'];
      return timeOrder.indexOf(a.time.split(' ')[0]) - timeOrder.indexOf(b.time.split(' ')[0]);
    });
    return schedule;
  });
});

const groupSchedulesByType = (day) => {
  const matchingSchedules = scheduleData.value.filter(schedule => {
    const startDate = new Date(schedule.schedule_start_date);
    return (
      startDate.getMonth() + 1 === currentMonth.value &&
      startDate.getFullYear() === currentYear.value &&
      schedule.employee_working_part.some(part => part.day === day)
    );
  });

  const groupedSchedules = {};

  matchingSchedules.forEach(schedule => {
    schedule.employee_working_part.forEach(part => {
      if (part.day === day) {
        if (!groupedSchedules[part.type]) {
          groupedSchedules[part.type] = {
            type: part.type,
            time: part.time,
            names: []
          };
        }
        groupedSchedules[part.type].names.push(part.name);
      }
    });
  });
  return Object.values(groupedSchedules);
};

const highlightRegisteredWeeks = (schedules) => {
  const weeks = schedules.map(schedule => new Date(schedule.schedule_start_date));
  highlightedWeeks.value = weeks.map(date => ({
    weekStart: getStartOfWeek(date),
    weekEnd: getEndOfWeek(date)
  }));
};

const handleEmployeeSubmit = async (employeeData) => {
  try {
    const response = await axios.get('http://localhost:8080/schedules');
    const schedules = response.data;

    const selectedDate = new Date(currentYear.value, currentMonth.value - 1, selectedDay.value);
    const weekNumber = getWeekNumber(selectedDate);

    let schedule = schedules.find(s => {
      const startDate = new Date(s.schedule_start_date);
      const endDate = getEndOfWeek(startDate);
      return selectedDate >= startDate && selectedDate <= endDate;
    });

    if (!schedule) {
      schedule = {
        id: generateId(),
        title: `${currentYear.value}년 ${months[currentMonth.value - 1]} ${weekNumber}주차 스케줄`,
        schedule_start_date: getStartOfWeek(selectedDate).toISOString().split('T')[0],
        employee_working_part: []
      };

      const postResponse = await axios.post('http://localhost:8080/schedules', schedule);
      schedule.id = postResponse.data.id;
      scheduleData.value.push(schedule);
    }

    let type = '';
    if (employeeData.time === '1T') {
      type = 'fun';
    } else if (employeeData.time === '2T') {
      type = 'important';
    } else if (employeeData.time === '3T') {
      type = 'personal';
    }

    const newEmployee = {
      id: generateId(),
      day: selectedDay.value,
      month: currentMonth.value,
      year: currentYear.value,
      name: employeeData.employee,
      type: type,
      time: `${employeeData.time} (${getTimeRange(employeeData.time)})`
    };

    schedule.employee_working_part.push(newEmployee);

    // 정렬 로직을 추가합니다.
    schedule.employee_working_part.sort((a, b) => {
      const timeOrder = ['1T', '2T', '3T'];
      return timeOrder.indexOf(a.time.split(' ')[0]) - timeOrder.indexOf(b.time.split(' ')[0]);
    });

    await axios.patch(`http://localhost:8080/schedules/${schedule.id}`, schedule);

    const updatedScheduleIndex = scheduleData.value.findIndex(s => s.id === schedule.id);
    if (updatedScheduleIndex !== -1) {
      scheduleData.value[updatedScheduleIndex] = schedule;
    } else {
      scheduleData.value.push(schedule);
    }

    alert('직원이 성공적으로 등록되었습니다.');
    closeRegisterModal();
  } catch (error) {
    console.error('직원 등록 중 오류 발생:', error);
    alert('직원 등록에 실패했습니다.');
  }
};

function getWeekNumber(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const adjustedDate = date.getDate() + firstDayOfWeek;
  return Math.ceil(adjustedDate / 7);
}

function getTimeRange(time) {
  switch (time) {
    case '1T':
      return '09:00 ~ 14:00';
    case '2T':
      return '14:00 ~ 17:00';
    case '3T':
      return '17:00 ~ 21:00';
    default:
      return '';
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

const getStartOfWeek = (date) => {
  const day = new Date(date);
  const dayOfWeek = day.getDay();
  return new Date(day.setDate(day.getDate() - dayOfWeek + 1));
};

const getEndOfWeek = (date) => {
  const day = getStartOfWeek(date);
  return new Date(day.setDate(day.getDate() + 6));
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
  loadScheduleData();
  updateCalendar();
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 12) {
    currentMonth.value = 1;
    currentYear.value++;
  }
  loadScheduleData();
  updateCalendar();
};

const selectDay = (day) => {
  selectedDay.value = day;
  isRegisterModalOpen.value = true;
};

const closeRegisterModal = () => {
  isRegisterModalOpen.value = false;
};

onMounted(() => {
  loadScheduleData();
  updateCalendar();
});
</script>

<style scoped>
  @import url('@/assets/css/schedule/RegisterPage.css');
</style>
