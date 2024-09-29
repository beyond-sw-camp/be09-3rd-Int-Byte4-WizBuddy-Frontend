<template>
  <div v-if="board" class="post-container">
    <div class="post-inner-container">
    <div class="post-header">
        <router-link to="/manualboard" class="back-button">목록으로</router-link>
        <div class="arrow-buttons">
          <router-link class="arrow-left" v-if="previousPostId" :to="`/manualboard/${previousPostId}`">
            <img class="arrow" src="@/assets/icons/left-arrow.svg">
            <div class="arrow-text-left">이전 글</div>
          </router-link>
          <router-link class="arrow-right" v-if="nextPostId" :to="`/manualboard/${nextPostId}`">
            <div class="arrow-text-right">다음 글</div>
            <img class="arrow" src="@/assets/icons/right-arrow.svg">
          </router-link>
        </div>
      </div>
      <div class="post-detail">
        <div class="post-title">
          <h1>{{ board.title }}</h1>
          <span class="post-date">{{ board.registerdate }}</span>
        </div>
        
        <div class="post-content">
          <p>{{ board.content }}</p>
        </div>

        <div class="post-actions">
          <div class="like-counter" @click="incrementLike">
            <span>{{ likeClicked ? '❤️' : '🤍' }} {{ likes }}</span> <!-- You can make this dynamic -->
          </div>
          <div class="etc-actions">
            <button class="edit-button" @click="editPost">수정</button>
            <button class="delete-button" @click="toggleModal">삭제</button>

          </div>
        </div>
      </div>

      <DeleteModal
            v-if="isDeleteModalOpen"
            :isOpen="isDeleteModalOpen"
            @close="closeDeleteModal"
            @confirmDelete="handleDeleteConfirmation"
        />
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DeleteModal from '@/components/schedule/modal/DeleteModal.vue'

// Use Vue Router's useRoute to get the ID parameter from the route
const route = useRoute(); 
const router = useRouter();
const board = ref(null);
const likes = ref(0);

// 기존 posts 대신 JSON 데이터를 fetch로 불러옵니다.
const boards = ref([]); // posts를 빈 배열로 초기화합니다.

onMounted (async () => {
  try {
    const response = await fetch('http://localhost:8080/manualboard');
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    } const data = await response.json();
    if (data.length > 0) {
      boards.value = data;
      console.log('서버로부터 받아온 boards: ', boards.value);
      const currentPost = boards.value.find((board) => board.id === postId.value);
      if (currentPost) {
        board.value = currentPost;
      }
    }
  } catch (error) {
    console.error ('데이터를 가져오는 중 오류가 발생했습니다: ', error);
  }
});

// JSON 데이터가 로드된 후 게시글을 불러오도록 watch 추가
watch(boards, (newBoards) => {
  if (newBoards && newBoards.length > 0) {
    const currentPost = newBoards.find((board) => board.id === postId.value);
    if (currentPost) {
      board.value = currentPost;
    } else {
      console.error('게시글을 찾을 수 없습니다.');
    }
  }
});

const likeClicked = ref(false);
const isDeleteModalOpen = ref(false);

// 현재 게시글 ID
const postId = computed(() => parseInt(route.params.id));

// 이전 글 ID (현재 ID가 1보다 크면)
const previousPostId = computed(() => {
  return postId.value > 1 ? postId.value - 1 : null;
});

// 다음 글 ID (마지막 글보다 작은 경우)
const nextPostId = computed(() => {
  return postId.value < boards.length ? postId.value + 1 : null;
});

// 좋아요 증가 함수
const incrementLike = () => {
  if (!likeClicked.value) {
    likes.value += 1;
    likeClicked.value = true; // 한 번만 클릭 가능
  }
};

const closeDeleteModal = () => {
        isDeleteModalOpen.value = false;
    };

const editPost = () => {
  router.push({ path: `/manualboard/${postId.value}/edit` });
};

const toggleModal = () => {
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
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

.etc-actions {
  display: flex;
  gap: 10px;
}

.edit-button, .delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 2px rgba(0, 0.1, 0, 0.1);
}

.edit-button {
  background-color: #f0f0f0;
  color: #333;
}

.edit-button:hover {
  background-color: #e0e0e0;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>