<script setup lang="ts">
import SearchRepository from "~/repos/SearchRepository";

const repo     = new SearchRepository();
const route    = useRoute();
const router   = useRouter();
const query    = ref<string>(route.query.hasOwnProperty('query') ? (route.query.query as string) : '');
const queryDeb = useDebounce(query, 500);
const page     = ref<number>(route.query.hasOwnProperty('page') ? parseInt(route.query.page as string) : 1);
const sort     = ref({
    column   : route.query.hasOwnProperty('sort_column') ? (route.query.sort_column as string) : 'created_at',
    direction: route.query.hasOwnProperty('sort_direction') ? (route.query.sort_direction as string) : 'desc'
});

const {data: topics, status} = await repo.search(() => ({
    query         : queryDeb.value,
    sort_column   : sort.value.column,
    sort_direction: sort.value.direction,
    page          : page.value
}));

watch(() => [queryDeb.value, sort.value, page.value], value => {
    navigateTo(`/?` + querify({
        query         : queryDeb.value,
        sort_column   : sort.value.column,
        sort_direction: sort.value.direction,
        page          : page.value
    }));
});

watch(queryDeb, value => {
    page.value = 1;
});
</script>

<template>
    <Head>
        <title>Search</title>
    </Head>

    <div class="flex flex-col items-center h-dvh"
         :class="{'justify-center': !topics || topics.data.length == 0}">
        <div class="w-full py-2.5 bg-white dark:bg-gray-900 shrink-0"
             :class="{'border-b dark:border-gray-800': topics && topics.data.length > 0}">
            <SearchPanel :loading="status === 'pending'" :counters="topics?.counters" v-model="query"/>
        </div>

        <template v-if="topics && topics.data.length > 0">
            <SearchTable :topics="topics.data"
                         :status="status"
                         v-model="sort"/>

            <div v-if="topics.meta.total > topics.meta.per_page"
                 class="shrink-0 border-t dark:border-gray-800 w-full flex justify-center items-center px-5 py-2.5">
                <UPagination :page-count="topics.meta.per_page" :total="topics.meta.total" v-model="page"/>
            </div>
        </template>
    </div>
</template>

<style scoped>

</style>