<template>
    <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
            <h2>{{ checklist.title }}</h2>

            <!-- 고정 업무 구역 -->
            <div class="task-list">
                <h3>고정 업무</h3>
                <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
                    <div class="task-number">{{ task.number }}번 업무</div>
                    <div class="task-content">{{ task.content }}</div>
                    <span class="fixed-indicator">●</span>
                </div>
            </div>

            <!-- 고정 업무와 비고정 업무 사이 회색 실선 -->
            <hr class="separator">

            <!-- 비고정 업무 구역 -->
            <div class="task-list non-fixed-tasks">
                <h3>비고정 업무</h3>
                <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
                    <div class="task-number">{{ task.number }}번 업무</div>
                    <div class="task-content">{{ task.content }}</div>
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

.task-item {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
}

.fixed-task {
    background-color: #fce4ec;
}

.non-fixed-task {
    background-color: #e3f2fd;
}

.fixed-indicator {
    color: red;
    font-size: 20px;
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

/* 고정 업무와 비고정 업무를 나누는 실선 */
.separator {
    border: none;
    border-top: 2px solid #ccc;
    margin: 30px 0;
}

/* 비고정 업무와 모달창 아래 간격 */
.non-fixed-tasks {
    margin-bottom: 40px;
}

/* 텍스트 중앙 정렬 */
.task-content {
    text-align: center;
    font-size: 16px;
    color: #333;
    margin-left: 10px;
    flex-grow: 1;
}
</style>
