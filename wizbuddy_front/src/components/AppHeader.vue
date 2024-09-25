<template>
    <header>
        <nav>
            <RouterLink to="/">
                로고
            </RouterLink>
            
        </nav>        

    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const user = ref("");  

</script>

<style scoped>

</style>