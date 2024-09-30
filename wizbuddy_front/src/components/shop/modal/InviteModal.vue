<template>
    <div class="invite-modal-overlay" @click.self="closeModal">
      <div class="invite-modal-content">
        <h2>직원 초대</h2>
        <input v-model="email" placeholder="초대할 직원의 이메일" />
        <button @click="sendInvite">초대 보내기</button>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['store']);
  const emit = defineEmits(['close', 'invite']);
  
  const email = ref('');
  
  function sendInvite() {
    emit('invite', email.value);
    email.value = '';
  }
  
  function closeModal() {
    emit('close');
  }
  </script>
  
  <style scoped>
  .invite-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .invite-modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    width: 100%;
  }
  
  h2 {
    margin-top: 0;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #45539D;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  button:last-child {
    background-color: #ccc;
  }
  </style>