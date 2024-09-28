<template>
    <div class="side-menu">
        <button class="side-menu-item" @click="goToTaskCreatePage">등록</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// router를 이용하는거면 부모-자식 관계가 아니라 props를 통한 데이터 전송을 하지않는다.
// const props = defineProps({
//     tasks: {
//         type: Array,
//         Required: true,
//     },
// })

const router = useRouter();

const goToTaskCreatePage = () => {
  router.push('/task/create');
}
</script>

<style scoped>
.side-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f3f7fa;
    width: 100%;
    padding: 20px;
  }
  
  .side-menu-item {
    display: block;
    padding: 15px 20px;
    margin-bottom: 15px;
    width: 150px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }

  .side-menu-item:hover {
    background-color: #f0f0f0;
  }
</style>