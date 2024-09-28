<template>
    <nav class="tab-container">
        <button class="tab-item" :class="{ active: activeTab === 'scheduleinfo' }" @click="setActiveTab('scheduleinfo')" v-if="isScheduleIncludePage">근무일정</button>
        <button class="tab-item" :class="{ active: activeTab === 'weeklyschedule' }" @click="setActiveTab('weeklyschedule')" v-if="isScheduleIncludePage">일주일 스케줄표</button>
        <!-- <button class="tab-item" :class="{ active: activeTab === 'myschedule' }" @click="setActiveTab('myschedule')">나의 스케줄표</button>
        <button class="tab-item" :class="{ active: activeTab === 'worktime' }" @click="setActiveTab('worktime')">출퇴근 시간 확인</button> -->
    </nav>
</template>

<script setup>
    import {useRoute, useRouter} from 'vue-router';
    import {ref, watch, onMounted, watchEffect} from 'vue';

    const route = useRoute();
    const router = useRouter();
    const isScheduleIncludePage = ref(false);
    const isscheduleInfoPage = ref(false);
    const isWeeklyschedulePage = ref(false);
    // const isMyschedulePage = ref(false);
    // const isWorktimePage = ref(false);

    watch(() => route.path, (newPath) => {
        isScheduleIncludePage.value = newPath.includes('/schedule');
        isscheduleInfoPage.value = newPath === '/schedule';
        isWeeklyschedulePage.value = newPath === '/schedule/schedules';
        // isMyschedulePage.value = newPath === '/schedule/myschedule';
        // isWorktimePage.value = newPath === '/schedule/worktime';
    }
    , 
    {
        immediate: true 
    });

    const activeTab = ref('');

    const setActiveTab = (tab) => {
        activeTab.value = tab;

        switch (tab) {
            case 'scheduleinfo':
                router.push('/schedule');
                break;
            case 'weeklyschedule':
                router.push('/schedule/schedules');
                break;
            // case 'myschedule':
            //     router.push('/schedule/myschedule');
            //     break;
            // case 'worktime':
            //     router.push('/schedule/worktime');
            //     break;
        }
    }

    const updateActiveTabFromRoute = () => {
        const path = route.path;
        if (path.includes('/schedule/schedules')) {
            activeTab.value = 'weeklyschedule';
        // } else if (path.includes('myschedule')) {
        //     activeTab.value = 'myschedule';
        // } else if (path.includes('worktime')) {
        //     activeTab.value = 'worktime';
        } else if (path === '/schedule') {
            activeTab.value = 'scheduleinfo';
        } 
    }

    onMounted(() => {
        updateActiveTabFromRoute();
    });

    watchEffect(() => {
        updateActiveTabFromRoute();
    });
</script>

<style scoped>
.tab-container {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    height: auto;
    min-width: 180px;
}

.tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #000;
    text-align: center;
    transition: background-color 0.3s ease;
}

.tab-item:hover {
    background-color: #f0f0f0;
}

.tab-item.active {
    background: rgba(69, 83, 157, 0.20);
    color: #000;
    border-radius: 10px;
    font-weight: bold;
}

</style>