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
import { useRoute } from 'vue-router';
import TaskItem from '@/components/task/TaskItem.vue';
import TaskTab from '@/components/task/TaskTab.vue';
import UserProfileMenu from '@/components/UserProfileMenu.vue';
import SideMenu from '@/components/task/TaskSideMenu.vue';

const tasks = ref([]);

const route = useRoute();

// 페이지가 로드될 때 API로부터 데이터를 가져옴
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/tasks'); // JSON 서버에서 데이터를 가져옴
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);    
    if (data.length > 0) {
      tasks.value = data;  // 가져온 데이터를 tasks에 할당
      console.log('서버로부터 받아온 tasks:', tasks.value);
    }
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
  }

});

</script>

<style scoped>
.task-list-page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    min-height: calc(100vh - 151.6px);
    padding-bottom: 41.6px;
    background-color: #F3F7FA;
    padding: 0 20px;
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA;
    padding: 20px;
    margin-left : 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
}

.main-content {
  flex: 1;
  margin-left: 120px;
  /* 사이드바 너비 + 여백 */
  margin-right: 120px;
}

h1 {
  text-align: center;
  margin-top: 20px; /* 상단에 여백을 추가 */
  margin-bottom: 20px; /* 하단에도 여백을 추가하여 항목과 구분 */
  font-weight: bold;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 768px) {
  .task-list-page {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
  }
}

.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
}
</style>