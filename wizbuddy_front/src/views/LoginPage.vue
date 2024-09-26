
<template>
    <div class="login-page">
      <div class="left-section">
        <img src="@/assets/icons/user/큰 아이콘 부분.png" alt="Wizzbuddy_character" class="character-image" />
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
              <img src="@/assets/icons/user/로그인.svg" alt="로그인 버튼">
            </button>
            <button type="button" @click="kakaoLogin" class="kakao-btn">
              <img src="@/assets/icons/user/카카오_로그인.svg" alt="카카오 로그인 버튼">
            </button>
              <div class="login-bottom-btn">
                <button type="submit" class="find-id-btn">아이디 찾기</button>
                <p> | </p>
                <button class="find-password-btn">비밀번호 찾기</button> 
                <p> | </p>
                <button @click="goToSignup" class="signup-btn">회원가입</button> <!-- 회원가입 -> 회원 가입 누르면 /signup으로 -->
              </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  const onSubmit = () => {
    console.log('로그인 시도');
  };
  
  const kakaoLogin = () => {
    console.log('카카오 로그인 시도');
  };

  const goToSignup = () => {
    router.push('/signup');
  };
</script>

  
<style scoped>

  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F7FA;
    gap:200px;    
    height: calc(100vh - 80px);
  }
  
  .left-section {
    flex: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F7FA;
  }
  
  .character-image {
    width: 100%; 
    max-width: 500px;
    object-fit: contain; 
  }
  
  .right-section {
    flex: 0.3;
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
    box-sizing: border-box;
    border: var(--sds-size-stroke-border) solid #D9D9D9;
    background: #F3F7FA;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  
  .login-btn {
  width: 80%;
  padding: 0;
  background-color: transparent; /* 버튼 배경 투명 */
  border: none; /* 테두리 제거 */
  cursor: pointer;
  margin-top: 20px;
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

  .login-bottom-btn {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .find-id-btn,
  .find-password-btn,
  .signup-btn {
    background-color: white;
    border: none;
    color: #B7B7B8;
    cursor: pointer;
    text-decoration: none;
  }

  .login-bottom-btn p {
  color: #B7B7B8;
  margin: 0;
  display: flex;
  }

</style>
  