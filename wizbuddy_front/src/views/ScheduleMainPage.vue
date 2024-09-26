<template>
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="prevMonth" class="prev-next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <h2>{{ currentYear }}년 {{ months[currentMonth] }} 스케줄 </h2>
        <button @click="nextMonth" class="prev-next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
  
      <div class="calendar-body">
        <div class="calendar-weekdays">
          <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <!-- 빈 셀 추가 -->
          <div v-for="(blank, index) in blanks" :key="index" class="calendar-day blank"></div>
          
          <!-- 날짜 및 스케줄 표시 -->
          <div 
            v-for="day in daysInMonth"
            :key="day"
            class="calendar-day"
            :class="{ today: isToday(day), selected: day === selectedDay }"
            @click="selectDay(day)"
          >
            <div class="day-number">{{ day }}</div>
            <div class="schedules">
              <!-- 예시 스케줄 데이터 -->
              <div v-for="(schedule, index) in getSchedulesForDay(day)" :key="index" :class="['schedule', schedule.type]">
                {{ schedule.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 현재 날짜를 기준으로 설정
  const currentDate = ref(new Date());
  const currentMonth = ref(currentDate.value.getMonth());
  const currentYear = ref(currentDate.value.getFullYear());
  
  const today = ref(new Date());
  
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  const selectedDay = ref(null);
  
  // 스케줄 데이터 예시
  const scheduleData = [
    { day: 15, title: '유제은, 백경석, 조제훈', type: 'fun' },
    { day: 15, title: '이서현', type: 'important' },
    { day: 15, title: '이나현', type: 'personal' },
    // 다른 스케줄 데이터 추가 가능
  ];
  
  // 특정 날짜의 스케줄을 가져오는 함수
  const getSchedulesForDay = (day) => {
    return scheduleData.filter(schedule => schedule.day === day).slice(0, 2); // 최대 2개의 항목만 반환
  };
  
  // 특정 달의 첫 번째 날과 마지막 날 계산
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1);
  const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);
  
  // 빈 셀 계산 (첫 번째 요일에 따라 빈 셀 추가)
  const blanks = ref([]);
  
  // 현재 월의 날짜 배열
  const daysInMonth = ref([]);
  
  // 달력을 업데이트하는 함수
  const updateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);
    const lastDay = getLastDayOfMonth(currentYear.value, currentMonth.value);
  
    // 첫 번째 요일을 기준으로 빈 셀 계산
    const numBlanks = firstDay.getDay();
    blanks.value = Array(numBlanks).fill(null);
  
    // 각 달의 날짜 계산
    const daysArray = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(day);
    }
    daysInMonth.value = daysArray;
  };
  
  // 오늘 날짜인지 확인하는 함수
  const isToday = (day) => {
    return (
      currentYear.value === today.value.getFullYear() &&
      currentMonth.value === today.value.getMonth() &&
      day === today.value.getDate()
    );
  };
  
  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    currentMonth.value--;
  
    if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value--;
    }
    updateCalendar();
  };
  
  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    currentMonth.value++;
  
    if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value++;
    }
    updateCalendar();
  };
  
  // 날짜 선택 함수
  const selectDay = (day) => {
    selectedDay.value = day;
    console.log('선택한 날짜:', `${currentYear.value}-${currentMonth.value + 1}-${day}`);
  };
  
  // 초기 달력 데이터 업데이트
  updateCalendar();
  </script>
  
  <style scoped>
  .calendar-container {
    max-width: 850px;
    margin: 0 auto;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 5px 40px 14px 40px;
    box-shadow: 0px 8px 33px 0px rgba(0, 0, 0, 0.1);
    min-height: calc(auto - 60px); /* 화면 크기에서 footer를 제외한 높이만큼 차지 */
    overflow: hidden; /* 불필요한 스크롤 제거 */
}
  
.calendar-header {
  display: flex;
  justify-content: center; /* 제목을 중앙에 배치 */
  align-items: center;
  padding: 8px 10px; /* 상하 8px, 좌우 20px 패딩 적용 */
  font-size: 18px;
  font-weight: bold;
  position: relative;
}

.calendar-header h2 {
    margin-bottom : 10px; /* 텍스트 위아래 여백을 없애서 버튼과 같은 높이에 맞춤 */
    padding: 0 10px; /* 텍스트 양옆의 간격 조정 */
}

.prev-next-button {
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%); /* 버튼을 제목과 수평 정렬 */
}

.prev-next-button:first-of-type {
  left: 10px; /* 왼쪽 버튼 위치 */
  margin-left: 200px;
}

.prev-next-button:last-of-type {
  right: 10px; /* 오른쪽 버튼 위치 */
  margin-right: 200px;
}

.prev-next-button:hover {
  background-color: #f0f0f0;
  border-radius: 5px;
}

.prev-next-button:first-of-type {
  left: 10px; /* 버튼 위치 조정 */
}

.prev-next-button:last-of-type {
  right: 10px; /* 버튼 위치 조정 */
}
  
  .calendar-body {
    display: flex;
    flex-direction: column;
  }
  
  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(70px, auto);
    gap: 10px;
  }
  
  .calendar-day {
    text-align: center;
    padding: 5px;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

.calendar-day .day-number {
    font-size: 10px;
    font-weight: bold;
    background-color: transparent;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    background-color: transparent; /* 기본적으로 배경색 없음 */
}

.calendar-day.selected {
    background-color: #fffcd5;
}

.calendar-day.today .day-number {
    background-color: #000000;
    color: white;
}


  .calendar-day .schedules {
    margin-top: 5px;
    width: 100%;
  }

  .schedule {
    padding: 5px;
    border-radius: 5px;
    margin: 2px 0;
    font-size: 8px;
    text-align: center;
  }

  .schedule.fun {
    background-color: #D2F0FF;
  }

  .schedule.important {
    background-color: #FFD9D9;
  }

  .schedule.personal {
    background-color: #FEE6C9;
  }

  .calendar-day:hover {
    background-color: #e0e0e0;
  }

  .calendar-day.blank {
    visibility: hidden;
  }
  </style>
