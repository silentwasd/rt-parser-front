<script setup lang="ts">
const props = defineProps<{
    topic: any
}>();
</script>

<template>
    <NuxtLink
        class="block bg-gray-800 hover:bg-gray-750 rounded-lg px-4 py-3 border border-gray-700 hover:border-gray-600"
        :to="`/topics/${props.topic.id}`"
    >
        <h3 class="font-medium mb-2 text-gray-100 line-clamp-2 leading-snug">
            {{ topic.title }}
        </h3>

        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div class="flex items-center gap-1">
                <UIcon name="i-mdi-account" class="text-gray-400 size-5" />
                <span class="text-gray-300 font-semibold">
                    {{ topic.author ? topic.author.name : 'Гость' }}
                </span>
            </div>

            <div class="flex items-center gap-1">
                <UIcon name="i-mdi-harddisk" class="text-gray-400 size-5" />
                <span class="text-gray-300 font-semibold">
                    <FileSize :size="topic.size"/>
                </span>
            </div>

            <div class="flex items-center gap-1">
                <UIcon name="i-mdi-upload" class="text-green-400 size-5" />
                <span class="text-green-400 font-semibold">
                    {{ topic.seeders }}
                </span>
            </div>

            <div class="flex items-center gap-1">
                <UIcon name="i-mdi-download" class="text-red-400 size-5" />
                <span class="text-red-400 font-semibold">
                    {{ topic.leechers }}
                </span>
            </div>

            <div class="flex items-center gap-1">
                <UIcon name="i-mdi-download-box" class="text-gray-400 size-5" />
                <span class="text-gray-300 font-semibold">
                    {{ topic.downloads }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>

</style>