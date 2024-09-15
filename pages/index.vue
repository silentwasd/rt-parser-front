<script setup lang="ts">
import SearchRepository from "~/repos/SearchRepository";

const repo     = new SearchRepository();
const route    = useRoute();
const router   = useRouter();
const query    = ref<string>(route.query.hasOwnProperty('query') ? (route.query.query as string) : '');
const queryDeb = useDebounce(query, 500);

const {data: topics, status} = await repo.search(() => ({query: queryDeb.value}));

watch(queryDeb, value => {
    router.push({
        path : '/',
        query: {query: value}
    });
});

const columns = [{
    key  : 'name',
    label: 'Name'
}, {
    key  : 'category',
    label: 'Category'
}, {
    key  : 'size',
    label: 'Size'
}, {
    key  : 'seeds',
    label: 'Seeds'
}, {
    key  : 'leeches',
    label: 'Leeches'
}, {
    key  : 'downloads',
    label: 'Downloads'
}];
</script>

<template>
    <div class="flex flex-col items-center h-dvh overflow-auto"
         :class="{'justify-center': !topics}">
        <div class="w-full p-5 sticky top-0 bg-white dark:bg-gray-900 z-10">
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

        <div v-if="topics" class="w-full flex flex-col gap-5 md:gap-2.5">
            <UTable :columns="columns" :rows="topics" @select="navigateTo(`/topics/${$event.id}`)">
                <template #name-data="{row}">
                    <p class="truncate w-[600px]" :title="row.name">{{ row.name }}</p>
                </template>

                <template #size-data="{row}">
                    <FileSize :size="row.size"/>
                </template>
            </UTable>
        </div>
    </div>
</template>

<style scoped>

</style>