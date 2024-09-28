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
  width: 100%;
  background: #f3f7fa;
}
  
  .side-menu-item {
  display: block;
  padding: 10px 10px;
  font-size: 14px;
  width: 50%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-bottom: 20px;
  cursor: pointer;
  }

  .side-menu-item:hover {
    background-color: #f0f0f0;
  }
</style>