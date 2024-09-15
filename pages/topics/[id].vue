<script setup lang="ts">
import TopicRepository from "~/repos/TopicRepository";

const route = useRoute();
const repo  = new TopicRepository();

const {data: topic} = await repo.show(parseInt(route.params.id as string));
</script>

<template>
    <div class="p-5">
        <ElementRenderer v-for="element in topic.description" v-bind="element"/>
    </div>
</template>

<style scoped>

</style>