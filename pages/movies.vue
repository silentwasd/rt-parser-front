<script setup lang="ts">
import MovieRepository from "~/repos/MovieRepository";

const repo      = new MovieRepository();
const route     = useRoute();
const routePage = route.query.hasOwnProperty('page') ? parseInt(route.query.page as string) : 1;
const page      = ref<number>(routePage);
const query     = ref<string>(route.query.hasOwnProperty('query') ? route.query.query as string : '');
const queryDeb  = useDebounce(query, 500);

const {data: movies, status} = await repo.index(() => ({
    page: page.value, query: queryDeb.value
}));

watch(() => [page.value, queryDeb.value], value => navigateTo(`/movies?` + querify({
    page : page.value,
    query: queryDeb.value
})));

watch(queryDeb, value => {
    page.value = 1;
});
</script>

<template>
    <Head>
        <title>Movies</title>
    </Head>

    <div class="flex flex-col h-dvh">
        <div class="shrink-0 px-5 py-2.5 border-b dark:border-gray-800 flex items-center justify-center">
            <SearchPanel :loading="status === 'pending'" :counters="movies?.counters" v-model="query"/>
        </div>

        <div class="grow overflow-auto">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-5 p-5">
                <NuxtLink v-for="movie in movies?.data ?? []"
                          :to="`/topics/${movie.topic_id}`"
                          :key="movie.id"
                          class="relative block border dark:border-gray-800 rounded-md overflow-clip group">
                    <div v-if="movie.cover"
                         class="aspect-[7/8] bg-contain bg-no-repeat bg-center bg-gray-950 transition-all group-hover:scale-110"
                         :style="`background-image: url(${fileUrl(movie.cover)})`"></div>

                    <div v-else class="aspect-[7/8] bg-gray-950 flex items-center justify-center">
                        <UIcon name="i-heroicons-photo-solid" class="text-6xl text-gray-50"/>
                    </div>

                    <div class="absolute top-0 flex flex-wrap w-full p-2.5 gap-1">
                        <div class="bg-transparent/50 backdrop-blur text-gray-50 px-1.5 py-0.5 rounded-md overflow-clip font-semibold text-xs">
                            <span v-if="movie.year.to">Год: {{ movie.year.from }} - {{ movie.year.to }}</span>
                            <span v-else-if="movie.year.from">Год: {{ movie.year.from }}</span>
                        </div>

                        <div v-for="country in movie.countries"
                             class="bg-transparent/50 backdrop-blur text-gray-50 px-1.5 py-0.5 rounded-md overflow-clip font-semibold text-xs">
                            {{ country }}
                        </div>

                        <div v-for="genre in movie.genres"
                             class="bg-transparent/50 backdrop-blur text-gray-50 px-1.5 py-0.5 rounded-md overflow-clip font-semibold text-xs">
                            {{ genre }}
                        </div>
                    </div>

                    <div class="absolute bottom-0 bg-transparent/50 backdrop-blur px-2.5 py-1.5 text-gray-50 w-full">
                        <h5 class="leading-5 font-semibold">
                            {{ movie.title }}
                        </h5>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div class="shrink-0 px-5 py-2.5 border-t dark:border-gray-800 flex items-center justify-center">
            <UPagination :page-count="movies?.meta.per_page" :total="movies?.meta.total ?? 0" v-model="page"/>
        </div>
    </div>
</template>

<style scoped>
</style>