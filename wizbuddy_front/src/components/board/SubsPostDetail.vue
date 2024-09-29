<template>
  <div v-if="post" class="post-container">
    <div class="post-inner-container">
      <div class="post-header">
      <router-link to="/subsboard" class="back-button"><img class="arrow2" src="@/assets/icons/left-arrow.svg">목록으로</router-link>
      <div class="arrow-buttons">
        <router-link class="arrow-left" v-if="previousPostId" :to="`/subsboard/${previousPostId}`">
          <img class="arrow" src="@/assets/icons/left-arrow.svg">
          <div class="arrow-text-left">이전 글</div>
        </router-link>
        <router-link class="arrow-right" v-if="nextPostId" :to="`/subsboard/${nextPostId}`">
          <div class="arrow-text-right">다음 글</div>
          <img class="arrow" src="@/assets/icons/right-arrow.svg">
        </router-link>
      </div>
    </div>

      <div class="post-detail">
      <div class="post-header-content">
        <div class="post-title-section">
          <div class="post-title-box">
            <h1 class="post-title">{{ post.title }}</h1>
          </div>
          <div class="post-writer-date">
            <div class="post-writer">작성자: {{ post.writer }}</div>
            <div class="post-date">작성 날짜: {{ post.registerdate }}</div>
          </div>
        </div>
      </div>


        <!-- 게시글 내용 -->
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>

        
        <!-- 댓글 등록 영역 -->
        <div class="comment-input-section">
        <textarea v-model="newComment" placeholder="댓글을 입력하세요..." class="comment-input"></textarea>
        <button @click="addComment" class="comment-submit-button">등록</button>
      </div>


        <!-- 댓글 영역 -->
<div class="post-footer">
<div class="comments-section" :class="{ 'no-comments': comments.length === 0 }">
  <!-- 댓글이 없을 경우 -->
  <p v-if="comments.length === 0" class="no-comments-message">등록된 댓글이 없습니다</p>

  <!-- 댓글이 있을 경우 -->
  <div v-else v-for="comment in comments" :key="comment.id" class="comment">
    <div class="comment-avatar-wrapper">
      <img :src="comment.avatar" alt="User Avatar" class="comment-avatar" />
      <div class="comment-writer">{{ comment.writer }}</div>
    </div>
    <div class="comment-content">
      <div class="comment-header">
        <p>{{ comment.content }}</p>
        <button class="reply-button">채택</button>
      </div>       
    </div>
  </div>
</div>

<!-- 수정 및 삭제 버튼 -->
<div class="post-actions">
  <button class="edit-button">수정</button>
  <button class="delete-button">삭제</button>
</div>
</div>

        
      </div>
    </div>
  </div>

  <div v-else class="else-text">
    <p>게시글을 불러오는 중...</p>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'; // Axios 추가
import commentImg from '@/assets/icons/board/avater0.svg';

// 게시글 데이터 샘플
const posts = ref([]);

// 댓글 데이터 (빈 배열로 시작)
const comments = ref([]);
const newComment = ref(''); // 새 댓글 입력 값
const editMode = ref(false); // 수정 모드 여부
const editCommentId = ref(null); // 수정 중인 댓글 ID

// 라우터에서 현재 게시글 ID 가져오기
const route = useRoute();
const post = ref(null);
const postId = computed(() => parseInt(route.params.id));

const loadPost = async () => {
  try {
    console.log(postId.value); // postId 값 확인
    const response = await axios.get(`http://localhost:8080/posts?id=${postId.value}`);
    post.value = response.data[0]; 
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`게시글 ID ${postId.value}를 찾을 수 없습니다. (404 오류)`);
    } else {
      console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
    }
  }
};

// 이전 글 ID (현재 ID가 1보다 크면)
const previousPostId = computed(() => {
  return postId.value > 1 ? postId.value - 1 : null;
});

// 다음 글 ID (마지막 글보다 작은 경우)
const nextPostId = computed(() => {
  return postId.value < posts.length ? postId.value + 1 : null;
});

// 댓글 데이터 로드 함수
const loadComments = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/comments?postId=${postId.value}`);
    comments.value = response.data;
  } catch (error) {
    console.error('댓글을 불러오는 중 오류 발생:', error);
  }
};

// 댓글 추가 또는 수정 함수
const addComment = async () => {
  try {
    if (newComment.value.trim() === '') return;

    if (editMode.value) {
      // 수정 모드일 때
      await axios.patch(`http://localhost:8080/comments/${editCommentId.value}`, {
        content: newComment.value,
      });
      editMode.value = false;
      editCommentId.value = null;
    } else {
      // 새 댓글 추가
      await axios.post('http://localhost:8080/comments', {
        content: newComment.value,
        postId: post.value.id,
        writer: '사용자', // 실제 사용자 이름으로 대체
        avatar: commentImg, // 기본 아바타 이미지 설정
      });
    }

    newComment.value = ''; // 입력창 초기화
    loadComments(); // 댓글 목록 다시 로드
  } catch (error) {
    console.error('댓글 추가/수정 중 오류 발생:', error);
  }
};

// 댓글 수정 모드 진입 함수
const editComment = (comment) => {
  newComment.value = comment.content;
  editMode.value = true;
  editCommentId.value = comment.id;
};

// 댓글 삭제 함수
const deleteComment = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/comments/${id}`);
    loadComments(); // 댓글 목록 다시 로드
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
  }
};

// 컴포넌트가 마운트될 때 게시글 및 댓글 데이터 로드
onMounted(() => {
  loadPost();
  loadComments();
});

// 경로 변경 시(postId 변경 시) 게시글 및 댓글 데이터 다시 로드
watch(postId, () => {
  loadPost();
  loadComments();
});
</script>


<style scoped>
.post-container {
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
padding: 20px;
background-color: #f8f8f8;
}

.post-inner-container {
width: 95%;
background-color: #ffffff;
padding: 15px;
border-radius: 10px;
border: 1px solid #ddd;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.post-header {
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 0px;
height: 30px;
margin-bottom: 10px;
}


.back-button {
display: flex; 
align-items: center; 
gap: 10px; 
padding: 7px 0px;
color: #000000;
border-radius: 6px;
text-decoration: none;
border: none;
}

.arrow2 {
width: 20px;
height: 20px;
}



.arrow-buttons {
display: flex;
width: 200px;
justify-content: space-between;
align-items: center; 
}


.else-text {
display: flex;
justify-content: center; 
align-items: center;
margin-top: 0;
flex-grow: 1;
}


.arrow {
width: 20px;
height: 20px;
}

.arrow-left, .arrow-right {
display: flex; 
align-items: center; 
gap: 10px; 
padding: 7px 0px;
color: #000000;
border-radius: 6px;
text-decoration: none;
border: none;
}


.arrow-left {
margin-right: 10px;
}


.arrow-text-left, .arrow-text-right {
display: flex;
text-decoration: none;
}

.post-title-box {
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
background-color: #D9D9D9;
border-radius: 6px;
padding:10px;
}

.post-detail{
  background-color: #F3F7FA;
  padding: 10px;
}

.post-title {
color: #000;
font-family: Inter;
font-size: 17px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.post-writer-date {
margin-top: 10px;
display: flex;
justify-content: space-between;
}

.post-writer, .post-date {
font-size: 14px;
color: #000000;
margin-bottom: 10px;
}

.post-content {
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
width: auto;
height: auto;
  padding: 10px;
  background-color: #D9D9D9;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  font-family: Lato;
font-size: 14px;
font-style: normal;
font-weight: 550;
  color: #555;
}

.comment-input-section {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 20px;
gap: 10px;
}

.comment-input {
outline: none;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
background-color: #D9D9D9;
width: 90%;
padding: 7px;
border-radius: 6px;
resize: none;
border: none;
}


.comment-submit-button {
padding: 10px 20px;
background-color: #3A4E8B;
color: white;
border-radius: 6px;
border: none;
font-size: 16px;
margin-right: 20px;
}

.post-footer {
display: flex;
justify-content: space-between;
width: 100%;
margin-top: 20px;
align-items: flex-start; 
}

.comments-section {
width: 80%; 
max-height: 170px; 
overflow-y: auto; 
}

.comment {
width: 98%;
background-color: #ffffff;
display: flex;
align-items: center;
gap: 30px;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
margin-top: 30px;
margin-bottom: 10px;
border-radius: 6px;
height: 50px;

}

.comment-avatar-wrapper {
display: flex;
flex-direction: column;
align-items: center;
width: 50px;
margin-bottom: 30px;
margin-left: 20px;
}

.comment-avatar {
width: 50px;
height: 50px;
border-radius: 50%;
overflow: hidden;
}

.comment-writer {
font-size: 13px;
font-weight: bold;
color: #3A4E8B;
text-align: center;
margin-top: 5px;
}

.comment-content {
width: 100%;
display: flex;
flex-direction: column;
}

.comment-header {
height: 30px;
display: flex;
justify-content: flex-end;
font-size: 13px;
font-weight: bold;
color: #3A4E8B;
}

.comment p {
margin-bottom: 30px;
height: 30px;
width: 100%;
font-size: 16px;
color: #333;
font-weight: 400;
margin: 0;
}

.no-comments-message {
display: flex;
justify-content: center; 
align-items: center;
color: #999;
text-align: center;
margin-top: 50px;
font-size: 20px;
pointer-events: none; 
height: 20px;
}

.no-comments {
max-height: none; 
overflow: hidden; 
}

.reply-button {
margin-right: 20px;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3); 
  padding: 0px 13px;
  background-color: #E7E7E7;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  height: 30px;
  border: none;
  font-size: 10px;
  flex-shrink: 0;
}

.reply-button:hover {
  background-color: #2a3e6b;
  color: white;
}

.post-actions {
display: flex;
justify-content: flex-end;
margin-top: 120px;
margin-right: 10px;
gap: 10px;
}

.edit-button, .delete-button {
padding: 10px 20px;
background-color: #ddd;
border-radius: 6px;
border: none;
font-size: 16px;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.edit-button:hover, .delete-button:hover {
background-color: #ccc;
}


</style>
