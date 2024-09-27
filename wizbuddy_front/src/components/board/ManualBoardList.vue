<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="manual-title">
          <router-link :to="`/manualboard/${post.id}`">{{ post.title }}</router-link>
        </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  
  // Mock data - replace this with an actual API call
  const posts = ref([]);
  
  onMounted(() => {
    posts.value = [
      { id: 1, title: 'Manual 1' },
      { id: 2, title: 'Manual 2' },
      { id: 3, title: 'Manual 3' },
    ];
  });
</script>
<style scoped>
    .manual-title {
        display: flex;
        align-items: center;
    }
</style>