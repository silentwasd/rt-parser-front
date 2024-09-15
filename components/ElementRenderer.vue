<script setup lang="ts">
defineProps<{
    type: string,
    variant?: string,
    href?: string,
    text: string,
    children: any[]
}>();
</script>

<template>
    <template v-if="type === 'text'">{{ text }}</template>

    <div v-if="type === 'block'">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </div>

    <ol v-if="type === 'list' && variant === 'ordered'" class="list-decimal ms-5 py-1">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </ol>

    <ul v-if="type === 'list' && variant === 'unordered'" class="list-disc ms-5 py-1">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </ul>

    <li v-if="type === 'list-element'">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </li>

    <a v-if="type == 'anchor'" :href="href">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </a>

    <span v-if="type == 'span'">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </span>

    <p v-if="type == 'paragraph'">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </p>

    <strong v-if="type == 'strong'" class="font-semibold">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </strong>

    <em v-if="type == 'em'" class="">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </em>
</template>

<style scoped>

</style>