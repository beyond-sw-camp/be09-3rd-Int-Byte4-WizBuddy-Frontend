<template>
    <div class="profile-container">
      <div class="profile-info">
        <!-- 로그인한 유저의 이미지 - 클릭하면 마이페이지로 가야함 -->
        <img class="profile-image" src="@/assets/icons/default-profile-img.svg" alt="Profile Image" />
        <!-- 로그인한 유저의 이름과 id(email)로 설정되어야 함 -->
        <p class="profile-name">백경석</p>
        <p class="profile-email">babo22@gmail.com</p>
      </div>
      <div class="profile-menu">
        <!--/main에서 매장 고르기 전에는 버튼을 눌러도 어떤 매장의 기능인지 알 수 없기 때문에 매장을 먼저 선택해달라는 알림창이 뜨도록 해야함 -->
        <button class="profile-button"><img src="@/assets/icons/right-profile-notice-button.svg" alt="notice-button"></button>
        <button class="profile-button"><img src="@/assets/icons/right-profile-calendars-button.svg" alt="calendars-button"></button>
        <button class="profile-button"><img src="@/assets/icons/right-profile-manual-button.svg" alt="manual-button"></button>
        <button class="profile-button"><img src="@/assets/icons/right-profile-todos-button.svg" alt="todos-button"></button>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f3f7fa;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
  }
  
  .profile-info {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .profile-name {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .profile-email {
    font-size: 14px;
    color: #888;
  }
  
  .profile-menu {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .profile-button {
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    border:none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .profile-button:hover {
    background-color: #ddd; 
    }
  </style>
  