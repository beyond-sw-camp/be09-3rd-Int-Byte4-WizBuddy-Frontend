<template>
    <div class="side">
        <aside class="left-side">
            <LeftTab />
            <LeftSideMenu/>
        </aside>
        <div class="main-container">
            <slot></slot>
        </div>
        <aside class="right-side">
            <UserProfileMenu />
        </aside>
    </div>
  </template>
  
<script setup>
    import LeftTab from './LeftTab.vue';
    import UserProfileMenu from './UserProfileMenu.vue';
    import LeftSideMenu from './LeftSideMenu.vue';

</script>
  
<style scoped>
.side {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    background: #F3F7FA;
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA; 
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
}

.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
}

</style>
