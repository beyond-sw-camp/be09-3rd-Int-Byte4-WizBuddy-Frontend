<template>
  <SideMenu>
    <ShopMenu :userType="userType" />
  </SideMenu>
</template>
  
<script setup>
  import { ref,onMounted } from 'vue';
  import SideMenu from '@/components/SideMenu.vue';
  import ShopMenu from '@/components/shop/ShopMenu.vue';

  const userType = ref('');

  onMounted(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role) {
      userType.value = storedUser.role;
    }
});

</script>

<style scoped>

</style>