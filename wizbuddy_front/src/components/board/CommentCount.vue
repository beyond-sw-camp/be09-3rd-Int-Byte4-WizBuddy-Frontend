<template>
    <span v-if="count > 0" class="comment-count">[{{ count }}]</span>
  </template>
  
  <script setup>
  const props = defineProps({
    count: {
      type: Number,
      default: 0
    }
  });
  </script>
  
  <style scoped>
  .comment-count {
    color: red;
    margin-left: 8px; /* 제목과 댓글 수 사이의 간격 */
  }
  </style>
  