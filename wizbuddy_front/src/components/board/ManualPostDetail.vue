<template>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <router-link to="/manualboard">Back to Manual Board</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const post = ref(null);
  
  // Mock data - replace this with an actual API call
  const posts = [
    { id: 1, title: 'Manual 1', content: 'Content for manual 1' },
    { id: 2, title: 'Manual 2', content: 'Content for manual 2' },
    { id: 3, title: 'Manual 3', content: 'Content for manual 3' },
  ];
  
  onMounted(() => {
    const postId = parseInt(route.params.id);
    post.value = posts.find(p => p.id === postId);
  });
  </script>
  