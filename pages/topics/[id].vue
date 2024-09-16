<script setup lang="ts">
import TopicRepository from "~/repos/TopicRepository";

const route = useRoute();
const repo  = new TopicRepository();

const {data: topic} = await repo.show(parseInt(route.params.id as string));

const topAnchor      = ref();
const commentsAnchor = ref();

const {y: topY}      = useElementBounding(topAnchor);
const {y: commentsY} = useElementBounding(commentsAnchor);

const links = computed(() => [{
    label : 'Topic',
    to    : '#top',
    active: topY.value <= 0 && commentsY.value > 0
}, {
    label : 'Comments',
    to    : '#comments',
    active: commentsY.value <= 0,
    badge : topic.value.comments.length
}]);
</script>

<template>
    <div class="bg-gray-100 dark:bg-gray-950/50">
        <Head>
            <title>{{ topic.title }}</title>
        </Head>

        <UHeader title="Rt Parser">
            <template #right>
                <UColorModeButton/>
            </template>
        </UHeader>

        <UContainer class="flex gap-5 py-5">
            <UCard class="w-[200px] shrink-0 sticky top-[5.225rem] h-full">
                <UVerticalNavigation :links="links"/>
            </UCard>

            <div id="top" ref="topAnchor" class="absolute top-0"></div>

            <div class="flex flex-col gap-5 grow">
                <UCard>
                    <ElementRenderer v-for="element in topic.description" v-bind="element"/>
                </UCard>

                <div class="flex flex-col gap-5 relative">
                    <div id="comments" ref="commentsAnchor" class="absolute -top-20"></div>

                    <h3 class="text-xl font-semibold">Комментарии</h3>

                    <UCard v-for="comment in topic.comments" :ui="{body: {padding: ''}}">
                        <div class="flex divide-x dark:divide-gray-800">
                            <div class="p-5 shrink-0">
                                <div v-if="comment.avatar" class="w-24 h-24">
                                    <img :src="comment.avatar" class="w-full h-full rounded-md"/>
                                </div>

                                <div v-else class="w-24 h-24 bg-gray-800 rounded-md flex items-center justify-center text-gray-50">
                                    <UIcon name="i-heroicons-user-solid" class="text-4xl"/>
                                </div>

                                <div v-if="comment.nickname" class="w-24 mt-1">
                                    <p class="font-semibold text-sm text-center truncate">{{ comment.nickname }}</p>
                                </div>
                            </div>

                            <div class="p-5 grow">
                                <ElementRenderer v-for="element in comment.content" v-bind="element"/>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>