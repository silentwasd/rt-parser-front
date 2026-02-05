<script setup lang="ts">
const {data: categories} = await useFetch('/raw/categories', fetchOptions({
    transform: r => r.data
}));

useSeoMeta({
    title: 'Категории'
});
</script>

<template>
    <UContainer class="py-5">
        <div class="flex flex-col gap-2.5">
            <RawCategory v-for="category in categories" :category="category"/>
        </div>
    </UContainer>
</template>

<style scoped>

</style>