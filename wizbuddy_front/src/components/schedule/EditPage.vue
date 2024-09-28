<template>
    <div class="main-container">
        <aside class="left-side">
            <ScheduleTab />
            <div class="side">
                <EmployerSideMenu />
            </div>
        </aside>

        <div class="edit-container">
            <div class="edit-header">
                <h2>{{ selectedDate }} 근무자 수정</h2>
                <p>기존 근무자: {{ selectedWorker }}</p>
            </div>
            <form @submit.prevent="updateSchedule">
                <div class="edit-form">
                    <label for="scheduleDate">날짜</label>
                    <input type="text" id="scheduleDate" v-model="selectedDate" readonly />

                    <label for="workerName">근무자</label>
                    <select v-model="selectedWorker">
                        <option value="" disabled>근무자를 선택해주세요</option>
                        <option v-for="worker in workers" :key="worker" :value="worker">{{ worker }}</option>
                    </select>

                    <label for="timeSlot">시간</label>
                    <input type="text" id="timeSlot" v-model="timeSlot" readonly/>
                </div>

                <div class="edit-actions">
                    <button type="button" @click="goBack" class="cancel-btn">취소</button>
                    <button type="submit" class="submit-btn">등록</button>
                </div>
            </form>
        </div>
        <aside class="right-side">
            <UserProfileMenu />
        </aside>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ScheduleTab from './ScheduleTab.vue';
    import UserProfileMenu from '../UserProfileMenu.vue';
    import EmployerSideMenu from './EmployerSideMenu.vue';

    const router = useRouter();
    const route = useRoute();

    const selectedDate = ref('');
    const selectedWorker = ref('');
    const timeSlot = ref('');
    const workers = ['유제은', '백경석', '조제훈', '이서현', '이나현'];

    onMounted(() => {
        selectedDate.value = route.query.date || '';
        selectedWorker.value = route.query.worker || '';
        timeSlot.value = route.query.timeSlot || '';
    });

    function updateSchedule() {
        alert(`${selectedDate.value}에 ${timeSlot.value}의 근무자는 ${selectedWorker.value}으로(로) 수정되었습니다.`);
        router.push('/schedule');
    }

    function goBack() {
        router.push('/schedule');
    }
</script>

<style scoped>
    @import url('@/assets/css/schedule/EditPage.css');
</style>
