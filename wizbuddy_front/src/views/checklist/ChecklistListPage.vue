<template>
    <div class="checklist-list-page">
        <aside class = "left-side">
            <TaskTab/>
        </aside>
        
        <div class="main-content">
            <h1>체크리스트 목록</h1>
            <div v-for="checklist in checklists" :key="checklist.id">
                <div @click="openModal(checklist)" class="checklist-header">{{ checklist.title }}</div>
                <!-- 모달창 -->
                <ChecklistModal v-if="isModalOpen" :checklist="selectedChecklist" @close="closeModal" />
            </div>
        </div>
        
        <aside class="right-side">
            <UserProfileMenu/>
        </aside>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChecklistModal from '@/components/checklist/ChecklistModal.vue'; // 모달창 컴포넌트 import
import TaskTab from '@/components/task/TaskTab.vue';
import UserProfileMenu from '@/components/UserProfileMenu.vue';

// 체크리스트 목록 더미 데이터
const checklists = ref([
    {
        id: 1,
        title: '9월 16일 1T 필독',
        tasks: [
            { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
            { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
            { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소하기', isFixed: true },
            { id: 4, number: 4, title: '네 번째 업무', content: '머신 청소', isFixed: true },
            { id: 5, number: 5, title: '다섯 번째 업무', content: '머신 청소', isFixed: true },
            { id: 6, number: 6, title: '여섯 번째 업무', content: '머신 청소', isFixed: true },
            { id: 7, number: 7, title: '일곱 번째 업무', content: '머신 청소', isFixed: true },
            { id: 8, number: 8, title: '여덟 번째 업무', content: '머신 청소', isFixed: true },
            { id: 11, number: 9, title: '열한 번째 업무', content: '머신 청소', isFixed: true },
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    min-height: calc(100vh - 151.6px);
    padding-bottom: 41.6px;
    background-color: #F3F7FA;
    padding: 0 20px;
    margin: auto;
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA;
    padding: 20px;
    margin-left : 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
}

.sidebar {
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 20px;
    top: 0;
    bottom: 0;
}

.main-content {
  flex: 1;
  margin-left: 120px;
  /* 사이드바 너비 + 여백 */

  margin-right: 120px;
}


.checklist-header {
    cursor: pointer;
    background-color: #f3bdbd;
    padding: 15px; /* 패딩을 늘려서 항목의 클릭 영역을 키움 */
    margin-bottom: 10px; /* 항목 간의 간격을 조금 넓게 설정 */
    border-radius: 10px;
    width: 100%; /* 부모 컨테이너에 맞춰서 너비를 100%로 설정 */
    box-sizing: border-box; /* 패딩을 포함한 너비가 정확하게 계산되도록 설정 */
    transition: background-color 0.3s ease;
    margin-right: 40px;
    font-size:20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
}

.checklist-header:hover {
    background-color: #ddd;
}

h1 {
  text-align: center;margin-top: 20px; /* 상단에 여백을 추가 */
    margin-bottom: 20px; /* 하단에도 여백을 추가하여 항목과 구분 */
    font-weight: bold;
}



.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
}
</style>
