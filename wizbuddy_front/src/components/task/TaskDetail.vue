<template>
    <div class="task-detail">
        <div class="form-group">
            <label>업무 제목</label>
            <input type="text" v-model="task.title" readonly class="form-control" />
        </div>

        <div class="form-group">
            <label>세부 내용</label>
            <textarea v-model="task.content" readonly class="form-control"></textarea>
        </div>

        <div class="form-group inline-group">
            <label>고정</label>
            <div class="fixed-indicator" :class="{ 'fixed': task.isFixed }"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.task-detail {
    background-color: #f4f4f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.inline-group {
    display: flex;
    align-items: center;
}

label {
    display: inline-block;
    margin-right: 10px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

input[readonly],
textarea[readonly] {
    background-color: #e9ecef;
}

.fixed-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    display: inline-block;
}

.fixed-indicator.fixed {
    background-color: red;
    border-color: red;
}
</style>
