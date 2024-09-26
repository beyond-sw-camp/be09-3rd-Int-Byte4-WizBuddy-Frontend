<template>
    <header class="header">
      <div class="top-bar">
        <div class="left-section">
          <img src="@/assets/icons/wizbuddy_logo.svg" alt="Wiz Buddy Logo" class="logo-img" />
        </div>
        <div class="right-section">
          <p>알바생 {{ username }}님, 환영합니다.</p>
          <img src="@/assets/icons/Profile.svg" alt="Profile" class="profile-img" />
        </div>
      </div>
  
      <nav class="tabs">
      <button class="tabbutton" :class="{ active: activeTab === 'schedule' }" @click="setActiveTab('schedule')">근무일정</button>
      <button class="tabbutton" :class="{ active: activeTab === 'checklist' }" @click="setActiveTab('checklist')">체크리스트</button>
      <button class="tabbutton" :class="{ active: activeTab === 'noticeboard' }" @click="setActiveTab('noticeboard')">공지사항 게시판</button>
      <button class="tabbutton" :class="{ active: activeTab === 'manualboard' }" @click="setActiveTab('manualboard')">매뉴얼 게시판</button>
      <button class="tabbutton" :class="{ active: activeTab === 'subsboard' }" @click="setActiveTab('subsboard')">대타 게시판</button>
    </nav>
    </header>
  </template>


<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 현재 활성화된 탭을 저장하는 상태 관리 변수
const activeTab = ref(''); // 초기값은 빈 값으로 설정

// 탭을 변경하는 함수
function setActiveTab(tab) {
  activeTab.value = tab;

  // 페이지에 맞는 경로로 이동
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

// 현재 경로에 따라 activeTab을 업데이트하는 함수
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

// 컴포넌트가 마운트되거나 라우트가 변경될 때마다 activeTab을 업데이트
onMounted(() => {
  updateActiveTabFromRoute();
});

watchEffect(() => {
  updateActiveTabFromRoute();
});

</script>
  
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  background-color: #3A4E8B;
  color: white;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid white;
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
  gap: 20px; /* 버튼들 사이의 간격 설정 */
  background-color: white;
  padding: 10px 0;
}

.tabbutton {
  background-color: white;
  color: black;
  border: none;
  transition: background-color 0.3s, color 0.3s;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  width: 140px;
  height: 40px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center; /* 상하 중앙 정렬 */
  text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.tabbutton:first-child {
  margin-left: 20px;
}

.tabbutton:hover {
  background-color: #f0f0f0;
}

.tabbutton.active {
  background-color: #45539D; /* 파란색 배경 */
  color: white; /* 글자 색상 */
  border-radius: 20px; /* 둥근 모서리 */
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 그림자 추가로 입체감 */
}


</style>