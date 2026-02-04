<script setup lang="ts">
const {data: categories} = await useFetch('/raw/categories', fetchOptions({
    transform: r => r.data
}));
</script>

<template>
    <UContainer class="py-5">
        <RawCategory v-for="category in categories" :category="category"/>
    </UContainer>
</template>

<style scoped>

</style>