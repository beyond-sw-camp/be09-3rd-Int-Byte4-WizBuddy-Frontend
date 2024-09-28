<template>
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
        >
          <div class="day-number">{{ day }}</div>
          <div class="schedules">
            <div
              v-for="(group, type) in groupSchedulesByType(day)"
              :key="type"
              :class="['schedule', group.type]"
              @click="selectSchedule(day, group)"
            >
              {{ group.names.join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentYear: Number,
  currentMonth: Number,
  months: Array,
  weekdays: Array,
  blanks: Array,
  daysInMonth: Array,
  selectedDay: Number,
  isToday: Function,
  groupSchedulesByType: Function,
  selectSchedule: Function,
  prevMonth: Function,
  nextMonth: Function,
});
</script>

<style scoped>
@import url('@/assets/css/schedule/ScheduleCalendar.css');
</style>
