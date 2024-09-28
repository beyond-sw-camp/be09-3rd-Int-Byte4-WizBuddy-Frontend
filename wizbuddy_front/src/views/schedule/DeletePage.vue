<template>
    <div class="main-container">
        <aside class="left-side">
            <ScheduleTab />
            <div class="side">
                <EmployerSideMenu />
            </div>
        </aside>
        
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
            :selectSchedule="selectSchedule"
            :prevMonth="prevMonth"
            :nextMonth="nextMonth"
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

        <aside class="right-side">
            <UserProfileMenu />
        </aside>

        <DeleteModal
            v-if="isDeleteModalOpen"
            :isOpen="isDeleteModalOpen"
            @close="closeDeleteModal"
            @confirmDelete="handleDeleteConfirmation"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import ScheduleTab from '@/components/schedule/ScheduleTab.vue';
    import UserProfileMenu from '@/components/UserProfileMenu.vue';
    import EmployerSideMenu from '@/components/schedule/EmployerSideMenu.vue';
    import ScheduleCalendar from '@/components/schedule/ScheduleCalendar.vue';
    import ScheduleInfoModalForDelete from '@/components/schedule/modal/ScheduleInfoModalForDelete.vue';
    import DeleteModal from '@/components/schedule/modal/DeleteModal.vue';

    const selectedDay = ref(null);
    const currentDate = ref(new Date());
    const currentMonth = ref(currentDate.value.getMonth());
    const currentYear = ref(currentDate.value.getFullYear());

    const selectedSchedules = ref([]);
    const isScheduleModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const today = ref(new Date());

    const months = [
        '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월',
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

        daySchedules.forEach((schedule) => {
            if (!groupedSchedules[schedule.type]) {
                groupedSchedules[schedule.type] = {
                type: schedule.type,
                time: schedule.time,
                names: [],
                };
            }
            groupedSchedules[schedule.type].names.push(schedule.title);
        });

        return Object.values(groupedSchedules);
    };

    const getSchedulesForDay = (day) => {
        return scheduleData.filter((schedule) => schedule.day === day);
    };

    const selectSchedule = (day, scheduleGroup) => {
        selectedSchedules.value = scheduleGroup.names.map((name) => ({
            title: name,
            time: scheduleGroup.time,
            type: scheduleGroup.type,
        }));
        selectedDay.value = day;
        isScheduleModalOpen.value = true;
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

    updateCalendar();
</script>

<style scoped>
    @import url('@/assets/css/schedule/DeletePage.css');
</style>
