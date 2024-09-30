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
  
      <ScheduleInfoModalForDelete
        v-if="isScheduleModalOpen"
        :isOpen="isScheduleModalOpen"
        :selectedDate="selectedDay"
        :schedules="selectedSchedules"
        :currentMonth="months[currentMonth - 1]"
        @close="closeScheduleModal"
        @deleteRequest="openDeleteModalAfterClosingSchedule"
      />
    </SideMenu>
  
    <DeleteModal
      v-if="isDeleteModalOpen"
      :isOpen="isDeleteModalOpen"
      @close="closeDeleteModal"
      @confirmDelete="handleDeleteConfirmation"
    />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import SideMenu from '@/components/SideMenu.vue';
  import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
  import ScheduleInfoModalForDelete from '@/components/schedule/modal/ScheduleInfoModalForDelete.vue';
  import DeleteModal from '@/components/DeleteModal.vue';
  
  const currentYear = ref(new Date().getFullYear());
  const currentMonth = ref(new Date().getMonth() + 1);
  const months = ref(['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']);
  const weekdays = ref(['일', '월', '화', '수', '목', '금', '토']);
  const blanks = ref([]);
  const daysInMonth = ref([]);
  
  const selectedDay = ref(null);
  const selectedSchedules = ref([]);
  const isScheduleModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const scheduleData = ref([]);
  const selectedScheduleId = ref(null);
  
  const enableDaySelect = ref(false);
  const enableScheduleSelect = ref(true);
  
  const today = ref(new Date());
  
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
  
  const groupSchedulesByType = (day) => {
    const daySchedules = getSchedulesForDay(day);
  
    if (!daySchedules.length) {
      return [];
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
    const matchingSchedules = scheduleData.value.filter(schedule => 
      new Date(schedule.schedule_start_date).getMonth() + 1 === currentMonth.value &&
      new Date(schedule.schedule_start_date).getFullYear() === currentYear.value
    );
  
    return matchingSchedules.flatMap(schedule => 
      schedule.employee_working_part.filter(
        part => part.day === day && part.month === currentMonth.value && part.year === currentYear.value
      )
    );
  };
  
  const selectSchedule = ({ day, group }) => {
    if (enableScheduleSelect.value) {
      selectedDay.value = day;
      selectedSchedules.value = group.names.map(name => ({
        name: name,
        time: group.time,
        type: group.type,
        id: group.id
      }));
      selectedScheduleId.value = group.id;
      isScheduleModalOpen.value = true;
    }
  };
  
  const closeScheduleModal = () => {
    isScheduleModalOpen.value = false;
  };
  
  const openDeleteModalAfterClosingSchedule = () => {
    closeScheduleModal();
    isDeleteModalOpen.value = true;
  };
  
  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
  };
  
  const handleDeleteConfirmation = async () => {
  try {
    if (selectedScheduleId.value) {
      const scheduleToUpdate = scheduleData.value.find(schedule => 
        schedule.employee_working_part.some(part => part.id === selectedScheduleId.value)
      );

      if (scheduleToUpdate) {
        scheduleToUpdate.employee_working_part = scheduleToUpdate.employee_working_part.filter(
          part => part.id !== selectedScheduleId.value
        );

        await axios.patch(`http://localhost:8080/schedules/${scheduleToUpdate.id}`, {
          employee_working_part: scheduleToUpdate.employee_working_part
        });

        alert('스케줄이 삭제되었습니다.');
        loadScheduleData();
      } else {
        alert('삭제할 스케줄을 찾을 수 없습니다.');
      }
    }
  } catch (error) {
    console.error('스케줄 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
    alert('스케줄 삭제 중 문제가 발생했습니다.');
  }
  closeDeleteModal();
};

  
  const loadScheduleData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/schedules');
      scheduleData.value = response.data;
    } catch (error) {
      console.error('스케줄 데이터를 불러오는 중 오류 발생:', error);
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
  
  onMounted(() => {
    loadScheduleData();
    updateCalendar();
  });
  </script>
  
  <style scoped>
    @import url('@/assets/css/schedule/DeletePage.css');
  </style>
  