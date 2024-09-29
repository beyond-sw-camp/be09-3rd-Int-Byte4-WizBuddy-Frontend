<template>
    <div class="side" :class="{ 'main-page': isMainPage }">
        <aside class="left-side">
            <LeftTab v-if="!isMainPage"/>
            <LeftSideMenu v-if="userType === 'employer'" @toggle-edit-mode="$emit('toggle-edit-mode', $event)" @toggle-delete-mode="$emit('toggle-delete-mode', $event)"  />
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
    import { ref, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    import LeftTab from './LeftTab.vue';
    import UserProfileMenu from './UserProfileMenu.vue';
    import LeftSideMenu from './LeftSideMenu.vue';

    const route = useRoute();

    const isMainPage = ref(false);
    const userType = ref('');

    watch(() => route.path, (newPath) => {
        isMainPage.value = newPath === '/main';    
    }
    , 
    {
      immediate: true 
    }
    
);

    onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        userType.value = user.role; 
    }
    });
</script>
  
<style scoped>
.side {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;     
    background: #F3F7FA;
}

.side.main-page {
  height: calc(100vh - 121.6px);
}

.left-side {
    width: 16%; 
    background-color: #F3F7FA; 
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
}

.main-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: flex-start; 
    height: 100vh;
    padding: 0 20px;
    background-color: #F3F7FA;
}

.right-side {
    width: 20%; 
    background-color: #F3F7FA;
    padding: 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
}

</style>
