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

const userType = ref('');
const stores = ref([]);
const isEditMode = ref(false);
const isDeleteMode = ref(false);
const userId = ref('');

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

onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.role) {
    userType.value = storedUser.role;
    userId.value = storedUser.id;
  }
  await fetchStores();
});

function updateEditMode(newMode) {
  isEditMode.value = newMode;
}

function updateDeleteMode(newMode) {
  isDeleteMode.value = newMode;
}

const handleShopRegistered = async (newShop) => {
  await fetchStores(); 
};

const handleStoreDeleted = async (delShop) => {
  await fetchStores();
};

const handleInvitationAccepted = async () => {
  await fetchStores();
};

provide('fetchStores', fetchStores);
provide('handleInvitationAccepted', handleInvitationAccepted);
</script>

<style scoped>
</style>