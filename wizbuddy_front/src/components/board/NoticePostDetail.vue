<template>
  <div v-if="post" class="post-container">
    <div class="post-inner-container">
    <div class="post-header">
        <router-link to="/noticeboard" class="back-button">목록으로</router-link>
        <div class="arrow-buttons">
          <router-link class="arrow-left" v-if="previousPostId" :to="`/noticeboard/${previousPostId}`">
            <img class="arrow" src="@/assets/icons/left-arrow.svg">
            <div class="arrow-text-left">이전 글</div>
          </router-link>
          <router-link class="arrow-right" v-if="nextPostId" :to="`/noticeboard/${nextPostId}`">
            <div class="arrow-text-right">다음 글</div>
            <img class="arrow" src="@/assets/icons/right-arrow.svg">
          </router-link>
        </div>
      </div>
      <div class="post-detail">
        <div class="post-title">
          <h1>{{ post.title }}</h1>
          <span class="post-date">{{ post.registerdate }}</span>
        </div>
        
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>

        <div class="post-actions">
          <div class="like-counter" @click="incrementLike">
            <span>{{ likeClicked ? '❤️' : '🤍' }} {{ likes }}</span> <!-- You can make this dynamic -->
          </div>
          <div class="file-actions">
            <input type="button" value=".pdf" class="file-input" />
            <input type="button" value="Other Action" class="file-input" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="else-text">
    <p>게시글을 불러오는중...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

// Mock data for posts (you might fetch this from an API instead)
const posts = [
  { id: 1, title: '제목1', writer: '사장1', registerdate: '2024.09.20', content: '내용1' },
  { id: 2, title: '제목2', writer: '사장2', registerdate: '2024.09.21', content: '내용2' },
  { id: 3, title: '제목3', writer: '사장3', registerdate: '2024.09.22', content: '내용3' },
  { id: 4, title: '제목4', writer: '사장4', registerdate: '2024.09.23', content: '내용4' },
  { id: 5, title: '제목5', writer: '사장5', registerdate: '2024.09.24', content: '내용5' },
];

// Use Vue Router's useRoute to get the ID parameter from the route
const route = useRoute();
const post = ref(null);
const likes = ref(0);

const likeClicked = ref(false);

// 현재 게시글 ID
const postId = computed(() => parseInt(route.params.id));

// 게시글 데이터 로드 함수
const loadPost = () => {
  post.value = posts.find(p => p.id === postId.value);
};

// 컴포넌트가 처음 로드될 때 게시글 데이터 로드
onMounted(() => {
  loadPost();
});

// 경로 변경 시(postId 변경 시) 게시글 데이터 다시 로드
watch(postId, (newId) => {
  loadPost();
});

// 이전 글 ID (현재 ID가 1보다 크면)
const previousPostId = computed(() => {
  return postId.value > 1 ? postId.value - 1 : null;
});

// 다음 글 ID (마지막 글보다 작은 경우)
const nextPostId = computed(() => {
  return postId.value < posts.length ? postId.value + 1 : null;
});

// 좋아요 증가 함수
const incrementLike = () => {
  if (!likeClicked.value) {
    likes.value += 1;
    likeClicked.value = true; // 한 번만 클릭 가능
  }
};

</script>

<style scoped>
.post-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-inner-container {
  margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center the inner-container horizontally */
    align-items: center;     /* Center the inner-container vertically */
    height: 70vh;           /* Full viewport height */
    width: 90%;             /* Full width */
    background-color: #ffffff;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
    box-sizing: border-box;
    padding: 5px;           /* Add padding to prevent inner content from touching the edges */
    position: relative;
    border-radius: 10px;
}

.post-detail {
  padding: 20px;
  min-width: 700px;
  background-color: #f5f5f5; /* Light background for the detail section */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 90%;
  width: 90%;
  margin: 10px 20px 20px 20px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title h1 {
  margin: 0;
  font-size: 24px;
}

.post-title .post-date {
  color: #999;
  font-size: 14px;
}

.post-content {
  background-color: #e9e9e9; /* Light grey background for the content */
  border-radius: 8px;
  padding: 20px;
  min-height: 200px; /* Adjust the height as per the content */
  position: relative;
  flex-grow: 1;
}

.post-content p {
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-counter {
  font-size: 18px;
  color: #333;
}

.file-actions {
  display: flex;
  gap: 10px;
}

.file-input {
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #ddd;
  border: none;
}

.file-input:hover {
  background-color: #ccc;
}

.back-button {
  padding: 10px 20px;
  background-color: #3A4E8B;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}

.back-button:hover {
  background-color: #2a3e6b;
}

/* Arrow button styles */
.arrow-buttons {
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center; /* 세로 정렬 */
}

/* 
.else-text {
  display: flex;
  justify-content: center;
  margin-top: auto;
} */

.else-text {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center;
  margin-top: 0;
  flex-grow: 1;
}

.post-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 40px;
}

.arrow {
  width: 20px;
  height: 20px;
}

.arrow-left, .arrow-right {
  display: flex; /* 수평으로 나열 */
  align-items: center; /* 아이콘과 텍스트를 같은 높이로 맞춤 */
  gap: 10px; /* 아이콘과 텍스트 사이의 간격 */
  padding: 7px 17px;
  color: #000000;
  border-radius: 6px;
  text-decoration: none;
  background-color: #ddd;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0.1, 0, 0.1);
}

.arrow-left:hover, .arrow-right:hover {
  background-color: #ccc
}

.arrow-left {
  margin-right: 10px;
}

.arrow-text-left, .arrow-text-right {
  text-decoration: none;
}

.like-counter {
  font-size: 18px;
  color: #333;
  cursor: pointer; /* 클릭 가능하게 커서 변경 */
}

</style>
