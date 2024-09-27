<template>
    <div class="weekly-schedule-container">
        <aside class="left-side">
            <ScheduleTab/>
        </aside>
        <div class="schedule-container">
            <div class="schedule-header">
                <button class="prev-next-button" @click="prevWeek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2>{{ months[currentMonth] }}월 {{ currentWeek }}주차 스케줄</h2>
                <button class="prev-next-button" @click="nextWeek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div class="date-range">
                {{ months[currentMonth] }}월 {{ currentWeek }}주차 ({{ currentWeekRange.start }} ~ {{ currentWeekRange.end }})
            </div>
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
        <aside class="right-side">
            <UserProfileMenu/>
        </aside>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import ScheduleTab from './ScheduleTab.vue';
    import UserProfileMenu from '../UserProfileMenu.vue';

    const currentDate = ref(new Date());
    const currentYear = ref(currentDate.value.getFullYear());
    const currentMonth = ref(currentDate.value.getMonth());
    const currentWeek = ref(getWeekOfMonth(currentDate.value));
    const currentWeekRange = ref(getWeekRange(currentYear.value, currentMonth.value, currentWeek.value));

    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    function getWeekOfMonth(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const currentDay = date.getDate();
        return Math.ceil((currentDay + firstDay) / 7);
    }

    function getWeekRange(year, month, week) {
        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayWeekday = firstDayOfMonth.getDay();
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() + (1 - firstDayWeekday + 7) % 7);

        const startDate = new Date(firstMonday);
        startDate.setDate(startDate.getDate() + (week - 1) * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return {
            start: formatDate(startDate),
            end: formatDate(endDate)
        };
    }

    function formatDate(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
    }

    function getWeeksInMonth(year, month) {
        const lastDayOfMonth = new Date(year, month + 1, 0);
        return Math.ceil((lastDayOfMonth.getDate() + new Date(year, month, 1).getDay()) / 7);
    }

    const prevWeek = () => {
        if (currentWeek.value === 1) {
            currentMonth.value--;
            if (currentMonth.value < 0) {
                currentMonth.value = 11;
                currentYear.value--;
            }
            currentWeek.value = getWeeksInMonth(currentYear.value, currentMonth.value);
        } else {
            currentWeek.value--;
        }
        currentWeekRange.value = getWeekRange(currentYear.value, currentMonth.value, currentWeek.value);
    };

    const nextWeek = () => {
        const totalWeeks = getWeeksInMonth(currentYear.value, currentMonth.value);
        if (currentWeek.value === totalWeeks) {
            currentMonth.value++;
            if (currentMonth.value > 11) {
                currentMonth.value = 0;
                currentYear.value++;
            }
            currentWeek.value = 1;
        } else {
            currentWeek.value++;
        }
        currentWeekRange.value = getWeekRange(currentYear.value, currentMonth.value, currentWeek.value);
    };

    const hasSchedule = (day, time) => true;
    const getSchedule = (day, time) => ({ title: '유제은' });
</script>

<style scoped>
    @import url('@/assets/css/schedule/FindAllSchedules.css');
</style>
