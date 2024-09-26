
<!-- 로그인 페이지 css설정 해야함 배경색  -->

<template>
    <div class="login-page">
      <div class="left-section">
        <img src="@/assets/icons/큰 아이콘 부분.png" alt="Wizzbuddy_character" class="character-image" />
      </div>
      <div class="right-section">
        <div class="login-form">
          <h2>로그인</h2>
          <form @submit.prevent="onSubmit">
            <div class="input-group">
              <label for="username">아이디</label>
              <input type="text" id="username" v-model="username" placeholder="아이디 입력" />
            </div>
            <div class="input-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" />
            </div>
            <button type="submit" class="login-btn">
              <img src="@/assets/icons/로그인.svg" alt="로그인 버튼">
            </button>
            <button @click="kakaoLogin" class="kakao-btn">
              <img src="@/assets/icons/카카오_로그인.svg" alt="카카오 로그인 버튼">
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  const onSubmit = () => {
    console.log('로그인 시도:', username.value, password.value);
  };
  
  const kakaoLogin = () => {
    console.log('카카오 로그인 시도');
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    height: 100vh;
    background-color: #F3F7FA;
  }
  
  .left-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F7FA;
  }
  
  .character-image {
    width: 80%;
    max-width: 500px;
  }
  
  .right-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F7FA;
  }
  
  /* 로그인 폼 간격 조절 */
  .login-form {
    width: 80%;
    max-width: 400px;
    text-align: center;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .login-btn {
  width: 80%;
  padding: 0;
  background-color: transparent; /* 버튼 배경 투명 */
  border: none; /* 테두리 제거 */
  cursor: pointer;
  margin-bottom: 10px;
}
  
  .login-btn img {
    width: 100%;
    height: auto;
    object-fit: contain; /* 이미지가 버튼 안에서 넘치지 않도록 조정 */
  }
  
  .kakao-btn {
  width: 80%;
  padding: 0;
  background-color: transparent; /* 버튼 배경 투명 */
  border: none; /* 테두리 제거 */
  cursor: pointer;
  margin-bottom: 20px;
}

  .kakao-btn img {
    width: 100%;
    height: 0 auto;
    object-fit: contain; /* 이미지가 버튼 안에서 넘치지 않도록 조정 */
  }
  </style>
  