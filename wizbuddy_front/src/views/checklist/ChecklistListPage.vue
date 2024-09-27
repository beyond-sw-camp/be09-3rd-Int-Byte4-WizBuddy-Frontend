<template>
    <div class="checklist-list-page">
        <h1>체크리스트 목록</h1>
        <div v-for="checklist in checklists" :key="checklist.id">
            <div @click="openModal(checklist)" class="checklist-header">{{ checklist.title }}</div>
            <!-- 모달창 -->
            <ChecklistModal v-if="isModalOpen" :checklist="selectedChecklist" @close="closeModal" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChecklistModal from '@/components/checklist/ChecklistModal.vue'; // 모달창 컴포넌트 import

// 체크리스트 목록 더미 데이터
const checklists = ref([
    {
        id: 1,
        title: '9월 16일 1T 필독',
        tasks: [
            { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
            { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
            { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소', isFixed: true },
        ],
    },
    {
        id: 2,
        title: '9월 17일 2T 필독',
        tasks: [
            { id: 1, number: 1, title: '첫 번째 업무', content: '물건 정리', isFixed: false },
            { id: 2, number: 2, title: '두 번째 업무', content: '서류 정리', isFixed: true },
        ],
    },
]);

// 모달 관련 상태
const isModalOpen = ref(false);
const selectedChecklist = ref(null);

// 모달 열기
const openModal = (checklist) => {
    selectedChecklist.value = checklist;
    isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
    isModalOpen.value = false;
};
</script>

<style scoped>
.checklist-list-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.checklist-header {
    cursor: pointer;
    background-color: #f4f4f4;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.checklist-header:hover {
    background-color: #ddd;
}
</style>
