<template>
  <div class="profile-container">
    <div class="profile-info">
      <img class="profile-image" src="@/assets/icons/default-profile-img.svg" alt="Profile Image" />
      <p class="profile-name">{{ userName }}</p>
      <p class="profile-email">{{ userEmail }}</p>
    </div>
    <div class="profile-menu">
      <button class="profile-button">
        <img src="@/assets/icons/right-profile-notice-button.svg" alt="notice-button" />
      </button>
      <button class="profile-button">
        <img src="@/assets/icons/right-profile-calendars-button.svg" alt="calendars-button" />
      </button>
      <button class="profile-button">
        <img src="@/assets/icons/right-profile-manual-button.svg" alt="manual-button" />
      </button>
      <button class="profile-button">
        <img src="@/assets/icons/right-profile-todos-button.svg" alt="todos-button" />
      </button>
    </div>
    <div v-if="invitations.length > 0" class="invitations-list">
      <h3>초대 목록</h3>
      <ul>
        <li v-for="invite in invitations" :key="invite.shopId">
          {{ invite.shopName }}에서 초대했습니다.
          <button @click="acceptInvitation(invite)">수락</button>
          <button @click="rejectInvitation(invite)">거절</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const userName = ref('');
const userEmail = ref('');
const invitations = ref([]);
const userId = ref('');

const fetchStores = inject('fetchStores');
const handleInvitationAccepted = inject('handleInvitationAccepted');

onMounted(async () => {
  const loginUser = localStorage.getItem('user');
  if (loginUser) {
    const user = JSON.parse(loginUser);
    userName.value = user.name;
    userEmail.value = user.email;
    userId.value = user.id;
    await fetchInvitations();
  }
});

async function fetchInvitations() {
  const response = await fetch(`http://localhost:8080/users/${userId.value}`);
  const userData = await response.json();
  invitations.value = userData.invitations || [];
}

async function acceptInvitation(invite) {
  try {
    const userResponse = await fetch(`http://localhost:8080/users/${userId.value}`);
    const userData = await userResponse.json();

    userData.employedAt = userData.employedAt || [];
    if (!userData.employedAt.includes(invite.shopId)) {
      userData.employedAt.push(invite.shopId);
    }

    await fetch(`http://localhost:8080/users/${userId.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employedAt: userData.employedAt,
        invitations: userData.invitations.filter(inv => inv.shopId !== invite.shopId),
      }),
    });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    storedUser.employedAt = userData.employedAt;
    localStorage.setItem('user', JSON.stringify(storedUser));

    const shopResponse = await fetch(`http://localhost:8080/shop/${invite.shopId}`);
    const shopData = await shopResponse.json();

    shopData.employees = shopData.employees || [];
    if (!shopData.employees.includes(userId.value)) {
      shopData.employees.push(userId.value);
    }

    await fetch(`http://localhost:8080/shop/${invite.shopId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employees: shopData.employees,
        invitations: shopData.invitations.filter(inv => inv.userId !== userId.value),
      }),
    });

    await fetchInvitations();
    if (fetchStores) {
      await fetchStores(); // 매장 정보를 다시 불러옵니다.
    }
    if (handleInvitationAccepted) {
      await handleInvitationAccepted(); // 초대 수락 후 필요한 처리를 실행합니다.
    }
    alert('초대를 수락했습니다.');
  } catch (error) {
    console.error('Error:', error);
    alert('초대 수락 중 오류가 발생했습니다.');
  }
}

async function rejectInvitation(invite) {
  try {
    const response = await fetch(`http://localhost:8080/invitations/${invite.shopId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId.value }),
    });

    if (response.ok) {
      await fetchInvitations();
      alert('초대를 거절했습니다.');
    } else {
      throw new Error('초대 거절에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f7fa;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
}

.profile-info {
  margin-top: 50px;
  margin-bottom: 20px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}

.profile-email {
  font-size: 14px;
  color: #888;
}

.profile-menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.profile-button {
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-button:hover {
  background-color: #ddd;
}

.invitations-list {
  margin-top: 20px;
  text-align: left;
}

.invitations-list ul {
  list-style-type: none;
  padding: 0;
}

.invitations-list li {
  margin-bottom: 10px;
}

.invitations-list button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #45539d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.invitations-list button:last-child {
  background-color: #ccc;
}
</style>
