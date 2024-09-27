<template>
        <table class="board">
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
              <template >{{ }}</template>
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
</template>

<script setup>
    import {useRoute, useRouter} from 'vue-router';

    const currentRoute = useRoute();
    const router = useRouter();
</script>

<style scoped>
    .board {
    width: 100%;
    height: 100%;
    border-collapse: collapse; /* Ensure table borders merge */
    }
    .board th, .board td {
    padding: 5px 10px; /* Spacing between table cells */
    border: 1px solid #ddd; /* Add borders between cells */
    text-align: center; /* Center align text */
    }

    .board th {
    background-color: #ffffff; /* Background for table header */
    color: #000000;
    font-weight: bold;
    padding: 12px 20px 12px 20px;
    font-size: 20px;
    }

    .board td {
    font-size: 14px;
    }

    .board tr:hover td {
    background-color: #f2f2f2; /* Row hover effect */
    }

    .board td {
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