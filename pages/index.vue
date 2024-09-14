<script setup lang="ts">
import SearchRepository from "~/repos/SearchRepository";

const repo     = new SearchRepository();
const query    = ref<string>('');
const queryDeb = useDebounce(query, 500);

const {data: topics, status} = await repo.search(() => ({query: queryDeb.value}));
</script>

<template>
    <div class="flex flex-col items-center h-dvh overflow-auto">
        <div class="w-full p-5 sticky top-0 bg-white dark:bg-gray-900">
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

        <div class="w-full flex flex-col gap-5 md:gap-2.5 pb-5">
            <div v-for="topic in topics" :key="topic.id"
                 class="flex flex-col md:flex-row gap-2.5 px-5">
                <div class="bg-gray-100 dark:bg-gray-800 border-2 dark:border-gray-700 rounded-md grow px-2.5 py-2 truncate">
                    <p class="truncate" :title="topic.name">{{ topic.name }}</p>
                </div>

                <div class="shrink-0 flex gap-2.5">
                    <div class="grow bg-gray-600 dark:bg-gray-950 border-2 border-gray-800 dark:border-gray-950 rounded-md px-2.5 py-2 text-center w-24 text-gray-50 font-semibold">
                        <FileSize :size="topic.size"/>
                    </div>

                    <div class="grow bg-emerald-400 dark:bg-emerald-900 border-2 border-emerald-500 dark:border-emerald-700 rounded-md px-2.5 py-2 text-center w-16 font-semibold">
                        {{ topic.seeds }}
                    </div>

                    <div class="grow bg-red-400 dark:bg-red-900 border-2 border-red-500  dark:border-red-700 rounded-md px-2.5 py-2 text-center w-16 font-semibold">
                        {{ topic.leeches }}
                    </div>

                    <div class="grow bg-fuchsia-400 dark:bg-fuchsia-900 border-2 border-fuchsia-500  dark:border-fuchsia-700 rounded-md px-2.5 py-2 text-center w-20 font-semibold">
                        {{ topic.downloads }}
                    </div>

                    <div class="hidden xl:block grow bg-orange-400 dark:bg-orange-900 border-2 border-orange-500  dark:border-orange-700 rounded-md px-2.5 py-2 text-center w-36 font-semibold truncate"
                         :title="topic.author">
                        {{ topic.author }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>