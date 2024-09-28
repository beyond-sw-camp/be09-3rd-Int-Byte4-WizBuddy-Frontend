<template>
    <header class="header">
      <div class="top-bar">
        <div class="left-section">
          <img src="@/assets/icons/wizbuddy_logo.svg" alt="Wiz Buddy Logo" class="logo-img" />
        </div>
        <div class="right-section" v-if="!(isLoginPage|isSignupPage)">
          <p v-if="userRole === 'employer'">사장 {{ userName }}님, 환영합니다.</p>
          <p v-else-if="userRole === 'employee'">알바생 {{ userName }}님, 환영합니다.</p>
          <img src="@/assets/icons/Profile.svg" alt="Profile" class="profile-img" />
        </div>
      </div>
          <nav class="tabs" v-if="!(isMainPage|isLoginPage|isSignupPage)">
            <button class="tabbutton" :class="{ active: activeTab === 'schedule' }" @click="setActiveTab('schedule')">근무일정</button>
            <button class="tabbutton" :class="{ active: activeTab === 'checklist' }" @click="setActiveTab('checklist')">체크리스트</button>
            <button class="tabbutton" :class="{ active: activeTab === 'noticeboard' }" @click="setActiveTab('noticeboard')">공지사항 게시판</button>
            <button class="tabbutton" :class="{ active: activeTab === 'manualboard' }" @click="setActiveTab('manualboard')">매뉴얼 게시판</button>
            <button class="tabbutton" :class="{ active: activeTab === 'subsboard' }" @click="setActiveTab('subsboard')">대타 게시판</button>
          </nav>
    </header>
  </template>
  
  <script setup>
    import {useRoute, useRouter} from 'vue-router';
    import {ref, watch, onMounted, watchEffect} from 'vue';

    const route = useRoute();
    const router = useRouter();
    const isLoginPage = ref(false);
    const isSignupPage = ref(false);
    const isMainPage = ref(false);
    const isSchedulePage = ref(false);
    const isManualBoardPage = ref(false);

    const user = ref(JSON.parse(localStorage.getItem('user')));
    const userName = ref(user.value ? user.value.name : '');
    const userRole = ref(user.value ? user.value.role : '');

    watch(() => route.path, (newPath) => {
      isLoginPage.value = newPath === '/login';
      isSignupPage.value = newPath === '/signup';
      isMainPage.value = newPath === '/main';
      isSchedulePage.value = newPath === '/schedule';
      isManualBoardPage.value = newPath === '/manualboard';
    }
    , 
    {
      immediate: true 
    }
  );

    const activeTab = ref('');

function setActiveTab(tab) {
  activeTab.value = tab;
  switch (tab) {
    case 'schedule':
      router.push('/schedule');
      break;
    case 'checklist':
      router.push('/checklist');
      break;
    case 'noticeboard':
      router.push('/noticeboard');
      break;
    case 'manualboard':
      router.push('/manualboard');
      break;
    case 'subsboard':
      router.push('/subsboard');
      break;
  }
}

function updateActiveTabFromRoute() {
  const path = route.path;
  if (path.includes('schedule')) {
    activeTab.value = 'schedule';
  } else if (path.includes('checklist')) {
    activeTab.value = 'checklist';
  } else if (path.includes('noticeboard')) {
    activeTab.value = 'noticeboard';
  } else if (path.includes('manualboard')) {
    activeTab.value = 'manualboard';
  } else if (path.includes('subsboard')) {
    activeTab.value = 'subsboard';
  }
}

onMounted(() => {
  updateActiveTabFromRoute();
});

watchEffect(() => {
  updateActiveTabFromRoute();
  const loginUser = localStorage.getItem('user');
    if (loginUser) {
      try {
        const parsedUser = JSON.parse(loginUser);
        userName.value = parsedUser.name;
        userRole.value = parsedUser.role;
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
      }
    }
});
  </script>
  
  <style scoped>
  .header {
    display: flex;
    flex-direction: column;
    background-color: #3A4E8B;
    color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .left-section {
    display: flex;
    align-items: center;
  }
  
  .logo-img {
    width: 150px;
    height: auto;
  }

  .right-section {
    display: flex;
    align-items: center;
  }

  .right-section p {
    margin-right: 15px;
    font-size: 16px;
  }

  .profile-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .tabs {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  background-color: white;
  padding: 10px 0;
}

.tabbutton {
  background-color: white;
  color: black;
  border: none;
  font-size: 14px;
  cursor: pointer;
  width: 140px;
  padding: 5px 10px;
  text-align: center;
}

.tabbutton.active {
  background-color: #45539D;
  color: white;
  border-radius: 20px;
  font-weight: bold;
}

.tabbutton:first-child {
  margin-left: 20px;
}
  </style>
  