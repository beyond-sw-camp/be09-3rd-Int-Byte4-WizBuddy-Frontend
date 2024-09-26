<template>
    <header class="header">
      <div class="top-bar">
      <div class="left-section">
        <img src="@/assets/icons/wizbuddy_logo.svg" alt="Wiz Buddy Logo" class="logo-img" />
      </div>
      <div class="right-section">
        <p>알바생 {{ username }}님, 환영합니다.</p>
        <img src="@/assets/icons/Profile.svg" alt="Profile" class="profile-img" />
      </div>
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
    flex-direction: column;
    background-color: #3A4E8B;
    color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .left-section {
    display: flex;
    align-items: center;
  }
  
  .logo-img {
    width: 150px;
    height: auto;
  }

  .right-section {
    display: flex;
    align-items: center;
  }

  .right-section p {
    margin-right: 15px;
    font-size: 16px;
  }

  .profile-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;

  }
  </style>
  