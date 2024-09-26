<template>
    <main>
        <RouterView/>
        <Board/>
    </main>
</template>

<script>
  export default {
    name: 'Board',
  };
</script>
<script setup>
    import { RouterView } from "vue-router";
    import Board from '@/views/Board.vue';

</script>