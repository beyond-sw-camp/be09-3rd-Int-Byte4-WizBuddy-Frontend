<template>
    <div class="weekly-schedule-container">
        <ScheduleTab/>
        <div class="schedule-container">
            <div class="schedule-header">
                <button class="prev-next-button" @click="prevWeek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2>이번주 스케줄</h2>
                <button class="prev-next-button" @click="nextWeek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div class="date-range">9월 셋째주 (9/14 ~ 9/20)</div>
            <div class="time-header">
                <div>1T(9:00 ~ 14:00)</div>
                <div>2T(14:00 ~ 17:00)</div>
                <div>3T(17:00 ~ 21:00)</div>
            </div>
            <div class="schedule-grid">
                <div class="day-container">
                    <div class="day-column" v-for="(day, index) in days" :key="index">
                        <div class="day-header">{{ day }} </div>
                        <div class="day-margin"></div>
                        <div class="time-slot" v-for="time in 3" :key="time">
                            <div class="schedule-item" v-if="hasSchedule(day, time)">{{ getSchedule(day, time).title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ScheduleTab from '../ScheduleTab.vue';

    const days = ['월', '화', '수', '목', '금', '토', '일'];

    const hasSchedule = (day, time) => {
    // 스케줄 여부 확인 로직을 여기에 작성합니다.
    return true; // 임시로 모두 true 처리
};
  
const getSchedule = (day, time) => {
    // 특정 날짜와 시간대의 스케줄을 반환하는 로직
    return { title: '유제은' }; // 임시 데이터
};
  
const prevWeek = () => {
    console.log('이전 주');
};
  
const nextWeek = () => {
    console.log('다음 주');
};
</script>

<style scoped>
    @import url('@/assets/css/schedule/FindAllSchedules.css');
</style>