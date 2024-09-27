<template>
    <div class="task-edit-page">
        <h1>업무 수정</h1>
        <!-- TaskForm 컴포넌트를 사용하여 수정, 버튼 라벨을 "수정"으로 설정 -->
        <TaskForm :task="selectedTask" @submitTask="updateTask" submitButtonLabel="수정" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskForm from '@/components/task/TaskForm.vue'; // TaskForm 컴포넌트 가져오기

// 예시 Task 데이터
const tasks = ref([
    { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
    { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
    { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소', isFixed: true },
    { id: 4, number: 4, title: '네 번째 업무', content: '재고 확인', isFixed: false }
]);

const route = useRoute();
const router = useRouter();

// 라우트에서 전달받은 ID로 수정할 Task 찾기
const selectedTask = ref(tasks.value.find((task) => task.id === Number(route.params.id)));

// Task 업데이트 로직
const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
        tasks.value[index] = { ...updatedTask };
        // 수정 후, 목록 페이지로 이동
        console.log(tasks.value[index]);
        router.push('/task');
    }
};

</script>

<style scoped>
.task-edit-page {
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

.task-edit-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}
</style>