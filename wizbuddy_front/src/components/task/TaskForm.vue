<template>
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
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  const emit = defineEmits(['submitTask']);
  
  const title = ref('');  // 제목 입력 필드
  const detail = ref('');  // 세부 내용 입력 필드
  const isFixed = ref(false);  // 고정 여부 입력 필드
  
  // 부모 컴포넌트로 데이터 전달
  const submitTask = () => {
    const newTask = {
      id: Date.now(),  // 임의로 고유 ID 생성
      title: title.value,  // 업무 제목
      content: detail.value,  // 세부 내용
      isFixed: isFixed.value,  // 고정 여부
    };
    
    // 부모 컴포넌트에 새로 등록된 task를 전달
    emit('submitTask', newTask);
  
    // 입력 필드 초기화
    title.value = '';
    detail.value = '';
    isFixed.value = false;
  };
  </script>
  
  <style scoped>
  .task-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
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
  }
  </style>
  