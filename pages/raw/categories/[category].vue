<script setup lang="ts">
const route  = useRoute();
const router = useRouter();

const page = computed({
    get: () => {
        const pageParam = route.query.page;
        return pageParam ? parseInt(pageParam as string, 10) : 1;
    },
    set: (newPage: number) => {
        router.replace({
            query: {...route.query, page: newPage.toString()}
        });
        goToPage.value = newPage;
    }
});

const goToPage = ref<number>(page.value);

const {data: currentCategory} = await useFetch(`/raw/categories/${route.params.category}`, fetchOptions({
    query: {page}
}));

useSeoMeta({
    title: currentCategory.value?.data.title ?? 'Неизвестная категория'
});
</script>

<template>
    <UContainer class="py-5 h-dvh">
        <div class="flex gap-5 h-full">
            <div class="flex flex-col gap-2.5 overflow-auto shrink-0 w-64">
                <RawCategory :category="{id: currentCategory.data.parent_id, title: 'Назад'}"/>
                <RawCategory v-for="category in currentCategory.data.categories"
                             :category="category"
                             :active="category.id === currentCategory.data.id"/>
            </div>

            <div class="flex flex-col gap-2.5 grow w-0">
                <div class="flex flex-col gap-2.5 overflow-auto">
                    <RawTopic v-for="topic in currentCategory.data.topics" :topic="topic"/>
                </div>

                <div v-if="currentCategory.meta.total > currentCategory.meta.per_page" class="flex justify-center gap-2.5">
                    <UPagination :page-count="currentCategory.meta.per_page"
                                 :total="currentCategory.meta.total"
                                 v-model="page"/>

                    <UInput v-model.number="goToPage" class="w-16" type="number" @keydown.enter="page = goToPage"/>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<style scoped>

</style>