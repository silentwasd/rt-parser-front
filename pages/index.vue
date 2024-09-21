<script setup lang="ts">
import SearchRepository from "~/repos/SearchRepository";

const repo     = new SearchRepository();
const route    = useRoute();
const router   = useRouter();
const query    = ref<string>(route.query.hasOwnProperty('query') ? (route.query.query as string) : '');
const queryDeb = useDebounce(query, 500);
const sort     = ref({
    column   : route.query.hasOwnProperty('sort_column') ? (route.query.sort_column as string) : 'created_at',
    direction: route.query.hasOwnProperty('sort_direction') ? (route.query.sort_direction as string) : 'desc'
});

const {data: topics, status} = await repo.search(() => ({
    query         : queryDeb.value,
    sort_column   : sort.value.column,
    sort_direction: sort.value.direction
}));

watch(() => [queryDeb.value, sort.value], value => {
    router.push({
        path : '/',
        query: {
            query         : queryDeb.value,
            sort_column   : sort.value.column,
            sort_direction: sort.value.direction
        }
    });
});

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
</script>

<template>
    <div class="flex flex-col items-center h-dvh"
         :class="{'justify-center': !topics}">
        <div class="w-full p-5 bg-white dark:bg-gray-900 shrink-0"
             :class="{'border-b dark:border-gray-800': topics}">
            <div class="w-full max-w-[600px] mx-auto flex gap-2.5">
                <UInput v-model="query"
                        placeholder="Search..."
                        size="xl"
                        :loading="status === 'pending'"
                        trailing
                        class="grow"
                        :ui="{rounded: 'rounded-full'}"/>

                <UColorModeButton size="xl"
                                  variant="solid"
                                  :ui="{rounded: 'rounded-full'}"/>
            </div>
        </div>

        <div v-if="topics" class="w-full flex flex-col gap-5 md:gap-2.5 grow overflow-auto">
            <UTable :columns="columns" :rows="topics" @select="navigateTo(`/topics/${$event.id}`)"
                    :loading="status === 'pending'"
                    class="overflow-auto"
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
    </div>
</template>

<style scoped>

</style>