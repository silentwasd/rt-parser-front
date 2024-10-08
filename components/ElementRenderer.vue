<script setup lang="ts">
import SpoilerElement from "~/components/SpoilerElement.vue";

defineProps<{
    type: string,
    variant?: string,
    text: string,
    align?: string,
    aligned?: boolean,
    rounded?: boolean,
    bordered?: boolean,
    direction?: string,
    padded?: boolean,
    margined?: boolean,
    children: any[]
}>();
</script>

<template>
    <template v-if="type === 'text'">{{ text }}</template>

    <div v-if="type === 'block'"
         :class="{'text-center': align == 'center', 'rounded-md overflow-clip': rounded, 'inline-block': variant == 'inline', 'border dark:border-gray-800': bordered, 'table': variant == 'table', 'align-top': align == 'top', 'px-1.5 py-1': padded, 'mx-1.5 my-1': margined}">
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

    <a v-if="type == 'anchor'" :href="text" class="text-primary-600 hover:text-primary-800 font-semibold group [&>img]:m-1.5 break-all">
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

    <em v-if="type == 'em'">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </em>

    <br v-if="type == 'break'"/>

    <h3 v-if="type == 'headline'" class="text-xl font-semibold">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </h3>

    <img v-if="type == 'image'" :src="text"
         class="group-hover:ring-4 inline"
         :class="{'float-left clear-left pe-2.5 pb-1.5': direction === 'left', 'float-right clear-right ps-2.5 pb-1.5': direction === 'right', 'max-w-[33%]': aligned}"/>

    <hr v-if="type == 'horizontal'" class="my-1.5 dark:border-primary-900"/>

    <pre v-if="type == 'pre'"
         :class="{'bg-gray-900 text-gray-50 leading-4': variant == 'nfo'}">
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </pre>

    <blockquote v-if="type == 'quote'" class="border-s-2 border-primary-500 dark:border-primary-900 px-2.5 py-1.5 bg-primary-50 dark:bg-primary-950 leading-5 text-sm my-1">
        <p class="font-semibold">{{ text }}:</p>
        <ElementRenderer v-for="element in children" v-bind="element"/>
    </blockquote>

    <SpoilerElement v-if="type == 'spoiler'" :text="text" :children="children"/>
</template>

<style scoped>

</style>