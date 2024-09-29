<template>
  <div class="board-container">
    <div class="board-header">
      <div class="board-header-number">번호</div>
      <div class="board-header-title">제목</div>
      <div class="board-header-writer">작성자</div>
      <div class="board-header-registerdate">작성날짜</div>
    </div>
    <BoardItem v-for="board in boards" :board="board" :key="board.id" :comments="getCommentsForBoard(board.id)"/>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import BoardItem from './BoardItem.vue';

  const boards = ref([]);

  onMounted (async () => {
    try {
      const response = await fetch('http://localhost:8080/manualboard');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } const data = await response.json();
      if (data.length > 0) {
        boards.value = data;
        console.log('서버로부터 받아온 boards: ', boards.value);
      }
    } catch (error) {
      console.error ('데이터를 가져오는 중 오류가 발생했습니다: ', error);
    }
  });

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