<template>
    <div class="side">
        <button class="side-tab-item" @click="openRegisterModal">등록</button>
        <button class="side-tab-item" @click="navigateToDelete">삭제</button>
  
      <Register v-if="isRegisterModalOpen" :isOpen="isRegisterModalOpen" @close="closeRegisterModal" @submit="handleSubmit" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Register from './ScheduleRegisterModal.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const isRegisterModalOpen = ref(false);
  
  function openRegisterModal() {
    isRegisterModalOpen.value = true;
  }
  
  function closeRegisterModal() {
    isRegisterModalOpen.value = false;
  }
  
  function handleSubmit(schedule) {
    console.log('등록된 스케줄:', schedule);
    // 등록된 스케줄 처리 로직을 추가하세요 (API 호출 등)
  }
  
  function navigateToDelete() {
    router.push('/delete'); // 삭제 페이지로 라우팅 -> 라우팅 된 뒤 삭제 버튼 누르면 그 때 모달창
  }
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
  