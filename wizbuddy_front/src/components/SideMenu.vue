<template>
    <div class="side" :class="{ 'main-page': isMainPage }">
      <aside class="left-side">
        <LeftTab v-if="!isMainPage" />
        <LeftSideMenu
          v-if="userType === 'employer'"
          @toggle-edit-mode="handleEditMode"
          @toggle-delete-mode="handleDeleteMode"
        />
      </aside>
      <div class="main-container">
        <slot></slot>
      </div>
      <aside class="right-side">
        <UserProfileMenu />
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, provide } from 'vue';
  import { useRoute } from 'vue-router';
  import LeftTab from './LeftTab.vue';
  import LeftSideMenu from './LeftSideMenu.vue';
  import UserProfileMenu from './UserProfileMenu.vue';
  
  const isMainPage = ref(false);
  const userType = ref('');
  const isEditMode = ref(false); // 수정 모드 상태
  const isDeleteMode = ref(false); // 삭제 모드 상태
  
  const route = useRoute();
  
  watch(() => route.path, (newPath) => {
    isMainPage.value = newPath === '/main';
  }, { immediate: true });
  
  // 사용자의 정보를 localStorage에서 가져옴
  onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      userType.value = user.role;
    }
  });
  
  // 수정 모드 핸들러
  function handleEditMode(newMode) {
    isEditMode.value = newMode;
    console.log('Edit mode:', newMode);
  }
  
  // 삭제 모드 핸들러
  function handleDeleteMode(newMode) {
    isDeleteMode.value = newMode;
    console.log('Delete mode:', newMode);
  }
  
  // fetchStores 함수 정의
  const fetchStores = async () => {
    try {
      const response = await fetch('http://localhost:8080/shop');
      const data = await response.json();
      console.log('Fetched stores:', data);
      return data;
    } catch (error) {
      console.error('매장 정보를 가져오는 중 오류 발생:', error);
    }
  };
  
  // 초대 수락 후 처리
  const handleInvitationAccepted = async () => {
    console.log('초대가 수락되었습니다.');
    await fetchStores();
  };
  
  provide('fetchStores', fetchStores);
  provide('handleInvitationAccepted', handleInvitationAccepted);
  </script>
  
  <style scoped>
  .side {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    background: #f3f7fa;
  }
  
  .side.main-page {
    height: calc(100vh - 121.6px);
  }
  
  .left-side {
    width: 16%;
    background-color: #f3f7fa;
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
  }
  
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    height: 100vh;
    padding: 0 20px;
    background-color: #f3f7fa;
  }
  
  .right-side {
    width: 20%;
    background-color: #f3f7fa;
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
  }
  </style>
  