<template>
    <nav class="tab-container">
        <button class="tab-item" :class="{ active: activeTab === 'checklistList' }" @click="setActiveTab('checklistList')">체크리스트</button>
        <button class="tab-item" :class="{ active: activeTab === 'checklistListPast' }" @click="setActiveTab('checklistListPast')">체크리스트 이력</button>
        <button class="tab-item" :class="{ active: activeTab === 'taskList' }" @click="setActiveTab('taskList')">업무 리스트</button>
    </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, watchEffect } from 'vue';

const route = useRoute();
const router = useRouter();

const activeTab = ref('');

const setActiveTab = (tab) => {
    activeTab.value = tab;

    switch (tab) {
        case 'checklistList':
            router.push('/checklist');
            break;
        case 'checklistListPast':
            router.push('/checklist/past');
            break;
        case 'taskList':
            router.push('/task');
            break;
    }
};

const updateActiveTabFromRoute = () => {
    const path = route.path;
    if (path.includes('/checklist/past')) {
        activeTab.value = 'checklistListPast';
    } else if (path.includes('/checklist')) {
        activeTab.value = 'checklistList';
    } else if (path === '/task') {
        activeTab.value = 'taskList';
    }
};

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
    box-shadow: 0px 8px 33px 0px rgba(0, 0, 0, 0.1);
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
