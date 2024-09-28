<template>
    <div class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <h2>체크리스트 수정</h2>
  
        <!-- 체크리스트 제목 -->
        <label for="checklistTitle">체크리스트 제목</label>
        <input v-model="checklistTitle" id="checklistTitle" placeholder="제목을 입력하세요" />
  
        <!-- 고정 업무 구역 -->
        <h3>고정 업무</h3>
        <div class="task-items-container">
          <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
            <div class="task-content">{{ task.content }}</div>
            <button class="remove-task-button" @click="removeTask(task)">x</button>
          </div>
        </div>
  
        <button @click="openFixedTaskModal">고정 업무 추가</button>
  
        <!-- 비고정 업무 구역 -->
        <h3>비고정 업무</h3>
        <div class="task-items-container">
          <div v-for="task in nonFixedTasks" :key="task.id" class="task-item non-fixed-task">
            <div class="task-content">{{ task.content }}</div>
            <button class="remove-task-button" @click="removeTask(task)">x</button>
          </div>
        </div>
  
        <button @click="openNonFixedTaskModal">비고정 업무 추가</button>
  
        <button class="save-button" @click="saveChanges">저장</button>
        <button class="close-button" @click="closeEditModal">닫기</button>
  
        <!-- 고정 업무 추가 모달 -->
        <FixedTaskModal
          v-if="isFixedTaskModalOpen"
          :FixedTasks="availableFixedTasks"
          @close="closeFixedTaskModal"
          @add-task="addFixedTaskToChecklist"
        />
  
        <!-- 비고정 업무 추가 모달 -->
        <NonFixedTaskModal
          v-if="isNonFixedTaskModalOpen"
          :nonFixedTasks="availableNonFixedTasks"
          @close="closeNonFixedTaskModal"
          @add-task="addNonFixedTaskToChecklist"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import FixedTaskModal from '@/components/checklist/modal/FixedTaskModal.vue';
  import NonFixedTaskModal from '@/components/checklist/modal/NonFixedTaskModal.vue';
  
  const props = defineProps({
    checklist: {
      type: Object,
      required: true,
    },
    tasks: { // checklistpage에서 전달받은 전체 tasks 목록 -> 다시 non, fixed로 보내줘야함.
      type: Array,
      required: true,
    }
  });
  
  const emit = defineEmits(['close', 'save']);
  
  // 수정 상태 관리
  const checklistTitle = ref(props.checklist.title);
  
  // 고정 업무와 비고정 업무 구분
  const fixedTasks = computed(() => props.checklist.tasks.filter(task => task.isFixed));
  const nonFixedTasks = computed(() => props.checklist.tasks.filter(task => !task.isFixed));
  
  // 모달 상태 관리
  const isFixedTaskModalOpen = ref(false);
  const isNonFixedTaskModalOpen = ref(false);
  
  // 사용 가능한 고정/비고정 업무 목록 계산
  const availableFixedTasks = computed(() =>
    props.tasks.filter(task => task.isFixed && !fixedTasks.value.some(t => t.id === task.id))
  );
  
  const availableNonFixedTasks = computed(() =>
    props.tasks.filter(task => !task.isFixed && !nonFixedTasks.value.some(t => t.id === task.id))
  );
  
  // 닫기 이벤트
  const closeEditModal = () => {
    emit('close');
  };
  
  // 저장 이벤트
  const saveChanges = () => {
    emit('save', {
      ...props.checklist,
      title: checklistTitle.value,
    });
    closeEditModal();
  };
  
  // 고정/비고정 업무 추가 모달 열기/닫기
  const openFixedTaskModal = () => {
    isFixedTaskModalOpen.value = true;
  };
  
  const closeFixedTaskModal = () => {
    isFixedTaskModalOpen.value = false;
  };
  
  const openNonFixedTaskModal = () => {
    isNonFixedTaskModalOpen.value = true;
  };
  
  const closeNonFixedTaskModal = () => {
    isNonFixedTaskModalOpen.value = false;
  };
  
  // 고정/비고정 업무 추가/제거
  const addFixedTaskToChecklist = (task) => {
    if (!fixedTasks.value.some(t => t.id === task.id)) {
      props.checklist.tasks.push({ ...task, isFixed: true });
    }
  };
  
  const addNonFixedTaskToChecklist = (task) => {
    if (!nonFixedTasks.value.some(t => t.id === task.id)) {
      props.checklist.tasks.push({ ...task, isFixed: false });
    }
  };
  
  const removeTask = (task) => {
    const taskIndex = props.checklist.tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      props.checklist.tasks.splice(taskIndex, 1);
    }
  };
  </script>
  
  <style scoped>
  /* 스타일은 기존과 동일 */
  </style>
  
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
  }
  
  .task-items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .task-item {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  
  .task-content {
    flex-grow: 1;
  }
  
  .remove-task-button {
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .add-task-button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .save-button {
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .close-button {
    background-color: grey;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  