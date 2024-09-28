<template>
    <div class="task-detail-page">
        <h1>업무 상세</h1>
        <!-- TaskDetail 컴포넌트를 사용하여 상세 내용 출력 -->
        <TaskDetail :task="selectedTask" />

        <div class="action-buttons">
            <button class="edit-button" @click="editTask">수정</button>
            <button class="delete-button" @click="deleteTask">삭제</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskDetail from '@/components/task/TaskDetail.vue'; // TaskDetail 컴포넌트 가져오기

const router = useRouter();
const route = useRoute();

// Task 데이터 예시
const tasks = ref([
    { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
    { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
    { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소', isFixed: true },
    { id: 4, number: 4, title: '네 번째 업무', content: '재고 확인', isFixed: false }
]);

// 라우트에서 전달받은 ID로 선택된 Task를 가져옴
const selectedTask = ref(tasks.value.find((task) => task.id === Number(route.params.id)));

// 수정 버튼 클릭 시 로직
const editTask = () => {
    router.push(`/task/edit/${selectedTask.value.id}`);
};

// 삭제 버튼 클릭 시 로직
const deleteTask = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
        // 삭제 로직 (데이터베이스에서 삭제되었다고 가정)
        alert("업무가 삭제되었습니다.");
        router.push('/task');
    }
};
</script>

<style scoped>
.task-detail-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.edit-button,
.delete-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.edit-button {
    background-color: #4caf50;
    color: white;
}

.delete-button {
    background-color: #f44336;
    color: white;
}
</style>