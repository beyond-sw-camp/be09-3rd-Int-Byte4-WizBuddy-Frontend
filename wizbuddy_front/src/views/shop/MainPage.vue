<template>
  <SideMenu @toggle-edit-mode="updateEditMode" @toggle-delete-mode="updateDeleteMode">
    <ShopMenu 
      :userType="userType" 
      :stores="stores" 
      :isEditMode="isEditMode" 
      :isDeleteMode="isDeleteMode" 
      :fetchStores="fetchStores" 
      @shop-registered="handleShopRegistered" 
      @store-deleted="handleStoreDeleted" 
    />
  </SideMenu>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import ShopMenu from '@/components/shop/ShopMenu.vue';

const userType = ref(''); // 유저 타입 (employer, employee, admin 등)
const stores = ref([]); // 매장 목록
const isEditMode = ref(false); // 수정 모드 상태
const isDeleteMode = ref(false); // 삭제 모드 상태
const userId = ref(''); // 현재 유저의 ID

// 매장 목록 가져오기 함수
async function fetchStores() {
  try {
    const userResponse = await fetch(`http://localhost:8080/users/${userId.value}`);
    const userData = await userResponse.json();

    if (userType.value === 'employer') {
      // 사장 -> 자신의 매장만 가져옴
      const response = await fetch(`http://localhost:8080/shop?employer_code=${userId.value}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      stores.value = data;
    } else if (userType.value === 'employee') {
      // 직원 -> employedAt에 있는 매장id를 이용해 본인이 일하는 매장만 가져옴
      const employedAt = userData.employedAt || [];
      if (employedAt.length === 0) {
        stores.value = [];
        return;
      }
      const promises = employedAt.map(shopId => 
        fetch(`http://localhost:8080/shop/${shopId}`).then(res => res.json())
      );
      const shopData = await Promise.all(promises);
      stores.value = shopData.filter(shop => shop !== null);
    } else {
      stores.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    stores.value = [];
  }
}

// 컴포넌트가 마운트될 때 유저 정보와 매장 데이터를 가져옴
onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.role) {
    userType.value = storedUser.role;
    userId.value = storedUser.id;
  }
  await fetchStores();
});

// 수정 모드 업데이트
function updateEditMode(newMode) {
  isEditMode.value = newMode;
}

// 삭제 모드 업데이트
function updateDeleteMode(newMode) {
  isDeleteMode.value = newMode;
}

// 매장 등록 후 처리
const handleShopRegistered = async (newShop) => {
  await fetchStores(); 
};

// 매장 삭제 후 처리
const handleStoreDeleted = async (delShop) => {
  await fetchStores();
};

// 초대 수락 후 처리
const handleInvitationAccepted = async () => {
  await fetchStores();
};

// 다른 컴포넌트에서 사용 가능한 함수 제공
provide('fetchStores', fetchStores);
provide('handleInvitationAccepted', handleInvitationAccepted);
</script>

<style scoped>
</style>
