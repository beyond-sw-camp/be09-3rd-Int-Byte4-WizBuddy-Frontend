<template>
    <div class="main-container">
        <aside class="left-side">
            <ScheduleTab/>
            <div class="side">
                <EmployerSideMenu/>
            </div>
        </aside>

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
                    <div
                        v-for="day in daysInMonth"
                        :key="day"
                        class="calendar-day"
                        :class="{ today: isToday(day), selected: day === selectedDay }"
                        @click="selectDay(day)">
                        <div class="day-number">{{ day }}</div>
                        <div class="schedules">
                            <div
                                v-for="(group, index) in groupSchedulesByType(day)"
                                :key="index"
                                :class="['schedule', group.type]">
                                {{ group.names.join(', ') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <aside class="right-side">
            <UserProfileMenu/>
        </aside>

        <!-- 직원 등록 모달 -->
        <EmployeeRegisterModal
          v-if="isRegisterModalOpen"
          :isOpen="isRegisterModalOpen"
          :selectedDate="selectedDay"
          @close="closeRegisterModal"
          @submit="handleEmployeeRegister"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import ScheduleTab from './ScheduleTab.vue';
    import UserProfileMenu from '../UserProfileMenu.vue';
    import EmployerSideMenu from './EmployerSideMenu.vue';
    import EmployeeRegisterModal from './modal/EmployeeRegisterModal.vue';

    const selectedDay = ref(null);
    const currentDate = ref(new Date());
    const currentMonth = ref(currentDate.value.getMonth());
    const currentYear = ref(currentDate.value.getFullYear());
    
    const today = ref(new Date());

    // 모달 상태 관리 변수
    const isRegisterModalOpen = ref(false);
    
    const months = [
      '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
    ];
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 스케줄 데이터 예시
    const scheduleData = [
    { day: 15, title: '유제은', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '백경석', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '조제훈', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '이서현', type: 'important', time: '2T (14:00 ~ 17:00)' },
    { day: 15, title: '이나현', type: 'personal', time: '3T (17:00 ~ 21:00)' },
    ];
    
    const groupSchedulesByType = (day) => {
    const daySchedules = getSchedulesForDay(day);
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

    const getSchedulesForDay = (day) => {
        return scheduleData.filter(schedule => schedule.day === day);
    };
    
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
    
    const selectDay = (day) => {
      selectedDay.value = day;
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

    updateCalendar();
</script>


<style scoped>
  @import url('@/assets/css/schedule/ScheduleRegisterPage.css');
</style>
