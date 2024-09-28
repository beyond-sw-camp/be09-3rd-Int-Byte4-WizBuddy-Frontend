<template>
    <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
            <h2>새 체크리스트 등록</h2>

            <label for="title">체크리스트 제목</label>
            <input v-model="newChecklist.title" id="title" placeholder="제목을 입력하세요" />

            <!-- 고정 업무 구역 -->
            <h3>고정 업무</h3>
            <div class="task-list">
                <div v-for="task in fixedTasks" :key="task.id" class="task-item fixed-task">
                    {{ task.content }}
                </div>
            </div>

            <!-- 비고정 업무 추가 버튼 -->
            <button @click="openNonFixedTaskModal">비고정 업무 추가</button>

            <!-- 비고정 업무 추가 모달 -->
            <NonFixedTaskModal
                v-if="isNonFixedTaskModalOpen"
                :nonFixedTasks="availableNonFixedTasksFiltered"
                @close="closeNonFixedTaskModal"
                @add-task="addNonFixedTask"
            /> <!-- available~~ 부분이 이미 추가된 업무를 제외한 비고정 업무 전달 -->

            <!-- 비고정 업무 목록 -->
            <h3>비고정 업무</h3>
            <div class="task-list">
                <div v-for="task in newChecklist.tasks" :key="task.id" class="task-item non-fixed-task">
                    {{ task.content }}
                </div>
            </div>

            <button @click="submit">등록</button>
            <button @click="close">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NonFixedTaskModal from './NonFixedTaskModal.vue';

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});

// 새로운 체크리스트 상태
const newChecklist = ref({
    title: '',
    tasks: [], // 고정 및 비고정 업무가 들어갈 배열
});

// 고정 업무와 비고정 업무 구분
const fixedTasks = computed(() => props.tasks.filter(task => task.isFixed));
const availableNonFixedTasks = computed(() => props.tasks.filter(task => !task.isFixed));
const nonFixedTasks = computed(() => newChecklist.value.tasks); // 현재 선택된 비고정 업무들

// 이미 newChecklist에 추가된 비고정 업무는 제외하고 남은 비고정 업무 목록을 계산
const availableNonFixedTasksFiltered = computed(() =>
    availableNonFixedTasks.value.filter(task => !newChecklist.value.tasks.some(t => t.id === task.id))
);

// // 고정 업무를 초기화 함수에서 체크리스트에 미리 추가
// const initChecklist = () => {
//     fixedTasks.value.forEach(task => {
//         if (!newChecklist.value.tasks.some(t => t.id === task.id)) {
//             newChecklist.value.tasks.push(task); // 고정 업무를 체크리스트에 추가
//         }
//     });
// };

// // 컴포넌트가 마운트되면 고정 업무를 초기화
// onMounted(() => {
//     initChecklist(); // 고정 업무를 체크리스트에 미리 추가
// });

// 비고정 업무 추가 모달 상태
const isNonFixedTaskModalOpen = ref(false);

// 비고정 업무 추가 모달 열기
const openNonFixedTaskModal = () => {
    isNonFixedTaskModalOpen.value = true;
};

// 비고정 업무 추가 모달 닫기
const closeNonFixedTaskModal = () => {
    isNonFixedTaskModalOpen.value = false;
};

// 선택된 비고정 업무 추가
const addNonFixedTask = (task) => {
    // 중복된 업무가 추가되지 않도록 확인
    // if (!newChecklist.value.tasks.some(t => t.id === task.id)) {
    newChecklist.value.tasks.push(task); // 체크리스트에 비고정 업무 추가
    // }
    // 중복체크를 안해도 되게 수정
};

// 새로운 체크리스트 제출
const emit = defineEmits(['submit', 'close']);
const submit = () => {
    if (!newChecklist.value.title || newChecklist.value.tasks.length === 0) {
        alert('체크리스트 제목과 업무를 입력해주세요.');
        return;
    }

    // 등록 시에만 고정 업무를 추가
    fixedTasks.value.forEach(task => {
        if (!newChecklist.value.tasks.some(t => t.id === task.id)) {
            newChecklist.value.tasks.push(task); // 고정 업무 추가
        }
    });

    emit('submit', newChecklist.value); // 부모 컴포넌트로 체크리스트 제출
    close(); // 모달 닫기
};

// 모달 닫기
const close = () => {
    emit('close');
};

</script>



<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.task-list {
    margin-bottom: 30px;
}

.task-items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
}

.task-item {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 150px;
    max-width: calc(50% - 10px);
}

.fixed-task {
    background-color: #fce4ec;
}

.non-fixed-task {
    background-color: #e3f2fd;
}

.task-content {
    font-size: 16px;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
}

.remove-task-button {
    background-color: transparent;
    border: none;
    color: #f44336;
    font-size: 18px;
    cursor: pointer;
}

.remove-task-button:hover {
    color: #d32f2f;
}

.close-button {
    padding: 10px 20px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-button:hover {
    background-color: #2f3a9d;
}

.separator {
    border: none;
    border-top: 2px solid #ccc;
    margin: 30px 0;
}
</style>
