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
            @selectSchedule="selectSchedule"
            :enableDaySelect="enableDaySelect"
            :enableScheduleSelect="enableScheduleSelect"
        />

        <ScheduleInfoModalForDelete
            v-if="isScheduleModalOpen"
            :isOpen="isScheduleModalOpen"
            :selectedDate="selectedDay"
            :schedules="selectedSchedules"
            :currentMonth="months[currentMonth]"
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
import { ref } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
import ScheduleInfoModalForDelete from '@/components/schedule/modal/ScheduleInfoModalForDelete.vue';
import DeleteModal from '@/components/schedule/modal/DeleteModal.vue';

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());
const months = ref(['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']);
const weekdays = ref(['일', '월', '화', '수', '목', '금', '토']);
const blanks = ref([]);
const daysInMonth = ref([]);

const selectedDay = ref(null);
const selectedSchedules = ref([]);
const isScheduleModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const enableDaySelect = ref(false);
const enableScheduleSelect = ref(true);

// 특정 날짜가 오늘인지 확인하는 함수
const isToday = (day) => {
    const today = new Date();
    return (
        currentYear.value === today.getFullYear() &&
        currentMonth.value === today.getMonth() &&
        day === today.getDate()
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

const scheduleData = [
    { day: 15, title: '유제은', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '백경석', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '조제훈', type: 'fun', time: '1T (09:00 ~ 14:00)' },
    { day: 15, title: '이서현', type: 'important', time: '2T (14:00 ~ 17:00)' },
    { day: 15, title: '이나현', type: 'personal', time: '3T (17:00 ~ 21:00)' },
];

const selectDay = (day) => {
    if (enableDaySelect.value) {
        selectedDay.value = day;
        openRegisterModal();
    }
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

const openDeleteModalAfterClosingSchedule = () => {
    closeScheduleModal();
    isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
};

const handleDeleteConfirmation = () => {
    setTimeout(() => {
        closeDeleteModal();
    }, 5000);
};

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

updateCalendar();
</script>

<style scoped>
    @import url('@/assets/css/schedule/DeletePage.css');
</style>
