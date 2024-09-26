<template>
    <div class="central-container"></div>
</template>
  
<script>
  // import axios from "axios";
  // import { onMounted, ref, inject } from "vue";
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>
  
<style scoped>
  /* Central Container Styling */
  .central-container {
    margin-left: 28px;
    margin-right: 28px;
    margin-top: 44px;
    margin-bottom: 44px;
    height: 100%;
    flex-shrink: 1;
    background-color: #ffffff;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  }
</style>  