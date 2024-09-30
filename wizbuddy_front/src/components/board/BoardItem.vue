<template>
  <div class="board-info">
    <div class="board-id">{{ board.id }}</div>
    <div class="board-title" @click="navigateToDetail">
      {{ board.title }} 
      <!-- boardType이 대타게시판일 때만 댓글 카운트 표시 -->
      <CommentCount v-if="isSubstituteBoard" :count="commentCount" />
    </div>
    <div class="board-writer">{{ board.writer }}</div>
    <div class="board-registerdate">{{ board.registerdate }}</div>
  </div>
  
</template>

<script setup>
import { computed } from 'vue';
import CommentCount from './CommentCount.vue'; // 댓글 카운트 컴포넌트 가져오기
import { useRouter, useRoute } from 'vue-router';


const props = defineProps({
  board: {
    type: Object,
    required: true
  },
  comments: {
    type: Array,
    default: () => []
  }
});

const router = useRouter();


const navigateToDetail = () => {
  if (route.path.includes('/manualboard')) {
    router.push(`/manualboard/${props.board.id}`);
  } else if (route.path.includes('/noticeboard')) {
    router.push(`/noticeboard/${props.board.id}`);
  } else if (route.path.includes('/subsboard')) { // '/subsboard' 경로 추가
    router.push(`/subsboard/${props.board.id}`);
  }
};

// 댓글 수 계산
const commentCount = computed(() => {
  return props.comments.length;
});


const route = useRoute();

// 현재 페이지가 대타 게시판인지 확인
const isSubstituteBoard = computed(() => {
  return route.path.includes('/subsboard'); // 대타게시판 경로일 때만 true
});
</script>

<style scoped>
.board-info {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr; /* Set column widths for id, title, writer, and date */
  padding: 12px 16px; /* Space between items */
  border-bottom: 1px solid #ddd; /* Border between rows */
  text-align: center; /* Center align text */
}

.board-info:hover {
  background-color: #f7f7f7; /* Light background color on hover */
}

.board-id, .board-title, .board-writer, .board-registerdate {
  padding: 8px;
}

.board-title {
  text-align: left; /* Left-align title */
  font-weight: 500;
}

.board-registerdate {
  font-size: 12px;
  color: #777; /* Lighter color for date */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
