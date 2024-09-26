<template>
  <div :class="getTaskClass(task.isFixed)" class="task-item">
    <div class="task-info">
      <div class="task-header">{{ task.title }} </div>
      <div class="task-body">{{ task.content }} </div>
    </div>
    <span v-if="task.isFixed" class="fixed-indicator"></span>
  </div>
</template>

<script setup>
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
</script>

<style scoped>
.task-item {
  background-color: #ffffff; /* 배경색 흰색 */
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 */
  display: flex;
  justify-content: space-between; /* 아이템을 양쪽 끝에 배치 */
  align-items: center; /* 세로 가운데 정렬 */
}

.task-info {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 가운데 정렬 */
}

.task-header {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  background-color: #f8f8f8;
  padding: 5px 10px;
  border-radius: 15px;
  margin-bottom: 5px;
  text-align: center; /* 가로 가운데 정렬 */
}

.fixed-task .task-header {
  background-color: #f28b82; /* 고정된 업무의 배경색 */
  color: white;
}

.non-fixed-task .task-header {
  background-color: #aecbfa; /* 고정되지 않은 업무의 배경색 */
  color: white;
}

.task-body {
  font-size: 14px;
  color: #555;
  text-align: center; /* 가로 가운데 정렬 */
}

.fixed-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
}
</style>
