<template>
  <div class="board-container">
    <div class="board-header">
      <div class="board-header-number">번호</div>
      <div class="board-header-title">제목</div>
      <div class="board-header-writer">작성자</div>
      <div class="board-header-registerdate">작성날짜</div>
    </div>
    <BoardItem v-for="board in boards.slice().reverse()" :key="board.id" :board="board" :boardType="boardType" :comments="getCommentsForBoard(board.id)"  />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BoardItem from './BoardItem.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
const boardType = ref(route.params.boardType);

const boards = ref([
  { id: 1, title: '제목1', writer: '사장1', registerdate: '2024.09.20' },
  { id: 2, title: '제목2', writer: '사장2', registerdate: '2024.09.21' },
  { id: 3, title: '제목3', writer: '사장3', registerdate: '2024.09.22' },
  { id: 4, title: '제목4', writer: '사장4', registerdate: '2024.09.23' },
  { id: 5, title: '제목5', writer: '사장5', registerdate: '2024.09.24' },
]);

const comments = ref([
  { boardId: 1, content: '댓글1' },
  { boardId: 2, content: '댓글2' },
  { boardId: 2, content: '댓글3' },
  { boardId: 3, content: '댓글4' },
  { boardId: 3, content: '댓글5' },
  { boardId: 5, content: '댓글6' },
]);

const getCommentsForBoard = (boardId) => {
  return comments.value.filter(comment => comment.boardId === boardId);
};
</script>

<style scoped>
.board-header {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr;
  padding: 12px 16px;
  background-color: #ffffff;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  text-align: center;
}

.board-container {
  width: 95%;
  overflow: hidden;
}
</style>