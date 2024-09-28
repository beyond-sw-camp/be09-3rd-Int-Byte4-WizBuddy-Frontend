<template>
  <div class="side-menu">
    <button class="side-menu-item" @click="openInsertModal">등록</button>
    <button class="side-menu-item" @click="toggleEditMode">수정</button>
    <button class="side-menu-item" @click="toggleDeleteMode">삭제</button>

    <!-- ChecklistInsertModal 모달 -->
    <ChecklistInsertModal
      v-if="isInsertModalOpen"
      :tasks="tasks"
      @close="closeInsertModal"
      @submit="submitNewChecklist"
    />
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
  selectedChecklist: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['add-checklist', 'trigger-mode']);

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
const submitNewChecklist = (newChecklist) => {
  emit('add-checklist', newChecklist);
  closeInsertModal();
};

// 수정 모드 토글 (수정 모드 <-> 일반 모드)
const isEditingMode = ref(false);
const toggleEditMode = () => {
  if (isEditingMode.value) {
    emit('trigger-mode', 'normal');
    isEditingMode.value = false;
    console.log('일반 모드로 전환');
  } else {
    emit('trigger-mode', 'edit');
    isEditingMode.value = true;
    console.log('수정 모드로 전환');
  }
};

// 삭제 모드 토글 (삭제 모드 <-> 일반 모드)
const isDeletingMode = ref(false);
const toggleDeleteMode = () => {
  if (isDeletingMode.value) {
    emit('trigger-mode', 'normal');
    isDeletingMode.value = false;
    console.log('일반 모드로 전환');
  } else {
    emit('trigger-mode', 'delete');
    isDeletingMode.value = true;
    console.log('삭제 모드로 전환');
  }
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
  
  .side-menu-item:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  
  .side-menu-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  