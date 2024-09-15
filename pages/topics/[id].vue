<script setup lang="ts">
import TopicRepository from "~/repos/TopicRepository";

const route = useRoute();
const repo  = new TopicRepository();

const {data: topic} = await repo.show(parseInt(route.params.id as string));
</script>

<template>
    <UHeader title="Rt Parser">
        <template #right>
            <UColorModeButton/>
        </template>
    </UHeader>

    <UContainer class="py-5">
        <ElementRenderer v-for="element in topic.description" v-bind="element"/>
    </UContainer>
</template>

<style scoped>

</style>