<template>
  <div :class="getTaskClass(task.isFixed)" class="task-item" @click="goToDetailPage">
    <div class="task-info">
      <div class="task-header">{{ task.title }} </div>
      <div class="task-body">{{ task.content }} </div>
    </div>
    <!-- 고정된 업무일 경우 빨간색 동그라미 표시 -->
    <span v-if="task.isFixed" class="fixed-indicator"></span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

// 고정 여부에 따라 다른 스타일 적용
const getTaskClass = (isFixed) => {
  return isFixed ? 'fixed-task' : 'non-fixed-task';
};

const router = useRouter();

// Task 상세 페이지로 이동하는 함수
const goToDetailPage = () => {
  router.push(`/task/${props.task.id}`); // Task ID를 사용하여 상세 페이지로 이동
};
</script>

<style scoped>
.task-item {
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  /* 클릭 가능하도록 커서 변경 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-header {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  background-color: #f8f8f8;
  padding: 5px 20px;
  border-radius: 15px;
  margin-bottom: 5px;
}

.fixed-task .task-header {
  background-color: #f28b82;
  color: white;
}

.non-fixed-task .task-header {
  background-color: #aecbfa;
  color: white;
}

.task-body {
  font-size: 14px;
  color: #555;
}

.fixed-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
  margin-left: 10px;
}
</style>
