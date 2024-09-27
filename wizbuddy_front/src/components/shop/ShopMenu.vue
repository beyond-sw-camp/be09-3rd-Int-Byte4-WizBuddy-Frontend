<template>
      <div class="store-list">
      <div v-for="store in stores" :key="store.id" class="store-card">
        <div class="store-header">
          <img src="@/assets/icons/shop/store-icon.svg" alt="Store Icon" class="store-icon">
          <p class="store-name">{{ store.name }}</p>
        </div>
        <div class="store-info">
            <button class="store-option" v-for="option in store.options" :key="option"> <!-- @click="navigateTo(option) 붙여야함 -->
                {{ option }}
            </button>
        </div>
        <button class="invite-button">초대</button>
      </div>
    </div>
  </template>
    
  <script setup>
    import { useRouter } from 'vue-router';

    const stores = [
    {
      id: 1,
      name: '1번 매장',
      options: ['근무일정 조회', '체크리스트 조회', '업무 조회', '게시판 조회'],
    },
    // {
    //   id: 2,
    //   name: '2번 매장',
    //   options: ['근무일정 조회', '체크리스트 조회', '업무 조회', '게시판 조회'],
    // },
  ];

  const router = useRouter();

  // 매장 별 근무일정, 체크리스트 ... 조회
//   const navigateTo = (option) => {  
//     switch (option) {
//         case '근무일정 조회':
//             router.push('/schedule');
//             break;
//         case '체크리스트 조회':
//             router.push('/checklist');
//             break;
//         case '업무 조회':
//             router.push('/task');
//             break;
//         case '게시판 조회':
//             router.push('/board');

//     }
//   }

  </script>
    
  <style scoped>
  .store-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  
  .store-card {
      position: relative; /* 자식 요소인 초대 버튼을 기준으로 상대 위치 */
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
  
  
  </style>