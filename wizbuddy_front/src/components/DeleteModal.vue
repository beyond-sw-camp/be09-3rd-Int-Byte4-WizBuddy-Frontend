<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <h3 class="modal-title">정말 삭제하시겠습니까?</h3>
    
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="closeModal">아니오</button>
          <button type="button" class="delete-btn" @click="confirmDelete">네</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  async function confirmDelete() {
    try {
      if (route.path.startsWith('/manualbaord')) {
        await axios.delete('http://localhost:8080/manualbaord/${route.params.id}');
        router.push('/manualboard');
      } else {
        console.log('현재 경로는 manualboard 삭제 경로가 아닙니다.');
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생 ', error);
    }
    
    isDeleted.value = true;
    emit('confirmDelete');
  }
  
  const props = defineProps({
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close', 'confirmDelete']);
  const isDeleted = ref(false);
  
  function closeModal() {
    emit('close');
  }
  
  // function confirmDelete() {
  //   isDeleted.value = true;
  //   emit('confirmDelete');
  
  //   setTimeout(() => {
  //     closeModal(); 
  //     isDeleted.value = false;
  //   }, 4000); 
  // }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background-color: #DCEDF9;
    padding: 30px;
    border-radius: 20px;
    width: 400px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .modal-title {
    font-size: 22px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .cancel-btn, .delete-btn, .confirm-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    width: 45%;
  }
  
  .cancel-btn {
    background-color: #f0f0f0;
    color: #000;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: #fff;
  }
  
  .confirm-btn {
    background-color: #4285F4;
    color: #fff;
    width: 100%;
  }
  
  .cancel-btn:hover {
    background-color: #ddd;
  }
  
  .delete-btn:hover {
    background-color: #d32f2f;
  }
  
  .confirm-btn:hover {
    background-color: #357ae8;
  }
  </style>
  