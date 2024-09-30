<template>
  <div class="checklist-list-page">
    <aside class="left-side">
      <TaskTab />
      <ChecklistSideMenu
        :tasks="filteredTasks" 
        :selectedChecklist="selectedChecklist"
        @add-checklist="addChecklist"
        @trigger-mode="handleMode"
      />
    </aside>

    <div class="main-content">
      <h1>체크리스트 목록</h1>
      <div class="checklist-grid">
        <div v-for="checklist in checklists" :key="checklist.id" class="checklist-card">
          <div class="checklist-card-content" @click="realSelectChecklist(checklist)">
            <h3>{{ checklist.title }}</h3>
            <p>항목 수: {{ checklist.tasks ? checklist.tasks.length : 0 }}</p>
          </div>
          <button
            v-if="isSelecting"
            class="select-button"
            @click="isEditing ? openEditModal(checklist) : (isDeleting ? confirmDelete(checklist) : selectChecklist(checklist))"
          >
            {{ isEditing ? '수정' : (isDeleting ? '삭제' : '선택') }}
          </button>
        </div>
      </div>

      <ChecklistDetailModal
        v-if="isModalOpen"
        :checklist="selectedChecklist"
        @close="closeModal"
      />

      <EditModal
        v-if="isEditModalOpen"
        :checklist="selectedChecklist"
        :tasks="filteredTasks" 
        @close="closeEditModal"
        @save="handleSaveEdit"
      />
    </div>

    <aside class="right-side">
      <UserProfileMenu />
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TaskTab from '@/components/task/TaskTab.vue';
import UserProfileMenu from '@/components/UserProfileMenu.vue';
import ChecklistSideMenu from '@/components/checklist/ChecklistSideMenu.vue';
import ChecklistDetailModal from '@/components/checklist/modal/ChecklistDetailModal.vue';
import EditModal from '@/components/checklist/modal/ChecklistEditModal.vue';

const checklists = ref([]);
const tasks = ref([]);
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedChecklist = ref(null);
const isSelecting = ref(false);
const isEditing = ref(false);
const isDeleting = ref(false);
const shop = JSON.parse(localStorage.getItem('shop'));
const shopId = shop?.id || null; // shop 정보가 없으면 null 처리

onMounted(async () => {
  console.log(shop);
  console.log(shopId);

  if (shopId) {
    try {
      // 모든 체크리스트 데이터 가져오기
      const checklistResponse = await fetch('http://localhost:8080/checklists');
      const allChecklists = await checklistResponse.json();

      // 해당 shopId에 맞는 체크리스트 필터링
      checklists.value = allChecklists.filter(checklist => checklist.shopId === shopId);

      // 모든 업무 데이터 가져오기
      const taskResponse = await fetch('http://localhost:8080/tasks');
      tasks.value = await taskResponse.json();

      console.log('Filtered Checklists:', checklists.value);
      console.log('Tasks:', tasks.value);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
    }
  } else {
    console.error('로컬 스토리지에서 shop 정보를 가져올 수 없습니다.');
  }
});

// shopId에 해당하는 task만 필터링
const filteredTasks = computed(() => {
  return tasks.value.filter(task => task.shopId === shopId);
});

// 모드 관리
const handleMode = (mode) => {
  if (mode === 'normal') {
    isSelecting.value = false;
    isEditing.value = false;
    isDeleting.value = false;
    selectedChecklist.value = null;
  } else if (mode === 'edit') {
    isSelecting.value = true;
    isEditing.value = true;
    isDeleting.value = false;
    selectedChecklist.value = null;
  } else if (mode === 'delete') {
    isSelecting.value = true;
    isDeleting.value = true;
    isEditing.value = false;
    selectedChecklist.value = null;
  }
};

// 체크리스트 선택
const realSelectChecklist = (checklist) => {
  selectedChecklist.value = checklist;
  isModalOpen.value = true;
};

// 체크리스트 선택 및 처리
const selectChecklist = (checklist) => {
  selectedChecklist.value = selectedChecklist.value === checklist ? null : checklist;
};

// 삭제 확인
const confirmDelete = (checklist) => {
  if (window.confirm("정말로 이 체크리스트를 삭제하시겠습니까?")) {
    deleteChecklist(checklist);
  }
};

const deleteChecklist = async (checklist) => {
  try {
    // 1. 삭제된 체크리스트를 checklistPast에 저장
    await saveToChecklistPast(checklist);

    // 2. 체크리스트를 삭제
    const deleteResponse = await fetch(`http://localhost:8080/checklists/${checklist.id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      throw new Error('체크리스트 삭제 실패');
    }

    // 3. 로컬 상태에서 체크리스트 제거
    const index = checklists.value.findIndex(c => c.id === checklist.id);
    if (index !== -1) {
      checklists.value.splice(index, 1);
    }

    alert("체크리스트가 삭제되었고, 과거 기록에 저장되었습니다.");
  } catch (error) {
    console.error('삭제 중 오류 발생:', error);
    alert("체크리스트 삭제 중 오류가 발생했습니다.");
  }
};

const saveToChecklistPast = async (checklist) => {
  try {
    const currentDate = new Date().toISOString();
    const pastChecklist = {
      ...checklist,
      deletedAt: currentDate
    };

    const saveResponse = await fetch('http://localhost:8080/checklistsPast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pastChecklist),
    });

    if (!saveResponse.ok) {
      throw new Error('과거 체크리스트 저장 실패');
    }
  } catch (error) {
    console.error('과거 체크리스트 저장 중 오류 발생:', error);
    throw error;
  }
};

// 수정 모달 열기
const openEditModal = (checklist) => {
  selectedChecklist.value = checklist;
  isEditModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};

// 수정 모달 닫기
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// 체크리스트 추가
const addChecklist = (newChecklist) => {
  checklists.value.push(newChecklist);
};

// 수정된 체크리스트 저장
const handleSaveEdit = (updatedChecklist) => {
  const index = checklists.value.findIndex(c => c.id === updatedChecklist.id);
  if (index !== -1) {
    checklists.value.splice(index, 1, updatedChecklist);
  }
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
    margin-left : 20px;
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
  padding: 20px;
  cursor: pointer;
}

.checklist-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.checklist-card p {
  margin: 0;
  color: #666;
}

.select-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background-color: #0056b3;
}

h1 {
  text-align: center;
  margin: 20px 0;
  color: #333;
}

.right-side {
  width: 20%;
  padding: 20px;
}
</style>