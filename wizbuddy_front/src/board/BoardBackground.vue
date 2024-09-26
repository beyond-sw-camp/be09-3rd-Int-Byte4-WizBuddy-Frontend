<template>
  <div class="container">
    <div class="central-container">
      <div class="inner-container">
        <table class="notice-board">
          <thead>
            <tr>
              <th class="board-number">번호</th>
              <th class="board-title">제목</th>
              <th class="board-writer">작성자</th>
              <th class="board-register-date">작성 날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bottom-controls">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="검색">
          <button class="search-button">검색</button>
        </div>
        <button class="write-button">글쓰기</button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
    import {useRoute, useRouter} from 'vue-router';

    const currentRoute = useRoute();
    const router = useRouter();
</script>
  
<style scoped>

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .central-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center the inner-container horizontally */
    align-items: center;     /* Center the inner-container vertically */
    height: 90vh;           /* Full viewport height */
    width: 90%;             /* Full width */
    background-color: #ffffff;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
    box-sizing: border-box;
    padding: 20px;           /* Add padding to prevent inner content from touching the edges */
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
    padding: 20px;            /* Padding inside the inner-container */
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

/* Container for the bottom controls */
.bottom-controls {
  display: flex;
  justify-content: space-between; /* Space items evenly between left and right */
  align-items: center;
  box-sizing: border-box;
  width: 90%; /* Matches the width of inner-container */
  max-width: 1800px; /* Same as the max-width of inner-container */
}

/* Search bar container on the left */
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
.notice-board {
  width: 100%;
  height: 100%;
  border-collapse: collapse; /* Ensure table borders merge */
}
.notice-board th, .notice-board td {
  padding: 12px 16px; /* Spacing between table cells */
  border: 1px solid #ddd; /* Add borders between cells */
  text-align: center; /* Center align text */
}

.notice-board th {
  background-color: #ffffff; /* Background for table header */
  color: #000000;
  font-weight: bold;
  padding: 12px 20px 12px 20px;
  font-size: 20px;
}

.notice-board td {
  font-size: 14px;
}

.notice-board tr:hover td {
  background-color: #f2f2f2; /* Row hover effect */
}

.notice-board td {
    padding: 8px;
    font-size: 12px;
  }

.board-number {
  width: 10%;
}

.board-title {
  width: 50%;
}

.board-writer {
  width: 20%;
}

.board-register-date {
  width: 20%;
}

</style>  