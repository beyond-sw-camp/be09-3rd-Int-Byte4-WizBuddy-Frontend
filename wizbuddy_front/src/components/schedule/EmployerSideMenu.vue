<template>
  <div class="side">
      <button class="side-tab-item" @click="openRegisterModal">스케줄 등록</button>
      <button class="side-tab-item" @click="setActiveTab('navigateToDelete')">삭제</button>

      <Register v-if="isRegisterModalOpen" :isOpen="isRegisterModalOpen" @close="closeRegisterModal" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, watchEffect } from 'vue';
import Register from './ScheduleRegisterModal.vue';

const router = useRouter();
const route = useRoute();

const isRegisterModalOpen = ref(false);
const activeTab = ref('');

// 모달 열기 함수
function openRegisterModal() {
  isRegisterModalOpen.value = true;
}

// 모달 닫기 함수
function closeRegisterModal() {
  isRegisterModalOpen.value = false;
}

// 스케줄 등록 처리 함수
function handleSubmit(schedule) {
  console.log('등록된 스케줄:', schedule);
  closeRegisterModal();
}

// 삭제 버튼 클릭 시 라우팅
const setActiveTab = (tab) => {
  activeTab.value = tab;
  switch (tab) {
      case 'navigateToDelete':
          router.push('/schedule/delete');
          break;
  }
};

// 라우터 상태에 따른 탭 활성화
watch(() => route.path, (newPath) => {
  if (newPath === '/schedule/delete') {
      activeTab.value = 'navigateToDelete';
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
  font-size: 16px;
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
