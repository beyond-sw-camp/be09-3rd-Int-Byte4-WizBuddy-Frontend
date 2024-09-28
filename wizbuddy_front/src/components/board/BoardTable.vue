<template>
  <div class="board-container">
    <div class="board-header">
      <div class="board-header-number">번호</div>
      <div class="board-header-title">제목</div>
      <div class="board-header-writer">작성자</div>
      <div class="board-header-registerdate">작성날짜</div>
    </div>
    <BoardItem v-for="board in boards.slice().reverse()" :board="board" :key="board.id" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import BoardItem from './BoardItem.vue';

  const boards = ref([
    {id: 1, title: '제목1', writer: '사장1', registerdate: '2024.09.20'},
    {id: 2, title: '제목2', writer: '사장2', registerdate: '2024.09.21'},
    {id: 3, title: '제목3', writer: '사장3', registerdate: '2024.09.22'},
    {id: 4, title: '제목4', writer: '사장4', registerdate: '2024.09.23'},
    {id: 5, title: '제목5', writer: '사장5', registerdate: '2024.09.24'},
  ]);
</script>

<style scoped>
  .board-header {
    display: grid;
    grid-template-columns: 1fr 4fr 2fr 2fr; /* Match column widths to the items */
    padding: 12px 16px;
    background-color: #ffffff;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
    text-align: center;
  }
  .board-container {
    width: 95%;
    /* border-radius: 20px; */
    overflow: hidden;
  }
</style>