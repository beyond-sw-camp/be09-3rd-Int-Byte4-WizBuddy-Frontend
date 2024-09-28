<template>
    <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
            <h2>{{ checklist.title }}</h2>

            <!-- 고정 업무 구역 -->
            <div class="task-list">
                <h3>고정 업무</h3>
                <div class="task-items-container">
                    <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
                        <div class="task-content">{{ task.content }}</div>
                        <button class="remove-task-button" @click="removeTask(task)">x</button>
                    </div>
                </div>
            </div>

            <!-- 고정 업무와 비고정 업무 사이 회색 실선 -->
            <hr class="separator">

            <!-- 비고정 업무 구역 -->
            <div class="task-list non-fixed-tasks">
                <h3>비고정 업무</h3>
                <div class="task-items-container">
                    <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
                        <div class="task-content">{{ task.content }}</div>
                        <button class="remove-task-button" @click="removeTask(task)">x</button>
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

// 더미 함수 (나중에 로직 추가)
const removeTask = (task) => {
    console.log('Remove task:', task);
};
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
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.task-list {
    margin-bottom: 30px;
}

.task-items-container {
    display: flex;
    flex-wrap: wrap;
    /* 줄 넘침을 허용하여 다음 줄에 배치 */
    gap: 10px;
    /* 각 업무 간 간격 */
    justify-content: flex-start;
    /* 태스크들을 왼쪽 정렬 */
}

.task-item {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    word-wrap: break-word;
    /* flex-grow: 1; */
    min-width: 150px;
    /* 최소 너비 설정 */
    max-width: calc(50% - 10px);
    /* 반 줄에 배치 가능, 너비 설정 */
}

.fixed-task {
    background-color: #fce4ec;
}

.non-fixed-task {
    background-color: #e3f2fd;
}

.task-content {
    font-size: 16px;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
    /* X 버튼과의 간격 */
}

.remove-task-button {
    background-color: transparent;
    border: none;
    color: #f44336;
    font-size: 18px;
    cursor: pointer;
}

.remove-task-button:hover {
    color: #d32f2f;
}

.close-button {
    padding: 10px 20px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-button:hover {
    background-color: #2f3a9d;
}

.separator {
    border: none;
    border-top: 2px solid #ccc;
    margin: 30px 0;
}
</style>
