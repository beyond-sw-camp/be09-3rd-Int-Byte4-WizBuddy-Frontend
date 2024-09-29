<template>
       <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close']);
  
  function closeModal() {
    emit('close');
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  </style>