<template>
  <div class="outer-container">
  <div class="central-container">
    <div class="post-container">
        <div class="post-form">
          <div class="form-row">
            <label for="title">제목</label>
            <input type="text" class="form-title" v-model="title" />
          </div>
          <div class="form-row content-row">
            <label for="content">내용</label>
            <textarea class="form-content" v-model="content"></textarea>
          </div>
          <div class="form-bottom">
            <div class="form-row file-upload">
              <label>첨부파일</label>
              <div class="file-upload-container">
                <div v-if="fileName" class="file-name">
                  {{ fileName }} <span @click="removeFile" class="remove-file">✖</span>
                </div>
                <input type="file" id="fileInput" ref="fileInput" @change="onFileChange" />
                <button @click="triggerFileUpload">파일 찾기<i class="icon-upload"></i></button>
              </div>
            </div>
            <div class="form-row submit-row">
              <button @click="submitPost">등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const title = ref('');
  const content = ref('');
  const file = ref(null);
  const fileName = ref('');
  
  const triggerFileUpload = () => {
    // 파일 선택 트리거
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };
  
  const onFileChange = (event) => {
    // 파일이 변경되었을 때 처리
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      file.value = selectedFile;
      fileName.value = selectedFile.name;
    }
  };
  
  const removeFile = () => {
    // 파일 삭제
    file.value = null;
    fileName.value = '';
    document.getElementById('fileInput').value = '';
  };

  const getNextId = async (apiUrl) => {
    const response = await axios.get(apiUrl);
    const posts = response.data;

    if (posts.length === 0) {
      return 1;
    }

    const ids = posts.map(post => parseInt(post.id, 10));
    const maxId = Math.max(...ids);

    return maxId + 1;
  }
  
  const submitPost = async () => {
    // 게시글 등록 로직 (폼 데이터 전송 예시)

    let apiUrl = 'http://localhost:8080/manualboard';
    if (window.location.pathname.includes('/noticeboard')) {
      apiUrl = 'http://localhost:8080/noticeboard';
    }
    const newId = await getNextId(apiUrl);

    const postData = {
      id: newId,
      title: title.value,
      content: content.value,
      file: fileName.value
    };

    try {
    const response = await axios.post(apiUrl, postData);
    console.log('게시글이 성공적으로 등록되었습니다:', response.data);
    if (window.location.pathname.includes('/noticeboard')) {
      router.push('/noticeboard');
    } else {
      router.push('/manualboard');
    }
  } catch (error) {
    console.error('게시글 등록 중 오류 발생:', error);
  }
};

  </script>
  
  <style scoped>
  .outer-container {
    background-color: #F3F7FA;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .central-container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 20px 0 20px 0;
    width: 90%;
    min-width: 800px;
    max-width: 1800px;
    height: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    overflow: hidden; /* 세로 스크롤 방지 */
    height: 70vh;
    padding: 5px;
  }

  .post-container {
    display: flex;
    flex-direction: column;
    margin: 20px 40px;
    flex-grow: 1;
    background-color: #F3F7FA;
    border-radius: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }


  .post-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    flex-grow: 1;
    padding: 20px;
    width: 100%;
    height: 100%;
  }
  
  .form-row {
    display: flex;
    align-items: flex-start;
    
  }

  .content-row {
    flex-grow: 1;
    display: flex;
  }
  
  label {
    width: 100px;
    font-weight: bold;
    margin-right: 16px;
    flex-shrink: 0;
    text-align: center;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    height: 100px;
    resize: none;
    flex-grow: 1;
  }
  
  .file-upload-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .file-name {
    display: flex;
    align-items: center;
    background-color: #f4f4f4;
    padding: 8px;
    border-radius: 4px;
  }
  
  .remove-file {
    margin-left: 8px;
    cursor: pointer;
    color: red;
  }
  
  input[type="file"] {
    display: none;
  }
  
  button {
    padding: 8px 16px;
    background-color: #ddd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  }
  
  button:hover {
    background-color: #bbb;
  }
  
  .submit-row {
    display: flex;
    justify-content: flex-end;
  }

  .form-title, .form-content {
    border-radius: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;
    flex-grow: 1;
  }

  .form-content {
    flex-grow: 1;
    height:100%;
    min-height: 200px;
  }

  .form-bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  /* 모든 요소에 박스 크기 계산을 정확히 하기 위한 설정 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

.post-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
  flex-grow: 1;
  background-color: #F3F7FA;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;  /* 스크롤바 방지 */
}

.post-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  flex-grow: 1;
  padding: 20px;
  width: 100%;
  height: 100%;
}

textarea {
  height: calc(100% - 40px);  /* 패딩 등을 고려한 높이 설정 */
  resize: none;
  flex-grow: 1;
}

button {
  padding: 8px 16px;
  background-color: #ddd;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
  </style>
  