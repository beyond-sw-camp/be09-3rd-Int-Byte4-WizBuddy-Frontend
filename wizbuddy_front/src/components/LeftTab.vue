<template>
    <nav class="tab-container">
      <button class="tab-item" :class="{ active: activeTab === 'scheduleinfo' }" @click="setActiveTab('scheduleinfo')" v-if="isScheduleIncludePage">근무일정</button>
      <button class="tab-item" :class="{ active: activeTab === 'weeklyschedule' }" @click="setActiveTab('weeklyschedule')" v-if="isScheduleIncludePage">일주일 스케줄표</button>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, watch, onMounted } from 'vue';
  
  const router = useRouter();
  const isScheduleIncludePage = ref(false);
  const activeTab = ref('');
  
  // 현재 경로 감시
  watch(() => router.currentRoute.value.path, (newPath) => {
    isScheduleIncludePage.value = newPath.includes('/schedule');
  }, { immediate: true });
  
  const setActiveTab = (tab) => {
    activeTab.value = tab;
    const shopId = JSON.parse(localStorage.getItem('shop'))?.id; // 로컬스토리지에서 shopId 가져오기
  
    switch (tab) {
      case 'scheduleinfo':
        router.push('/schedule'); // 쿼리 없이 경로로 이동
        break;
      case 'weeklyschedule':
        router.push('/schedule/schedules'); // 쿼리 없이 경로로 이동
        break;
    }
  };
  
  const updateActiveTabFromRoute = () => {
    const path = router.currentRoute.value.path;
  
    if (path.includes('/schedule/schedules')) {
      activeTab.value = 'weeklyschedule';
    } else if (path === '/schedule') {
      activeTab.value = 'scheduleinfo';
    }
  };
  
  onMounted(() => {
    updateActiveTabFromRoute();
  });
  
  // 경로 변화 감시
  watch(() => router.currentRoute.value.path, updateActiveTabFromRoute);
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
  