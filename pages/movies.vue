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
        <div class="grow grid grid-cols-10 content-start justify-items-center gap-5 p-5 overflow-auto">
            <NuxtLink v-for="movie in movies?.data ?? []" :id="movie.id" :to="`/topics/${movie.topic_id}`" class="block w-[160px] h-[200px] mb-5">
                <div v-if="movie.cover"
                     class="aspect-[7/8] bg-contain bg-no-repeat bg-center rounded-lg border bg-gray-900 w-full h-full"
                     :style="`background-image: url(${fileUrl(movie.cover)})`"></div>

                <div v-else class="aspect-[7/8] bg-gray-900 rounded-lg flex items-center justify-center  w-full h-full">
                    <UIcon name="i-heroicons-photo-solid" class="text-6xl text-gray-50"/>
                </div>

                <h5 class="leading-5 font-semibold text-sm">{{ movie.title }}</h5>
            </NuxtLink>
        </div>

        <div class="shrink-0 px-5 py-2.5 border-t flex items-center justify-center">
            <UPagination :page-count="movies?.meta.per_page" :total="movies?.meta.total ?? 0" v-model="page"/>
        </div>
    </div>
</template>

<style scoped>

</style>