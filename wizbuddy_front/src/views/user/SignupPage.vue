<template>
  <div class="signup-page">
    <div class="left-section">
      <img src="@/assets/icons/user/큰 아이콘 부분.png" alt="Wizzbuddy_character" class="character-image"/>
    </div>
    <div class="right-section">
      <div class="signup-form">
        <button type="submit" class="employer-btn">사장</button> <!-- 사장 버튼 -->
        <button type="submit" class="employee-btn">직원</button> <!-- 직원 버튼 -->
          <form @submit.prevent="onSubmit">
            <div class="input-group">
              <label for="userid">아이디(이메일)</label>
              <div class="id-group">
                <input type="text" id="userid" v-model="userid" placeholder="아이디 입력" />
                <button type="submit" class="auth-btn">인증</button> <!-- 인증 버튼 -->
              </div>
            </div>
            <div class="input-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" />
            </div>
            <div class="input-group">
              <label for="username">이름</label>
              <input type="text" id="username" v-model="username" placeholder="이름 입력" />
            </div>
            <div class="input-group">
              <label for="phonenumber">전화번호</label>
              <input type="text" id="phonenumber" v-model="phonenumber" placeholder="전화번호 입력" />
            </div>
            <div class="input-group">
              <label for="health">보건증</label>
              <input type="date" id="health" v-model="health" placeholder="날짜 입력" />
            </div>
            <button type="submit" class="regist-btn">
              등록
            </button>
          </form>
      </div>      
    </div>
  </div>
</template>
  
<script setup>
    
  const onSubmit = async () => {
  // 회원가입
  };
  
  </script>
  
<style scoped>

  .signup-page {
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

  .signup-form {
    width: 100%;  
    max-width: 400px;
    text-align: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .right-section {
    flex: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F7FA;
  }
  

  .employer-btn {
    width: 40%;
    padding: 8px;
    background-color: #E3E3E3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right:20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .employee-btn {
    width: 40%;
    padding: 8px;
    background-color: #003986; /* 버튼 배경 투명 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 10px;
    color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    
  }
  
  .signup-form {
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
    font-size: 15px;  
  }
  
  .id-group {
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    /* border: 1px solid #ccc; */
    box-sizing: border-box;
    border: var(--sds-size-stroke-border) solid #D9D9D9;
    background: #F3F7FA;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .auth-btn {
    width: 50px;
    height: 30px;
    background-color: #FEE500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: black;
    margin-left: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .regist-btn {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: #003986; 
    cursor: pointer;
    color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  }
</style>