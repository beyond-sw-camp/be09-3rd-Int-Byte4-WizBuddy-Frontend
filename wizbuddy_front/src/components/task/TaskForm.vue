<template>
    <div class="task-form">
        <div class="form-group">
            <label for="title">업무 제목</label>
            <input type="text" id="title" v-model="localTask.title" placeholder="업무 제목을 입력하세요" required />
        </div>

        <div class="form-group">
            <label for="content">세부 내용</label>
            <textarea id="content" v-model="localTask.content" placeholder="업무의 세부 내용을 입력하세요" required></textarea>
        </div>

        <div class="form-group">
            <label>고정</label>
            <input type="checkbox" v-model="localTask.isFixed" />
        </div>

        <button class="submit-button" @click="submitTask">{{ submitButtonLabel }}</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    task: {
        type: Object,
        default: () => ({
            title: '',
            content: '',
            isFixed: false,
        }),
    },
    submitButtonLabel: {
        type: String,
        default: '등록',
    },
});

const emit = defineEmits(['submitTask']);

const localTask = ref({ ...props.task });

watch(
    () => props.task,
    (newTask) => {
        localTask.value = { ...newTask };
    },
    { deep: true }
);

const submitTask = () => {
    if (!localTask.value.title.trim() || !localTask.value.content.trim()) {
        alert("업무 제목과 세부내용을 작성해주세요");
        return;
    }
    emit('submitTask', { ...localTask.value });
};
</script>

<style scoped>
.task-form {
    background-color: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: bold;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}

input[type="checkbox"] {
    transform: scale(1.5);
    margin-right: 10px;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #218838;
}
</style>