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
        <!-- 클릭하면 그에 해당하는 메뉴로 이동? 근데 알바생은 여러개 매장에서 일할수있다고했는데 매장 선택 전에 이런 버튼이 있는게 맞나 -->
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
  