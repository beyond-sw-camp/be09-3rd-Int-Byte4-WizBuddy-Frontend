<template>
  <div class="side">
    <button class="side-tab-item" @click="openRegisterModal" v-if="isScheduleMainPage">스케줄 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToDelete')" v-if="isScheduleMainPage">삭제</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToRegisterEmployee')" v-if="isScheduleMainPage">직원 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToMain')" 
      v-if="isScheduleRegisterPage|isScheduleDeletePage">완료
    </button>

    <Register v-if="isRegisterModalOpen" :isOpen="isRegisterModalOpen" @close="closeRegisterModal" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch} from 'vue';
import Register from '@/components/schedule/modal/ScheduleRegisterModal.vue';

const router = useRouter();
const route = useRoute();

const isScheduleMainPage = ref(false);
const isWeeklySchedulePage = ref(false);
const isScheduleRegisterPage = ref(false);
const isScheduleDeletePage = ref(false);

const isRegisterModalOpen = ref(false);
const activeTab = ref('');

watch(() => route.path, (newPath) => {
  isScheduleMainPage.value = newPath === '/schedule';
  isWeeklySchedulePage.value = newPath ==='/schedule/schedules';
  isScheduleRegisterPage.value = newPath === '/schedule/regist';
  isScheduleDeletePage.value = newPath === '/schedule/delete';
  }
  , 
  {
    immediate: true 
  });

function openRegisterModal() {
  isRegisterModalOpen.value = true;
}

function closeRegisterModal() {
  isRegisterModalOpen.value = false;
}

function handleSubmit(schedule) {
  console.log('등록된 스케줄:', schedule);
  closeRegisterModal();
}

const setActiveTab = (tab) => {
  activeTab.value = tab;
  switch (tab) {
    case 'navigateToDelete':
      router.push('/schedule/delete');
      break;
    case 'navigateToMain':
      router.push('/schedule');
      break;
    case 'navigateToRegisterEmployee':
      router.push('/schedule/regist');
      break;
  }
};

// 라우터 상태에 따른 탭 활성화
watch(() => route.path, (newPath) => {
  if (newPath === '/schedule/delete') {
    activeTab.value = 'navigateToDelete';
  } else if (newPath === '/schedule') {
    activeTab.value = 'navigateToMain';
  } else if (newPath === '/schedule/regist') {
    activeTab.value = 'navigateToRegisterEmployee';
  }
}, { immediate: true });
</script>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f3f7fa;
}

.side-tab-item {
  display: block;
  padding: 10px 10px;
  font-size: 14px;
  width: 50%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-bottom: 20px;
  cursor: pointer;
}

.side-tab-item:hover {
  background-color: #f0f0f0;
}
</style>
