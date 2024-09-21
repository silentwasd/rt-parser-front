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

watch(() => [queryDeb.value, sort.value], value => {
    router.push({
        path : '/',
        query: {
            query         : queryDeb.value,
            sort_column   : sort.value.column,
            sort_direction: sort.value.direction
        }
    });

    page.value = 1;
});
</script>

<template>
    <Head>
        <title>Search</title>
    </Head>

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

                <UButton color="gray"
                         size="xl"
                         icon="i-simple-icons-github"
                         to="https://github.com/silentwasd/rt-parser-front"
                         target="_blank"
                         :ui="{rounded: 'rounded-full'}"/>
            </div>
        </div>

        <template v-if="topics">
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