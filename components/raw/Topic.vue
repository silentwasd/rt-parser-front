<script setup lang="ts">
const props = defineProps<{
    topic: any
}>();
</script>

<template>
    <NuxtLink class="block bg-gray-800 rounded px-2.5 py-1.5" :to="`/topics/${props.topic.id}`">
        <p>{{ topic.title }}</p>

        <div class="flex gap-5">
            <div>
                <p v-if="topic.author">Автор: {{ topic.author.name }}</p>
                <p v-else>Автор: Гость</p>
            </div>

            <div>
                <p>Размер: <FileSize :size="topic.size"/></p>
            </div>

            <div>
                <p>Сидеры: {{ topic.seeders }}</p>
            </div>

            <div>
                <p>Личеры: {{ topic.leechers }}</p>
            </div>

            <div>
                <p>Скачиваний: {{ topic.downloads }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>

</style>