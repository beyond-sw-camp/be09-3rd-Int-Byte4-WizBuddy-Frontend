<template>
    <header class="header">
      <div class="logo">
        <img src="@/assets/icons/wizbuddy_logo.svg" alt="Wiz Buddy Logo" class="logo-img" />
      </div>
      <div class="profile-section" v-if="!(isLoginPage|isSignupPage)">
        <div class="welcome-message">
          <p>알바생 {{ username }}님, 환영합니다.</p>
        </div>
        <img src="@/assets/icons/Profile.svg" alt="Profile" class="profile-img" />
      </div>
    </header>
  </template>
  
  <script setup>
    import {useRoute} from 'vue-router';
    import {ref, watch} from 'vue';

    const route = useRoute();
    const isLoginPage = ref(false);
    const isSignupPage = ref(false);

    watch(() => route.path, (newPath) => {
      isLoginPage.value = newPath === '/login';
      isSignupPage.value = newPath === '/signup';
    }
    , 
    {
      immediate: true 
    });
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3A4E8B;
    padding: 10px 20px;
    color: white;
    height: 60px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  
  .logo {
    display: flex;
    align-items: center;
  }
  
  .logo-img {
    height: 40px;
  }
  
  .profile-section {
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 오른쪽 정렬 */
  }
  
  .welcome-message {
    margin-right: 10px; /* 프로필 이미지와 간격 설정 */
    font-size: 18px;
  }
  
  .profile-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;

  }
  </style>
  