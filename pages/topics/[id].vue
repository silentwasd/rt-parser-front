<script setup lang="ts">
import TopicRepository from "~/repos/TopicRepository";

const route = useRoute();
const repo  = new TopicRepository();

const {data: topic} = await repo.show(parseInt(route.params.id as string));
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

        <UContainer class="py-5">
            <ElementRenderer v-for="element in topic.description" v-bind="element"/>
        </UContainer>
    </div>
</template>

<style scoped>

</style>