<template>
    <SideMenu>
        <WeeklyScheduleContainer />
    </SideMenu>
  </template>
  
  <script setup>
  import SideMenu from '@/components/SideMenu.vue';
  import WeeklyScheduleContainer from '@/components/schedule/WeeklyScheduleContainer.vue';
  </script>
  
  <style scoped>
    @import url('@/assets/css/schedule/WeeklyScheduleContainer.css');
  </style>