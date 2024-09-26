<template>
    <div class="task-insert-page">
      <h1>업무 등록 화면</h1>
      <div class="task-form">
        <label for="task-title">업무 제목</label>
        <input v-model="title" id="task-title" type="text" placeholder="업무 제목을 입력하세요" />
  
        <label for="task-detail">세부 내용</label>
        <textarea v-model="detail" id="task-detail" rows="4" placeholder="업무의 세부 내용을 입력하세요"></textarea>
  
        <div class="fixed-toggle">
          <label for="fixed-checkbox">고정</label>
          <input v-model="isFixed" id="fixed-checkbox" type="checkbox" />
        </div>
  
        <button @click="submitTask" class="submit-button">등록</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const title = ref('');
  const detail = ref('');
  const isFixed = ref(false);
  const router = useRouter();
  
  const submitTask = () => {
    const newTask = {
      id: Date.now(),  // 임의로 고유 ID 생성
      number: Math.floor(Math.random() * 100),  // 업무 번호도 임의로 생성
      content: `${title.value}. ${detail.value}`,
      isFixed: isFixed.value,
    };
  
    console.log("등록된 task:", newTask); // 전달할 데이터를 콘솔에 출력하여 확인
  
    // 새로운 업무 데이터를 JSON 문자열로 변환하여 query로 전달
    router.push({
      name: 'TaskMainPage',
      query: { newTask: JSON.stringify(newTask) }
    }).then(() => {
      // 쿼리 파라미터를 제거하여 새로고침 시 재요청이 발생하지 않도록 설정
      router.replace({ name: 'TaskMainPage', query: {} });
  
      // 입력 필드를 초기화
      title.value = '';
      detail.value = '';
      isFixed.value = false;
    });
  };
  </script>
  
  <style scoped>
  .task-insert-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .task-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  label {
    font-size: 14px;
    font-weight: bold;
  }
  
  input[type="text"],
  textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .fixed-toggle {
    display: flex;
    align-items: center;
  }
  
  #fixed-checkbox {
    margin-left: 10px;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>
  