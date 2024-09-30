<template>
  <div class="board-container">
    <div class="board-header">
      <div class="board-header-number">번호</div>
      <div class="board-header-title">제목</div>
      <div class="board-header-writer">작성자</div>
      <div class="board-header-registerdate">작성날짜</div>
    </div>
    
    <!-- 현재 페이지에 해당하는 게시글만 렌더링 -->
    <BoardItem v-for="board in paginatedBoards" :key="board.id" :board="board" :comments="getCommentsForBoard (board.id)"  />

    <!-- 페이징 버튼 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import BoardItem from './BoardItem.vue';
import axios from 'axios';

// 게시글 및 댓글 데이터
const boards = ref([]);
const comments = ref([]);

// 페이징 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(5); // 한 페이지에 보여줄 게시글 수

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(boards.value.length / itemsPerPage.value);
});

// 이전 페이지로 이동
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 다음 페이지로 이동
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};


// 현재 페이지에 해당하는 게시글 반환
const paginatedBoards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return boards.value.slice().reverse().slice(start, end); // 최신 게시글이 위로 오도록 reverse() 추가
});

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


import { watchEffect } from 'vue';

const getCommentsForBoard = (boardId) => {
  console.log("게시글 ID 타입:", typeof boardId);
  console.log("댓글 postId 타입:", comments.value.map(comment => typeof comment.postId));

  const filteredComments = comments.value.filter(comment => Number(comment.postId) === Number(boardId));
  console.log("게시글 ID:", boardId, "에 대한 댓글:", filteredComments);
  return filteredComments;
};
// comments가 변경되면 필터링 로직을 실행
watchEffect(() => {
  if (comments.value.length > 0) {
    console.log("댓글 데이터가 로드되었습니다:", comments.value);
    // 모든 게시글에 대해 댓글 필터링 (테스트 목적으로)
    boards.value.forEach(board => {
      getCommentsForBoard(board.id);
    });
  }
});

const filteredCommentsForBoard = computed(() => {
  return (boardId) => {
    return comments.value.filter(comment => comment.postId === boardId);
  };
});

const loadComments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/comments');
    comments.value = response.data;
    console.log(comments)
  } catch (error) {
    console.error('댓글 데이터를 불러오지 못했습니다.', error);
  }
};

// 컴포넌트가 마운트될 때 게시글과 댓글 데이터를 로드
onMounted(() => {
  loadBoards();
  loadComments();
});


const loadBoards = async () => {
  let boardUrl = '';

  if(window.location.pathname === '/noticeboard') {
    boardUrl = 'http://localhost:8080/noticeboard';
  } else if (window.location.pathname === '/manualboard') {
    boardUrl = 'http://localhost:8080/manualboard';
  } else {
    boardUrl = 'http://localhost:8080/subsboard';
  }

  try {
    const boardResponse = await axios.get(boardUrl);
    boards.value = boardResponse.data;
  } catch (error) {
    console.error('데이터를 불러오지 못했습니다: ', error);
  }
};

// 컴포넌트가 마운트될 때 게시글과 댓글 데이터를 로드
onMounted(() => {
  loadBoards();
  loadComments();
});
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
  z-index: 0;
 
  width: 95%;
  overflow: hidden;
}

.pagination {
  margin-left: 450px;
  margin-bottom: 20px;
  z-index: 1;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: fixed; /* 하단 고정 */
  bottom: 0; /* 화면 하단에 위치 */
}

button {
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border: none;
}

button:disabled {
  cursor: not-allowed;
 
}
</style>
