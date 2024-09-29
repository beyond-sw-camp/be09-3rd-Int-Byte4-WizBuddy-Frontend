<template>
    <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
            <h2>{{ checklist.title }}</h2>

            <!-- 고정 업무 구역 -->
            <div class="task-list">
                <h3>고정 업무</h3>
                <div class="task-items-container">
                    <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
                        <div class="task-content">{{ task.title }}</div>
                        <!-- <button class="remove-task-button" @click="removeTask(task)">x</button> -->
                    </div>
                </div>
            </div>

            <!-- 고정 업무와 비고정 업무 사이 회색 실선 -->
            <hr class="separator">
            <!-- task 상세페이지로 가능 모달창 하나 필요한가????????????????????-->
            <!-- 비고정 업무 구역 -->
            <div class="task-list non-fixed-tasks">
                <h3>비고정 업무</h3>
                <div class="task-items-container">
                    <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
                        <div class="task-content">{{ task.title }}</div>
                        <!-- <button class="remove-task-button" @click="removeTask(task)">x</button> -->
                    </div>
                </div>
            </div>

            <button class="close-button" @click="close">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    checklist: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

// 고정 업무와 비고정 업무를 구분
const fixedTasks = computed(() =>
    props.checklist.tasks.filter(task => task.isFixed)
);

const nonFixedTasks = computed(() =>
    props.checklist.tasks.filter(task => !task.isFixed)
);

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000; /* 추가: 텍스트 색상을 검은색으로 명시적 지정 */
}
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #000000;
  }
  
  .task-list {
    margin-bottom: 20px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .section-header h3 {
    font-size: 18px;
    margin-right: 15px;
    white-space: nowrap;
    color: #555;
  }
  
  .divider {
    flex-grow: 1;
    height: 1px;
    background: repeating-linear-gradient(to right, #ccc 0, #ccc 5px, transparent 5px, transparent 7px);
  }
  
  .task-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
}
  
.task-item {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 0 1 auto;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  color: #000000; /* 추가: task-item 내 텍스트 색상을 검은색으로 명시적 지정 */
}
  
  .fixed-task {
    background-color: #fce4ec;
  }
  
  .non-fixed-task {
    background-color: #e3f2fd;
  }
  
  .task-content {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
  .separator {
    border: none;
    border-top: 1px solid #ddd;
    margin: 20px 0;
  }
  
  .close-button {
    padding: 10px 20px;
    border: 1px solid #f44336;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    font-size: 16px;
    background-color: white;
    color: #f44336;
  }
  
  .close-button:hover {
    background-color: #f44336;
    color: white;
  }
</style>
