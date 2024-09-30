<template>
  <div class="task-list-page">
    <aside class="left-side">
      <TaskTab/>
      <SideMenu :tasks="tasks" />
    </aside>
    
    <div class="main-content">
      <h1>업무 리스트</h1>
      <div class="task-container">
        <TaskItem v-for="task in tasks" :task="task" :key="task.id" />
      </div>
    </div>
    
    <aside class="right-side">
      <UserProfileMenu/>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskItem from '@/components/task/TaskItem.vue';
import TaskTab from '@/components/task/TaskTab.vue';
import UserProfileMenu from '@/components/UserProfileMenu.vue';
import SideMenu from '@/components/task/TaskSideMenu.vue';

const tasks = ref([]);

// 로컬 스토리지에서 shop 정보를 가져오기
const shop = JSON.parse(localStorage.getItem('shop'));
const shopId = shop?.id || null; // shop 정보가 없으면 null 처리

onMounted(async () => {
  if (shopId) {
    try {
      const response = await fetch('http://localhost:8080/tasks'); // JSON 서버에서 데이터를 가져옴
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allTasks = await response.json();

      // shopId가 일치하는 tasks만 필터링
      tasks.value = allTasks.filter(task => task.shopId === shopId);

      console.log('Filtered tasks for shopId:', shopId, tasks.value);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  } else {
    console.error('로컬 스토리지에서 shop 정보를 가져올 수 없습니다.');
  }
});
</script>


<style scoped>
.task-list-page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    height: calc(100vh - 151.6px);
    background-color: #F3F7FA;
    padding: 0 20px;
    position: relative;
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA;
    padding: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    height: 100%;
    overflow-y: auto;
}

.main-content {
    flex: 1;
    margin-left: 120px;
    margin-right: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
}

.task-container {
    flex: 1;
    overflow-y: auto;
    padding-right: 20px;
    padding-bottom: 30px; /* AppFooter의 높이만큼 여백 추가 */
}

.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .task-list-page {
        flex-direction: column;
        height: auto;
    }

    .main-content {
        margin-left: 0;
        margin-right: 0;
        height: auto;
    }

    .left-side, .right-side {
        width: 100%;
        height: auto;
    }
}
</style>