<template>
  <div class="store-list-container">
    <div class="store-list">
      <div v-for="store in stores" :key="store.id" class="store-card">
        <div class="store-header">
          <img src="@/assets/icons/shop/store-icon.svg" alt="Store Icon" class="store-icon">
          <p class="store-name">{{ store.shop_name }}</p>
        </div>
        <div class="store-info">
          <button class="store-option" v-for="option in storeOptions" :key="option" @click="navigateTo(option, store)">
            {{ option }}
          </button>
        </div>
        <button v-if="userType === 'employer'" @click="openInviteModal(store)" class="invite-button">초대</button>
        <button v-if="isEditMode" @click="() => { selectStore(store); openEditModal(store); }" class="select-button">선택</button>
        <button v-if="isDeleteMode" @click="deleteStore(store)" class="delete-button">삭제</button>
      </div>
    </div>
  </div>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <shopEdit :store="selectedStore" :fetchStores="fetchStores" @submit="handleEditSubmit" @close="closeModal" />
  </Modal>
  <InviteModal 
    v-if="isInviteModalOpen" 
    :store="selectedStore" 
    @close="closeInviteModal" 
    @invite="inviteEmployee" 
  />  
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/shop/Modal.vue'; 
import shopEdit from '@/components/shop/modal/shopEdit.vue';
import InviteModal from '@/components/shop/modal/InviteModal.vue';

const emit = defineEmits(['shop-registered', 'store-selected', 'store-deleted']);

const props = defineProps({
  userType: String,
  stores: Array,
  isEditMode: Boolean,
  isDeleteMode: Boolean,
  fetchStores: Function
});

const isModalOpen = ref(false);
const isInviteModalOpen = ref(false);
const selectedStore = ref(null);

const router = useRouter();

const storeOptions = ['근무일정 조회', '체크리스트 조회', '업무 조회', '게시판 조회'];

function openEditModal(store) {
  selectedStore.value = { ...store }; 
  isModalOpen.value = true; 
}

function closeModal() {
  isModalOpen.value = false;
}

function openInviteModal(store) {
  selectedStore.value = store;
  isInviteModalOpen.value = true;
}

function closeInviteModal() {
  isInviteModalOpen.value = false;
  selectedStore.value = null;
}

function handleEditSubmit(newShop) {
  emit('shop-registered', newShop);
  props.fetchStores();
  closeModal();
}

function selectStore(store) {
  emit('store-selected', store);
}

async function deleteStore(store) {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      const shopResponse = await fetch(`http://localhost:8080/shop/${store.id}`);
      const shopData = await shopResponse.json();

      if (shopData.employees && shopData.employees.length > 0) {
        const employeeUpdates = shopData.employees.map(async (employeeId) => {
          const employeeResponse = await fetch(`http://localhost:8080/users/${employeeId}`);
          const employeeData = await employeeResponse.json();

          employeeData.employedAt = (employeeData.employedAt || []).filter(id => id !== store.id);

          return fetch(`http://localhost:8080/users/${employeeId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employedAt: employeeData.employedAt }),
          });
        });

        await Promise.all(employeeUpdates);
      }

      const deleteResponse = await fetch(`http://localhost:8080/shop/${store.id}`, {
        method: 'DELETE'
      });

      if (deleteResponse.ok) {
        alert('매장이 삭제되었습니다.');
        props.fetchStores();
        emit('store-deleted', store);
      } else {
        throw new Error('매장 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert(error.message || '삭제 중 오류가 발생했습니다.');
    }
  }
}

async function inviteEmployee(email) {
  try {
    const userResponse = await fetch(`http://localhost:8080/users?email=${email}`);
    const users = await userResponse.json();
    
    if (users.length === 0) {
      alert('해당 이메일의 사용자를 찾을 수 없습니다.');
      return;
    }
    
    const user = users[0];
    
    user.invitations = user.invitations || [];
    user.invitations.push({
      shopId: selectedStore.value.id,
      shopName: selectedStore.value.shop_name
    });
    
    await fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invitations: user.invitations })
    });
    
    selectedStore.value.invitations = selectedStore.value.invitations || [];
    selectedStore.value.invitations.push({
      userId: user.id,
      status: 'pending'
    });
    
    await fetch(`http://localhost:8080/shop/${selectedStore.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invitations: selectedStore.value.invitations })
    });

    alert('초대가 전송되었습니다.');
    closeInviteModal();
  } catch (error) {
    console.error('Error:', error);
    alert('초대 전송 중 오류가 발생했습니다.');
  }
}

const navigateTo = (option, store) => {
  // 클릭한 매장의 id를 localStorage에 저장
  localStorage.setItem('shop', JSON.stringify(store));
  console.log(store);
  
  // 원하는 페이지로 이동
  switch (option) {
    case '근무일정 조회':
      router.push({ path: '/schedule', query: { shopId: store.id } }); // 스케줄 화면으로 이동
      break;
    case '체크리스트 조회':
      router.push({ path: '/checklist', query: { shopId: store.id } }); // 체크리스트에 shopId 전달
      break;
    case '업무 조회':
      router.push({ path: '/task', query: { shopId: store.id } }); // 업무 조회에 shopId 전달
      break;
    case '게시판 조회':
      router.push({ path: '/noticeboard', query: { shopId: store.id } }); // 게시판 조회에 shopId 전달
      break;
  }
};
</script>

<style scoped>
.store-list-container {
  max-height: calc(100vh - 121.6px); 
  min-height: calc(100vh - 121.6px);
  overflow-y: auto;
}
.store-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
}

.store-card {
  position: relative;
  padding: 30px 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.store-header {
  position: absolute;
  top: -20px;
  left: 20px;
  display: flex;
  align-items: center;
  background-color: #FEEB7A;
  padding: 5px 50px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.store-icon {
  margin-left: 10px;
  width: 20px;
  height: 20px; 
}

.store-name {
  font-size: 16px;
  font-weight: bold;
}

.store-info {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.store-option {
  font-size: 14px;
  border: none;
  margin: 0 20px;
  background-color: transparent;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.invite-button {
  position: absolute;
  right: 10px;
  bottom: -10px;
  background-color: #45539D;
  color: white;
  border-radius: 20px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.invite-button:hover {
  background-color: #34488C;
}

.select-button, .delete-button {
  position: absolute;
  right: 10px; 
  top: -10px;
  background-color: #cdd0dcf3;
  color: white;
  border-radius: 20px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.select-button:hover, .delete-button:hover {
  background-color: #cdd0dc;
}
</style>
