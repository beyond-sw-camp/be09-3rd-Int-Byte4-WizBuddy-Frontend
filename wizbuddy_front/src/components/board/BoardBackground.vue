<template>
  <div class="container">
    <div class="central-container">
      <div class="inner-container">
        <BoardTable/>
      </div>
      <div class="bottom-controls">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="검색">
          <button class="search-button">검색</button>
        </div>
        <button class="write-button" @click="goToRegister">글쓰기</button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
    import {useRoute, useRouter} from 'vue-router';
    import BoardTable from './BoardTable.vue';

    const currentRoute = useRoute();
    const router = useRouter();

    const goToRegister = () => {
      // 현재 게시판 유형에 따라 동적으로 경로 생성
      router.push(`/registration?boardType=${currentRoute.params.boardType}`);
    };
</script>
  
<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .central-container {
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

  .inner-container {
    background-color: #F3F7FA;
    width: 90%;               /* Make it responsive by percentage */
    max-width: 1800px;        /* Set a maximum width to prevent it from being too wide */
    max-height: 900px;        /* Set a maximum height */
    border-radius: 10px;      /* Rounded corners */
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25); /* Inner shadow */
    display: flex;            /* Flex to control content */
    justify-content: center;  /* Center the content horizontally */
    align-items: center;      /* Center the content vertically */
    box-sizing: border-box;
    padding: 5px;            /* Padding inside the inner-container */
    height: 80%;              /* Reduced height to make space for bottom-controls */
    margin-bottom: 20px;       /* Add spacing below the inner-container for bottom-controls */
  }

  /* Optional media queries for responsiveness */
  @media (max-width: 768px) {
    .inner-container {
      width: 95%;    /* On smaller screens, increase the width */
      height: 90%;   /* Adjust the height for smaller screens */
    }
  }

  .bottom-controls {
    display: flex;
    justify-content: space-between; /* Space items evenly between left and right */
    align-items: center;
    box-sizing: border-box;
    width: 90%; /* Matches the width of inner-container */
    max-width: 1800px; /* Same as the max-width of inner-container */
  }

  .search-container {
    display: flex;
    align-items: center;
  }

  .search-input {
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
    margin-right: 10px;
    box-sizing: border-box;
    width: 300px;
  }

  .search-button {
    background-color: #ddd;
    border: 1px solid #ccc;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: -1px; /* To avoid double border between input and button */
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .search-button:hover {
    background-color: #bbb; /* Change background on hover */
  }

  /* Write button on the right */
  .write-button {
    background-color: #ddd;
    border: 1px solid #ccc;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .write-button:hover {
    background-color: #bbb; /* Change background on hover */
  }

  /* Ensure responsiveness for smaller screens */
  @media (max-width: 768px) {
    .bottom-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .search-container, .write-button {
      margin-bottom: 10px;
    }
  }
</style>  