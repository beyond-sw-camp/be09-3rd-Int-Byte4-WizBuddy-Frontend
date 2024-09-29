<template>
  <div class="board-container">
    <div class="board-header">
      <div class="board-header-number">번호</div>
      <div class="board-header-title">제목</div>
      <div class="board-header-writer">작성자</div>
      <div class="board-header-registerdate">작성날짜</div>
    </div>
    <BoardItem v-for="board in boards" :board="board" :key="board.id" />
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

  // JSON 데이터 가져오는 함수
  // const loadBoardsFromJSON = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/manualboard');
  //     const data = await response.json();
  //     console.log(data);
  //     boards.value = data.manualboard;
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };

  // 컴포넌트가 처음 로드될 때 게시글 데이터 로드
  // onMounted(() => {
    // loadBoardsFromJSON(); // JSON 데이터 불러오는 함수 호출
  // });

  // watch(posts, (newPosts) => {
  //   if (newPosts.length) {
  //   console.log('Posts loaded:', newPosts);
  //   }
  // });
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