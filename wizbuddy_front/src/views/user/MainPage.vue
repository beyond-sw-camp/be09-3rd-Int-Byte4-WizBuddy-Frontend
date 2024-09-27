<template>
  <SideMenu>
    <ShopMenu/>
  </SideMenu>
</template>
  
<script setup>
  import SideMenu from '@/components/SideMenu.vue';
  import ShopMenu from '@/components/shop/ShopMenu.vue';
</script>

<script>
  export default {
    name: 'MainPage',
  };
</script>
  
<style scoped>

</style>