<template>
    <div class="checklist-list-page">
      <aside class="left-side">
        <TaskTab />
        <ChecklistSideMenu
          :tasks="tasks"
          :selectedChecklist="selectedChecklist"
          @add-checklist="addChecklist"
          @trigger-mode="handleMode"
        />
      </aside>
  
      <div class="main-content">
        <h1>체크리스트 목록</h1>
        <div v-for="checklist in checklists" :key="checklist.id">
          <div @click="realSelectChecklist(checklist)" class="checklist-header">
            {{ checklist.title }}
          </div>
  
          <!-- 선택 버튼: 수정 모드/삭제 모드에 따라 동작 -->
          <button
            v-if="isSelecting"
            class="select-button"
            @click="isEditing ? openEditModal(checklist) : (isDeleting ? confirmDelete(checklist) : selectChecklist(checklist))"
          >
            선택
          </button>
  
          <!-- ChecklistDetailModal -->
          <ChecklistDetailModal
            v-if="isModalOpen"
            :checklist="selectedChecklist"
            @close="closeModal"
          />
  
          <!-- EditModal -->
          <EditModal
            v-if="isEditModalOpen"
            :checklist="selectedChecklist"
            :tasks="tasks"
            @close="closeEditModal"
            @save="handleSaveEdit"
          />
        </div>
      </div>
  
      <aside class="right-side">
        <UserProfileMenu />
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TaskTab from '@/components/task/TaskTab.vue';
  import UserProfileMenu from '@/components/UserProfileMenu.vue';
  import ChecklistSideMenu from '@/components/checklist/ChecklistSideMenu.vue';
  import ChecklistDetailModal from '@/components/checklist/modal/ChecklistDetailModal.vue';
  import ChecklistItem from '@/components/checklist/ChecklistItem.vue';
  import EditModal from '@/components/checklist/modal/ChecklistEditModal.vue';
  
  // 체크리스트 목록
  const checklists = ref([
    {
      id: 1,
      title: '9월 16일 1T 필독',
      tasks: [
        { id: 1, content: '화장실 청소', isFixed: true },
        { id: 2, content: '매장 정리', isFixed: false },
        { id: 3, content: '커피 머신 청소하기', isFixed: true },
      ],
    },
    {
      id: 2,
      title: '9월 17일 2T 필독',
      tasks: [
        { id: 1, content: '화장실 청소', isFixed: true },
        { id: 2, content: '매장 정리', isFixed: false },
      ],
    },
  ]);
  
  // 전체 task 목록
  const tasks = ref([
    { id: 1, content: '화장실 청소', isFixed: true },
    { id: 2, content: '매장 정리', isFixed: false },
    { id: 3, content: '커피 머신 청소', isFixed: true },
    { id: 4, content: '재고 확인1', isFixed: false },
    { id: 5, content: '재고 확인2', isFixed: false },
    { id: 6, content: '재고 확인3', isFixed: false },
    { id: 7, content: '재고 확인4', isFixed: false },
    { id: 4, content: '재고 확인5', isFixed: false },
  ]);
  
  // 모달 및 체크리스트 상태
  const isModalOpen = ref(false);
  const isEditModalOpen = ref(false); // 수정 모달 상태 추가
  const selectedChecklist = ref(null); // 선택된 체크리스트 저장
  const isSelecting = ref(false); // 선택 버튼 활성화 여부
  const isEditing = ref(false); // 수정 모드 활성화 여부
  const isDeleting = ref(false); // 삭제 모드 활성화 여부
  
  // '수정', '삭제', '일반' 모드 처리
  const handleMode = (mode) => {
    if (mode === 'normal') {
      isSelecting.value = false; // 선택 버튼 비활성화
      isEditing.value = false; // 수정 모드 비활성화
      isDeleting.value = false; // 삭제 모드 비활성화
      selectedChecklist.value = null; // 선택된 체크리스트 초기화
      console.log('일반 모드로 전환');
    } else if (mode === 'edit') {
      isSelecting.value = true; // 선택 모드 활성화
      isEditing.value = true; // 수정 모드 활성화
      isDeleting.value = false; // 삭제 모드 비활성화
      selectedChecklist.value = null; // 선택된 체크리스트 초기화
      console.log('수정 모드로 전환');
    } else if (mode === 'delete') {
      isSelecting.value = true; // 선택 모드 활성화
      isDeleting.value = true; // 삭제 모드 활성화
      isEditing.value = false; // 수정 모드 비활성화
      selectedChecklist.value = null; // 선택된 체크리스트 초기화
      console.log('삭제 모드로 전환');
    }
  };
  
  // 체크리스트 선택
  const realSelectChecklist = (checklist) => {
    selectedChecklist.value = checklist; // 선택된 체크리스트 설정
    isModalOpen.value = true; // 모달 열기
  };
  
  // 체크리스트 선택 (실제 선택되는 경우)
  const selectChecklist = (checklist) => {
    if (selectedChecklist.value === checklist) {
      selectedChecklist.value = null; // 이미 선택된 체크리스트를 클릭하면 선택 해제
    } else {
      selectedChecklist.value = checklist; // 새로운 체크리스트 선택
      console.log('선택된 체크리스트:', checklist);
    }
  };
  
  // 삭제 확인 로직
  const confirmDelete = (checklist) => {
    const confirmed = window.confirm("진짜 삭제하시겠습니까?");
    if (confirmed) {
      deleteChecklist(checklist); // 체크리스트 삭제 로직 호출
    }
  };
  
  // 체크리스트 삭제
  const deleteChecklist = (checklist) => {
    const index = checklists.value.findIndex(c => c.id === checklist.id);
    if (index !== -1) {
      checklists.value.splice(index, 1); // 체크리스트 삭제
      console.log('삭제된 체크리스트:', checklist);
    }
  };
  
  // 수정 모드에서 선택 시 EditModal 열기
  const openEditModal = (checklist) => {
    selectedChecklist.value = checklist;
    isEditModalOpen.value = true; // 수정 모달 열기
  };
  
  // 모달 닫기
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // 수정 모달 닫기
  const closeEditModal = () => {
    isEditModalOpen.value = false;
  };
  
  // 체크리스트 추가 (ChecklistSideMenu에서 전달받음)
  const addChecklist = (newChecklist) => {
    checklists.value.push(newChecklist); // 새로운 체크리스트를 목록에 추가
  };
  
  const handleSaveEdit = (updatedChecklist) => {
    const index = checklists.value.findIndex(c => c.id === updatedChecklist.id);
    if (index !== -1) {
      checklists.value.splice(index, 1, updatedChecklist); // 체크리스트 수정
    }
    console.log('수정된 체크리스트:', updatedChecklist);
  };
  </script>
  
  
  
  <style scoped>
  /* 기존 스타일 유지 */
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
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
  }
  
  .main-content {
    flex: 1;
    margin-left: 120px;
    margin-right: 120px;
  }
  
  .checklist-header {
    cursor: pointer;
    background-color: #f3bdbd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
    margin-right: 40px;
    font-size: 20px;
    font-family: 'Trebuchet MS', Arial, sans-serif;
    font-weight: bold;
  }
  
  .checklist-header:hover {
    background-color: #ddd;
  }
  
  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .right-side {
    width: 20%;
    background-color: #F3F7FA;
    padding: 20px;
  }
  </style>
  