<template>
  <div class="signup-page">
    <div class="left-section">
      <img src="@/assets/icons/user/큰 아이콘 부분.png" alt="Wizzbuddy_character" class="character-image"/>
    </div>
    <div class="right-section">
      <div class="signup-form">
        <button type="button" class="employer-btn" :class="{'selected-btn': role === 'employer'}" @click="setRole('employer')">사장</button>
        <button type="button" class="employee-btn" :class="{'selected-btn': role === 'employee'}" @click="setRole('employee')">직원</button>
        
        <form @submit.prevent="onSubmit">
          <div class="signup-button">
            <div class="input-group">
              <label for="userid">아이디(이메일)</label>
              <div class="id-group">
                <input type="text" id="userid" v-model="email" placeholder="아이디 입력" @keyup.enter="isExists(email)" />
                <button type="button" class="auth-btn" @click="isExists(email)">확인</button>
              </div>
              <p v-show="idExists" class="error-message">이미 존재하는 아이디입니다.</p>
              <p v-show="idAvailable" class="success-message">사용 가능한 아이디입니다.</p>
            </div>

            <div class="input-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" @keyup.enter="focusNext('username')" />
            </div>
            <div class="input-group">
              <label for="username">이름</label>
              <input type="text" id="username" v-model="name" placeholder="이름 입력" @keyup.enter="focusNext('phonenumber')" />
            </div>
            <div class="input-group">
              <label for="phonenumber">전화번호</label>
              <input type="text" id="phonenumber" v-model="phone" placeholder="전화번호 입력" @keyup.enter="focusNext('health')" />
            </div>
            <div class="input-group">
              <label for="health">보건증</label>
              <input type="date" id="health" v-model="health" placeholder="날짜 입력" />
            </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const id = ref(0);
const email = ref('');
const password = ref('');
const name = ref('');
const phone = ref('');
const health = ref('');
const role = ref('');
const idExists = ref(false);
const idAvailable = ref(false);

const router = useRouter();

const setRole = (selectedRole) => {
  role.value = selectedRole;
};

const isExists = async (email) => {
  try {
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();

    if (data.length > 0) {
      idExists.value = true;
      idAvailable.value = false;
    } else {
      idExists.value = false;
      idAvailable.value = true;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const focusNext = (nextFieldId) => {
  const nextField = document.getElementById(nextFieldId);
  if (nextField) {
    nextField.focus();
  }
};

const onSubmit = async () => {
  if (!email.value || !password.value || !name.value || !phone.value || !health.value || !role.value) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/users');
    const users = await response.json();

    // 최대 ID 값 찾기
    const maxId = users.length > 0 
      ? Math.max(...users.map(user => parseInt(user.id, 10))) 
      : 0;

    // 새 유저 생성
    const newUser = {
      id: (maxId + 1).toString(), // ID는 문자열로 설정
      email: email.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      health: health.value,
      role: role.value,
      invitations: [],  // 추가: 초대 목록
      employedAt: [] 
    };

    const createResponse = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (createResponse.ok) {
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } else {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('서버 오류가 발생했습니다.');
  }
};
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f7fa;
  gap: 200px;
  height: calc(100vh - 80px);
}

.left-section {
  flex: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f7fa;
}

.character-image {
  width: 100%;
  max-width: 500px;
  object-fit: contain;
}

.signup-form {
  width: 450px;
  height: 550px;
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
  background-color: #f3f7fa;
}

.employer-btn {
  width: 40%;
  padding: 8px;
  background-color: #e3e3e3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.employee-btn {
  width: 40%;
  padding: 8px;
  background-color: #e3e3e3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.selected-btn {
  background-color: #003986;
  color: white;
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
  position: relative;
  min-height: 50px;
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
  box-sizing: border-box;
  border: var(--sds-size-stroke-border) solid #d9d9d9;
  background: #f3f7fa;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.auth-btn {
  width: 50px;
  height: 30px;
  background-color: #fee500;
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

.error-message,
.success-message {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: red;
}

.success-message {
  color: green;
}
</style>
