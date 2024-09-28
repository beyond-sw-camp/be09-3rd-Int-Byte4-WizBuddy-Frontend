<template>
    <div class="weekly-schedule-container">
      <aside class="left-side">
        <ScheduleTab />
      </aside>
      
      <!-- WeeklyScheduleContainer.vue를 호출 -->
      <WeeklyScheduleContainer />
  
      <aside class="right-side">
        <UserProfileMenu />
      </aside>
    </div>
  </template>
  
  <script setup>
  import ScheduleTab from '@/components/schedule/ScheduleTab.vue';
  import UserProfileMenu from '@/components/UserProfileMenu.vue';
  import WeeklyScheduleContainer from '@/components/schedule/WeeklyScheduleContainer.vue';
  </script>
  
  <style scoped>
    @import url('@/assets/css/schedule/WeeklyScheduleContainer.css');
  </style>