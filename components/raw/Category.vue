<script setup lang="ts">
const props = defineProps<{
    category: any
}>();
</script>

<template>
    <NuxtLink class="block bg-gray-800 rounded px-2.5 py-1.5" :href="`/raw/categories${category.id ? '/' + category.id : ''}`">
        <p>{{ category.title }}</p>
    </NuxtLink>
</template>

<style scoped>

</style>