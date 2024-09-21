<script setup lang="ts">
defineProps<{
    topics: any[],
    status: string
}>();

const columns = [{
    key     : 'name',
    label   : 'Name',
    sortable: true
}, {
    key  : 'category',
    label: 'Category'
}, {
    key  : 'author',
    label: 'Author'
}, {
    key     : 'size',
    label   : 'Size',
    sortable: true
}, {
    key     : 'seeds',
    label   : 'Seeds',
    sortable: true
}, {
    key     : 'leeches',
    label   : 'Leeches',
    sortable: true
}, {
    key     : 'downloads',
    label   : 'Downloads',
    sortable: true
}, {
    key     : 'created_at',
    label   : 'Created at',
    sortable: true
}];

const sort = defineModel({required: true});
</script>

<template>
    <div class="w-full flex flex-col gap-5 md:gap-2.5 overflow-auto" ref="scroll">
        <UTable :columns="columns" :rows="topics" @select="navigateTo(`/topics/${$event.id}`)"
                :loading="status === 'pending'"
                v-model:sort="sort"
                sort-mode="manual"
                :ui="{
                        divide: '',
                        thead: 'sticky top-0 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 z-10'
                    }">
            <template #name-data="{row}">
                <p class="truncate w-[200px] md:w-[30vw]" :title="row.name">{{ row.name }}</p>
            </template>

            <template #category-data="{row}">
                <p class="truncate w-[100px] md:w-[10vw]" :title="row.category">{{ row.category }}</p>
            </template>

            <template #size-data="{row}">
                <FileSize :size="row.size"/>
            </template>

            <template #created_at-data="{row}">
                <NuxtTime :datetime="new Date(row.created_at * 1000)"
                          hour="2-digit" minute="2-digit"
                          day="2-digit" month="2-digit" year="numeric"/>
            </template>
        </UTable>
    </div>
</template>

<style scoped>

</style>