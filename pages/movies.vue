<script setup lang="ts">
import MovieRepository from "~/repos/MovieRepository";

const repo      = new MovieRepository();
const route     = useRoute();
const routePage = route.query.hasOwnProperty('page') ? parseInt(route.query.page as string) : 1;
const page      = ref<number>(routePage);

const {data: movies} = await repo.index(() => ({page: page.value}));

watch(page, value => navigateTo(`/movies?` + querify({page: value})));
</script>

<template>
    <Head>
        <title>Movies</title>
    </Head>

    <div class="flex flex-col h-dvh">
        <div class="grow overflow-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-5 p-5">
                <NuxtLink v-for="movie in movies?.data ?? []"
                          :id="movie.id" class="relative border rounded-md overflow-clip"
                          :to="`/topics/${movie.topic_id}`">
                    <div v-if="movie.cover"
                         class="aspect-[7/8] bg-contain bg-no-repeat bg-center bg-gray-900"
                         :style="`background-image: url(${fileUrl(movie.cover)})`"></div>

                    <div v-else class="aspect-[7/8] bg-gray-900 flex items-center justify-center">
                        <UIcon name="i-heroicons-photo-solid" class="text-6xl text-gray-50"/>
                    </div>

                    <div class="absolute bottom-0 bg-transparent/50 backdrop-blur p-2.5 w-full">
                        <h5 class="leading-5 font-semibold text-gray-50">{{ movie.title }}</h5>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div class="shrink-0 px-5 py-2.5 border-t flex items-center justify-center">
            <UPagination :page-count="movies?.meta.per_page" :total="movies?.meta.total ?? 0" v-model="page"/>
        </div>
    </div>
</template>

<style scoped>

</style>