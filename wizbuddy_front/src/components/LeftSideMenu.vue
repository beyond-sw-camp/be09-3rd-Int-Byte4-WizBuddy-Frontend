<template>
  <div class="sidemenu">
    <!-- 스케줄 관련 버튼들 -->
    <button class="side-tab-item" @click="openScheduleRegisterModal" v-if="isScheduleMainPage">스케줄 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToScheduleDelete')" v-if="isScheduleMainPage">삭제</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToRegisterEmployee')" v-if="isScheduleMainPage">직원 등록</button>
    <button class="side-tab-item" @click="setActiveTab('navigateToScheduleMain')" v-if="isScheduleRegisterPage || isScheduleDeletePage">완료</button>

    <!-- 스케줄 등록 모달 -->
    <ScheduleRegister v-if="isRegisterModalOpen" :isOpen="isRegisterModalOpen" @close="closeScheduleRegisterModal" @submit="handleScheduleSubmit" />

    <!-- 매장 관련 버튼들 -->
    <div class="shop-side" v-if="isMainPage">
      <button class="side-tab-item" @click="openShopRegistModal">등록</button>
      <button class="side-tab-item" @click="toggleEditMode">{{ isEditMode ? '완료' : '수정' }}</button>
      <button class="side-tab-item" @click="toggleDeleteMode">{{ isDeleteMode ? '완료' : '삭제' }}</button>
    </div>

    <!-- 매장 등록 모달 -->
    <Modal :isOpen="isShopRegistModalOpen" @close="closeShopRegistModal">
      <shopRegist @submit="handleShopRegistSubmit" @close="closeShopRegistModal" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScheduleRegister from '@/components/schedule/modal/ScheduleRegisterModal.vue';
import Modal from '@/components/shop/Modal.vue';
import shopRegist from '@/components/shop/modal/shopRegist.vue';

const router = useRouter();
const route = useRoute();

// emit 이벤트 설정
const emit = defineEmits(['toggle-edit-mode', 'toggle-delete-mode']);

// 상태 변수
const isEditMode = ref(false);
const isDeleteMode = ref(false);
const isScheduleMainPage = ref(false);
const isScheduleRegisterPage = ref(false);
const isScheduleDeletePage = ref(false);
const isMainPage = ref(false);
const isRegisterModalOpen = ref(false);
const isShopRegistModalOpen = ref(false);
const shopId = ref(route.query.shopId || null);

// 수정 모드 토글 함수
function toggleEditMode() {
  isEditMode.value = !isEditMode.value;
  emit('toggle-edit-mode', isEditMode.value); // 부모에게 emit 이벤트 전달
}

// 삭제 모드 토글 함수
function toggleDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;
  emit('toggle-delete-mode', isDeleteMode.value); // 부모에게 emit 이벤트 전달
}

// 라우트 경로 감시
watch(() => route.path, (newPath) => {
  isScheduleMainPage.value = newPath === '/schedule';
  isScheduleRegisterPage.value = newPath === '/schedule/regist';
  isScheduleDeletePage.value = newPath === '/schedule/delete';
  isMainPage.value = newPath === '/main';
}, { immediate: true });

// 모달 관련 함수
function openScheduleRegisterModal() {
  isRegisterModalOpen.value = true;
}

function closeScheduleRegisterModal() {
  isRegisterModalOpen.value = false;
}

function openShopRegistModal() {
  isShopRegistModalOpen.value = true;
}

function closeShopRegistModal() {
  isShopRegistModalOpen.value = false;
}

// 스케줄 등록 처리 함수
function handleScheduleSubmit(schedule) {
  console.log('등록된 스케줄:', schedule);
  closeScheduleRegisterModal();
}

// 매장 등록 처리 함수
function handleShopRegistSubmit(storeData) {
  fetchStores();
  closeShopRegistModal();
}

// 탭 변경 처리
const setActiveTab = (tab) => {
  const query = shopId.value ? { shopId: shopId.value } : {};

  switch (tab) {
    case 'navigateToScheduleDelete':
      router.push({ path: '/schedule/delete', query });
      break;
    case 'navigateToScheduleMain':
      router.push({ path: '/schedule', query });
      break;
    case 'navigateToRegisterEmployee':
      router.push({ path: '/schedule/regist', query });
      break;
  }
};

// shopId 감시
watch(() => route.query.shopId, (newShopId) => {
  shopId.value = newShopId;
});

// 매장 목록 불러오기 함수
async function fetchStores() {
  try {
    const response = await fetch('http://localhost:8080/shop');
    const stores = await response.json();
    console.log('Fetched stores:', stores);
  } catch (error) {
    console.error('매장 목록을 불러오는 중 오류 발생:', error);
  }
}

// 초기 매장 목록 불러오기
onMounted(() => {
  fetchStores();
});
</script>

<style scoped>
.sidemenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:end;
  width: 100%;
  background: #f3f7fa;
}

.shop-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.side-tab-item {
  padding: 10px 10px;
  font-size: 14px;
  width: 50%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-top: 20px;
  cursor: pointer;
}

.shop-side .side-tab-item {
  padding: 10px 10px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  width: 70px;
  height: 50px; 
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease; 
}

.side-tab-item:hover {
  background-color: #f0f0f0;
}
</style>
