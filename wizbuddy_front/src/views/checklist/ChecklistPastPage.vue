<template>
    <div class="checklist-list-page">
      <aside class="left-side">
        <TaskTab />
      </aside>
  
        <div class="main-content">
        <h1>체크리스트 이력 목록</h1>
        <div class="checklist-grid">
            <div v-for="checklist in checklists" :key="checklist.id" class="checklist-card">
            <div class="checklist-card-content" @click="selectChecklist(checklist)">
                <h3>{{ checklist.title }}</h3>
                <p>항목 수: {{ checklist.tasks ? checklist.tasks.length : 0 }}</p>
                <p class="deleted-at">
                삭제일: {{ formatDate(checklist.deletedAt) }}
                <span >{{ formatTime(checklist.deletedAt) }}</span>
                </p>
            </div>
            </div>
        </div>
        </div>
  
      <aside class="right-side">
        <UserProfileMenu />
      </aside>
  
      <ChecklistDetailModal
        v-if="isModalOpen"
        :checklist="selectedChecklist"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import TaskTab from '@/components/task/TaskTab.vue';
  import UserProfileMenu from '@/components/UserProfileMenu.vue';
  import ChecklistSideMenu from '@/components/checklist/ChecklistSideMenu.vue';
  import ChecklistDetailModal from '@/components/checklist/modal/ChecklistDetailModal.vue';
  
  const checklists = ref([]);
  const isModalOpen = ref(false);
  const selectedChecklist = ref(null);
  
  onMounted(async () => {
    try {
      // 체크리스트 이력 데이터 가져오기
      const checklistResponse = await fetch('http://localhost:8080/checklistsPast');
      checklists.value = await checklistResponse.json();
  
      console.log('Checklist History:', checklists.value);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
    }
  });
  
  // 체크리스트 선택
  const selectChecklist = (checklist) => {
    selectedChecklist.value = checklist;
    isModalOpen.value = true;
  };
  
  // 모달 닫기
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // 날짜 포맷 함수
  const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

// 시간 포맷 함수
const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString('ko-KR', options);
};
  </script>
  
  <style scoped>
  .checklist-list-page {
    display: flex;
    min-height: calc(100vh - 151.6px);
    background-color: #F3F7FA;
    padding: 0 20px;
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
    padding: 20px;
  }
  
  .checklist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .checklist-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .checklist-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .checklist-card-content {
  padding: 15px;
  cursor: pointer;
}

.checklist-card h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
}

.checklist-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
  
  h1 {
    text-align: center;
    margin: 20px 0;
    color: #333;
  }
  

  .divider {
  width: 100%;
  border: none;
  border-top: 1px dashed #ccc;
  margin: 10px 0;
}

.deleted-at {
  margin-top: 8px;
  font-size: 13px;
  color: #888;
  line-height: 1.2;
}

/* .delete-time {
  color: #aaa;
} */

  .right-side {
    width: 20%;
    padding: 20px;
  }

  
  </style>