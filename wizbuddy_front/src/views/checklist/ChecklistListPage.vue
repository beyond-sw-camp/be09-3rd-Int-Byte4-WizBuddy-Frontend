<template>
    <div class="checklist-list-page">
     <aside class="left-side">
        <!-- 
            상단 왼쪽 바
            "체크리스트",
            "체크리스트 이력",
            "업무 리스트"
            이렇게 3개의 div가 존재하고 클릭시 각각 이동하는 url이 매핑되어있다.
        -->
        <TaskTab /> 

        <!-- 
            체크리스트에서 사용하는 side menu바
            "등록", "수정", "삭제"
            이렇게 3개의 버튼이 존재한다.
            page에서 가지고있는 checklists 정보와 tasks 정보를 보내줘야 하므로 props, emit 메서드를 사용해서 데이터를 자식으로 넘겨줘야한다.
            "등록" 버튼을 누르면 모달창이 뜨면서 고정업무가 자동으로 추가되어야함.
            "수정", "삭제" 버튼을 누르면 체크리스트에 "선택" 버튼이 보여지게해야한다.
            "addChecklist", "handleMode" 이벤트(메서드)를 관리한다.
        -->
        <ChecklistSideMenu
            :tasks="tasks"
            :selectedChecklist="selectedChecklist"
            @add-checklist="addChecklist"
            @trigger-mode="handleMode"
        />
      </aside>
  
      <div class="main-content">
        <h1>체크리스트 목록</h1>
        <!-- page가 가지고 있는(나중에는 db.json에서 받아올 데이터) checklists 데이터를 보여주는 div이다.-->
        <div v-for="checklist in checklists" :key="checklist.id">
          <!-- 클릭시 realSelectChecklist 이벤트를 발생시키고 이는 어떤 체크리스트인지 + 어떤 모달을 킬지를 결정해준다. -->
          <div @click="realSelectChecklist(checklist)" class="checklist-header">
            {{ checklist.title }}
          </div>
  
          <!-- 선택 버튼: 수정 모드/삭제 모드에 따라 동작
                -> 수정, 삭제모드시에만 버튼이 보이고 클릭시 이벤트도 어떤 모드인지에 따라 다르다. -->
          <button
            v-if="isSelecting"
            class="select-button"
            @click="isEditing ? openEditModal(checklist) : (isDeleting ? confirmDelete(checklist) : selectChecklist(checklist))"
          >
            선택
          </button>
  
          
          <!-- 
            isModalOpen이 true인 경우에만 ChecklistDetailModal이 열린다.
            위에서 realSelectChecklist 이벤트가 발생할 경우 띄워지는 모달창이고 체크리스트 상세모달창을 띄운다.
            체크리스트의 정보(제목, 업무 등)들을 가지고 있어야하기 때문에 checklist="selectedChecklist"로 props 문법을 써서 정보를 자식(detailModal)으로 넘겨준다. 
            아직도 헷갈리지만 자식에게 넘겨주는 부모의 변수명은 오른쪽(selectedChecklist)이고 자식이 받는 변수는(checklist) 이다.
            const props = defineProps({
                checklist: {
                type: Object,
                required: true,
                }
            }); -> 자식은 이런식으로 사용하게된다.
          -->
          <ChecklistDetailModal
            v-if="isModalOpen"
            :checklist="selectedChecklist"
            @close="closeModal"
          />
  
          <!-- 
            이는 수정모드인 경우 "선택" 버튼을 누를 때 발생하는 모달창이다. 선택된 체크리스트 정보(selectedChecklist)와 
            수정해야하므로 존재하는 tasks 중에 추가하거나 삭제해야하기 때문에 tasks로 현재 존재하는 tasks 정보도 같이 보내준다.
            @close, @save 이벤트를 통해 모달창 닫기, 수정된 정보 저장 메서드를 수행할 수 있다.
          -->
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
  