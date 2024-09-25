<template>
    <header class="header">
      <div class="logo">
        <img src="@/assets/icons/wizbuddy_logo.svg" alt="Wiz Buddy Logo" class="logo-img" />
      </div>
      <div class="welcome-message">
        <p>알바생 {{ username }}님, 환영합니다.</p>
      </div>
      <div class="profile-icon">
        <i class="fas fa-user-circle"></i>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      username: {
        type: String,
        default: '사용자'
      }
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3A4E8B;
    padding: 10px 20px;
    color: white;
  }
  
  .logo-img {
    height: 40px; /* 로고 이미지 높이 설정 */
  }
  
  .welcome-message p {
    margin: 0;
  }
  
  .profile-icon {
    font-size: 24px;
  }
  </style>
  