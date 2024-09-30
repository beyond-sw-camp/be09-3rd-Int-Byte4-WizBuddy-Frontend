<template>
    <div class="checklist-container">
      <div class="checklist-header">
        <h3>{{ checklist.title }}</h3>
        <div class="summary">
          <span class="fixed-tasks">고정 업무 : {{ fixedTasks.length }}개</span>
          <span class="non-fixed-tasks">비고정 업무 : {{ nonFixedTasks.length }}개</span>
        </div>
      </div>
  
      <div class="task-list">
        <ul>
          <li v-for="task in fixedTasks" :key="task.id" class="task-item fixed">
            <div :class="['task-number', { fixed: task.isFixed }]">{{ task.number }}번 업무</div>
            <div class="task-content">{{ task.content }}</div>
            <span class="fixed-indicator">●</span>
          </li>
          <li v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed">
            <div :class="['task-number', { 'non-fixed': !task.isFixed }]">{{ task.number }}번 업무</div>
            <div class="task-content">{{ task.content }}</div>
          </li>
        </ul>
      </div>
  
      <!-- 선택 버튼: isSelecting이 true일 때만 표시 -->
      <button v-if="isSelecting" class="select-button" @click="selectChecklist">선택</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    checklist: {
      type: Object,
      required: true,
    },
    isSelecting: { // 선택 버튼 활성화 여부
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['select-checklist']);
  
  const fixedTasks = computed(() =>
    props.checklist.tasks.filter(task => task.isFixed)
  );
  const nonFixedTasks = computed(() =>
    props.checklist.tasks.filter(task => !task.isFixed)
  );
  
  // 선택 버튼 클릭 시 체크리스트를 부모로 전달
  const selectChecklist = () => {
    emit('select-checklist', props.checklist);
  };
  </script>
  
  
  <style scoped>
  .checklist-container {
    background-color: #f9f9fb;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .checklist-header {
    background-color: #3f51b5;
    padding: 10px 20px;
    border-radius: 8px 8px 0 0;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .summary {
    display: flex;
    gap: 10px;
  }
  
  .fixed-tasks {
    color: red;
    font-weight: bold;
  }
  
  .non-fixed-tasks {
    color: gray;
  }
  
  .task-list {
    background-color: white;
    border-radius: 0 0 8px 8px;
    padding: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .task-item {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .task-item:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .task-number {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    position: absolute;
    top: -10px;
    left: 10px;
  }
  
  .task-number.fixed {
    background-color: #fce4ec;
  }
  
  .task-number.non-fixed {
    background-color: #e3f2fd;
  }
  
  .task-content {
    font-size: 16px;
    color: #333;
    margin-left: 70px;
    flex-grow: 1;
  }
  
  .fixed-indicator {
    font-size: 20px;
    color: red;
    margin-left: 10px;
  }
  
  .select-button {
    background-color: #3f51b5;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .select-button:hover {
    background-color: #2c3e8c;
  }
  </style>
  