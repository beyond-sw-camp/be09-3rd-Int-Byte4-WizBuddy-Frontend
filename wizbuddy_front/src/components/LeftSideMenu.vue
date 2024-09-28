<template>
  <div class="sidemenu">
    <button class="side-tab-item" @click="openScheduleRegisterModal" v-if="isScheduleMainPage">스케줄 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToScheduleDelete')" v-if="isScheduleMainPage">삭제</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToRegisterEmployee')" v-if="isScheduleMainPage">직원 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToScheduleMain')" 
      v-if="isScheduleRegisterPage || isScheduleDeletePage">완료
    </button>

    <ScheduleRegister
      v-if="isRegisterModalOpen"
      :isOpen="isRegisterModalOpen"
      @close="closeScheduleRegisterModal"
      @submit="handleScheduleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScheduleRegister from '@/components/schedule/modal/ScheduleRegisterModal.vue';

const router = useRouter();
const route = useRoute();

const isScheduleMainPage = ref(false);
const isScheduleRegisterPage = ref(false);
const isScheduleDeletePage = ref(false);
const isRegisterModalOpen = ref(false);

// 현재 페이지 경로에 따른 상태 업데이트
watch(() => route.path, (newPath) => {
  isScheduleMainPage.value = newPath === '/schedule';
  isScheduleRegisterPage.value = newPath === '/schedule/regist';
  isScheduleDeletePage.value = newPath === '/schedule/delete';
}, { immediate: true });

// 모달 열기
function openScheduleRegisterModal() {
  isRegisterModalOpen.value = true;
}

// 모달 닫기
function closeScheduleRegisterModal() {
  isRegisterModalOpen.value = false;
}

// 스케줄 등록 처리 후 모달 닫기
function handleScheduleSubmit(schedule) {
  console.log('등록된 스케줄:', schedule);
  closeScheduleRegisterModal();
}

// 탭 변경 처리
const setActiveTab = (tab) => {
  switch (tab) {
    case 'navigateToScheduleDelete':
      router.push('/schedule/delete');
      break;
    case 'navigateToScheduleMain':
      router.push('/schedule');
      break;
    case 'navigateToRegisterEmployee':
      router.push('/schedule/regist');
      break;
  }
};
</script>

<style scoped>
.sidemenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f3f7fa;
}

.side-tab-item {
  padding: 10px 10px;
  font-size: 14px;
  width: 50%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-top: 20px;
  cursor: pointer;
}

.side-tab-item:hover {
  background-color: #f0f0f0;
}
</style>
