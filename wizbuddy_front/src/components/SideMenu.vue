<template>
    <div class="side">
        <aside class="left-side">
        </aside>
        <aside class="right-side">
            <UserProfileMenu />
        </aside>
    </div>
  </template>
  
<script setup>
    import UserProfileMenu from './UserProfileMenu.vue';

</script>
  
<style scoped>
.side {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - 80px);
    background: #F3F7FA;
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA; 
    padding: 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

</style>
