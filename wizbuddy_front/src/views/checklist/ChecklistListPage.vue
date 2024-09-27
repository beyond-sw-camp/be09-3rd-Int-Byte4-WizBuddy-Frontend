<template>
    <div class="checklist-list-page">
        <h1>체크리스트 목록</h1>
        <div v-for="checklist in checklists" :key="checklist.id">
            <ChecklistItem :checklist="checklist" />
        </div>
    </div>
</template>

<script setup>
import ChecklistItem from '@/components/checklist/ChecklistItem.vue'
import { ref } from 'vue'

// 체크리스트 목록 더미 데이터
const checklists = ref([
    {
        id: 1,
        title: '9월 16일 1T 필독',
        tasks: [
            { id: 1, number: 1, title: '첫 번째 업무', content: '화장실 청소', isFixed: true },
            { id: 2, number: 2, title: '두 번째 업무', content: '매장 정리', isFixed: false },
            { id: 3, number: 3, title: '세 번째 업무', content: '커피 머신 청소', isFixed: true },
        ]
    },
    {
        id: 2,
        title: '9월 17일 2T 필독',
        tasks: [
            { id: 1, number: 1, title: '첫 번째 업무', content: '물건 정리', isFixed: false },
            { id: 2, number: 2, title: '두 번째 업무', content: '서류 정리', isFixed: true }
        ]
    }
]);
</script>

<style scoped>
.checklist-list-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}
</style>
