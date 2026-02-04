<script setup lang="ts">
const route = useRoute();

const {data: currentCategory} = await useFetch(`/raw/categories/${route.params.category}`, fetchOptions({
    transform: r => r.data
}));

useSeoMeta({
    title: currentCategory.value?.title ?? 'Неизвестная категория'
});
</script>

<template>
    <UContainer class="py-5 h-dvh">
        <div class="flex gap-5 h-full">
            <div class="flex flex-col gap-2.5 overflow-auto shrink-0 w-64">
                <RawCategory :category="{id: currentCategory.parent_id, title: 'Назад'}"/>
                <RawCategory v-for="category in currentCategory.categories" :category="category"/>
            </div>

            <div v-if="currentCategory.topics.length > 0" class="flex flex-col gap-2.5 overflow-auto grow w-0">
                <RawTopic v-for="topic in currentCategory.topics" :topic="topic"/>
            </div>
        </div>
    </UContainer>
</template>

<style scoped>

</style>