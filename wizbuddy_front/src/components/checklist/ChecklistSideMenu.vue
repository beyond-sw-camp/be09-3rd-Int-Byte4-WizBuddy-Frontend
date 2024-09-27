<template>
    <div class="side-menu">
        <button class="side-menu-item" @click="openInsertModal">등록</button>
        <button class="side-menu-item" @click="openEditModal" v-if="selectedChecklist">수정</button>
        <button class="side-menu-item" @click="deleteChecklist" v-if="selectedChecklist">삭제</button>

        <!-- ChecklistInsertModal 모달 -->
        <ChecklistInsertModal
            v-if="isInsertModalOpen"
            :tasks="tasks" 
            @close="closeInsertModal"
            @submit="submitNewChecklist"
        />
        <!-- ChecklistListPage.vue에서 전달받은 tasks 데이터 -->
         <!-- 새로운 체크리스트 등록 시 이벤트 -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChecklistInsertModal from '@/components/checklist/modal/ChecklistInsertModal.vue';

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});

const isInsertModalOpen = ref(false);

// 모달 열기
const openInsertModal = () => {
    isInsertModalOpen.value = true;
};

// 모달 닫기
const closeInsertModal = () => {
    isInsertModalOpen.value = false;
};

// 새로운 체크리스트 등록
const emit = defineEmits(['add-checklist']);
const submitNewChecklist = (newChecklist) => {
    emit('add-checklist', newChecklist); // 부모 컴포넌트로 새로운 체크리스트 전달
    closeInsertModal(); // 모달 닫기
};
</script>
  
  <style scoped>
  .side-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f3f7fa;
    width: 100%;
    padding: 20px;
  }
  
  .side-menu-item {
    display: block;
    padding: 15px 20px;
    margin-bottom: 15px;
    width: 150px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  
  .side-menu-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  