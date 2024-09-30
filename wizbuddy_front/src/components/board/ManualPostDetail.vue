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
import axios from 'axios';
import DeleteModal from '@/components/DeleteModal.vue'

const route = useRoute(); 
const router = useRouter();
const board = ref(null);
const likes = ref(0);
const boards = ref([]);
const postId = computed(() => parseInt(route.params.id));
const likeClicked = ref(false);
const isDeleteModalOpen = ref(false);

const loadPost = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/manualboard`);
    boards.value = response.data;

    const currentBoard = boards.value.find(board => parseInt(board.id) === postId.value);
    if (currentBoard) {
      board.value = currentBoard;
    } else {
      console.error('게시글을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('게시글 데이터를 불러오는 중 오류 발생: ', error);
  }
};

onMounted(() => {
  loadPost();
});

watch(postId, () => {
  loadPost();
});

watch(boards, (newBoards) => {
  if (newBoards && newBoards.length > 0) {
    const currentPost = newBoards.find((board) => parseInt(board.id) === postId.value);
    if (currentPost) {
      board.value = currentPost;
    } else {
      console.error('게시글을 찾을 수 없습니다.');
    }
  }
});

// 이전 글 ID 계산 (현재 postId가 1보다 크면)
const previousPostId = computed(() => {
  return postId.value > 1 ? postId.value - 1 : null;
});

// 다음 글 ID 계산 (boards 배열의 마지막 ID와 비교)
const nextPostId = computed(() => {
  const lastPostId = boards.value.length;
  console.log(lastPostId);
  return postId.value < lastPostId ? postId.value + 1 : null;
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


// 삭제 확인 처리 함수 (여기서 DeleteModal의 삭제 확인을 처리)
const handleDeleteConfirmation = async () => {
  try {
    await axios.delete(`http://localhost:8080/manualboard/${route.params.id}`);
    router.push('/manualboard');
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error);
  }
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