<template>
  <div class="container">
    <div class="form-container">
      <!-- 글쓰기 폼 -->
      <div class="writing-form">
        <div class="form-field title-container">
          <label class="form-label">제목</label>
          <input v-model="newPost.title" type="text" placeholder="제목을 입력하세요" class="title-input" />
        </div>

        <div class="form-field content-container">
          <label class="form-label">내용</label>
          <textarea v-model="newPost.content" placeholder="내용을 입력하세요" class="content-textarea"></textarea>
        </div>

        <!-- 이름 및 날짜/타임 선택을 가로 정렬 -->
        <div class="name-time-row">
          <div class="form-field name-select-container">
            <select v-model="selectedName" class="name-select">
              <option disabled value="">이름 선택</option>
              <option v-for="name in names" :key="name">{{ name }}</option>
            </select>
          </div>

          <div class="form-field time-select-container">
            <select v-model="selectedDateAndTime" class="name-select">
              <option disabled value="">근무 날짜 및 타임 선택</option>
              <option v-for="dateAndTime in dateAndTimes" :key="dateAndTime">{{ dateAndTime }}</option>
            </select>
          </div>
        </div>

        <!-- 등록 버튼 -->
        <div class="form-controls">
          <button @click="submitPost" class="submit-button">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; 
import { useRouter } from 'vue-router';

const router = useRouter();

const newPost = ref({
  title: '',
  writer: '',
  content: '',
  registerdate: '',
});

const post = ref(null); // post 객체 추가

// 날짜 포맷 함수
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 게시글 등록 함수
const submitPost = async () => {
  if (!newPost.value.title || !newPost.value.content || !selectedName.value || !selectedDateAndTime.value) {
    alert('제목, 내용, 이름, 날짜 및 타임을 모두 선택해주세요.');
    return;
  }

  // 현재 날짜를 포맷하여 등록 날짜 설정
  newPost.value.registerdate = formatDate(new Date());
  newPost.value.writer = selectedName.value; // 선택된 이름을 작성자로 설정

  try {
    const response = await axios.post('http://localhost:8080/subsboard', newPost.value);
    post.value = response.data;
    alert('게시글이 성공적으로 등록되었습니다.');
    router.push('/subsboard');
  } catch (error) {
    console.error('게시글 등록 중 오류 발생:', error);
  }
};

// 선택 옵션
const selectedName = ref('');
const selectedDateAndTime = ref('');

const names = ['이나현', '조제훈', '김민수'];
const dateAndTimes = ['09/03 2T', '09/04 2T', '09/05 1T'];
</script>

  <style scoped>
  .container {
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
padding: 20px;
background-color: #f8f8f8;
}

  
  .form-container {
    width: 95%;
background-color: #ffffff;
padding: 20px;
border-radius: 10px;
border: 1px solid #fffcfc;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-header h1 {
  font-size: 24px;
  color: #3A4E8B;
}

.writing-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-field {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.title-container, .content-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.form-label {
 margin-left: 10px;
  width: 50px;
  height: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.title-input, .content-textarea{
  flex-grow: 1;
  padding:10px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #F3F7FA;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  outline: none;
}

.name-select {
  flex-grow: 1;
  width: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #F6F6F6;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  outline: none;
}

.content-textarea {
  height: 250px;
  resize: none;
}

.name-time-row {
  display: flex;
  gap: 10px; /* 간격을 좁혀서 이름과 타임 드롭다운 간격 조정 */
  justify-content: right;
  align-items: center;
}

.name-select, .time-select-container select {
  width: 100%;
}

.form-controls {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  padding: 5px 15px; /* 버튼 크기 조정 */
  background-color: #3A4E8B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px; /* 버튼과 드롭다운 간격 */
}

.submit-button:hover {
  background-color: #2a3e6b;
  color: white;
}
  </style>
  