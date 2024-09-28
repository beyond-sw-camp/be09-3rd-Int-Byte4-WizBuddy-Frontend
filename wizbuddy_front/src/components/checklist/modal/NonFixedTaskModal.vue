<template>
    <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
            <h2>비고정 업무 목록</h2>

            <!-- 비고정 업무 선택 -->
            <div class="task-list">
                <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
                    <label>
                        <input type="checkbox" v-model="selectedTasks" :value="task" />
                        {{ task.title }}
                    </label>
                </div>
            </div>

            <button class="add-task-button" @click="submit">비고정 업무 추가</button>
            <button class="close-button" @click="close">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 비고정 업무 목록을 props로 받음
const props = defineProps({
    nonFixedTasks: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['close', 'add-task']);
const selectedTasks = ref([]);

// 모달 닫기 함수
const close = () => {
    emit('close');
};

// 업무 추가 함수
const submit = () => {
    selectedTasks.value.forEach(task => emit('add-task', task)); // 선택된 업무를 부모로 전달
    selectedTasks.value = []; // 선택 초기화
    close(); // 모달 닫기
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
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
}

h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.task-list {
    margin-bottom: 20px;
}

.task-item {
    padding: 10px;
    background-color: #e3f2fd;
    border-radius: 5px;
    margin-bottom: 10px;
}

.add-task-button {
    padding: 10px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-task-button:hover {
    background-color: #388e3c;
}

.close-button {
    padding: 10px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}

.close-button:hover {
    background-color: #d32f2f;
}
</style>
