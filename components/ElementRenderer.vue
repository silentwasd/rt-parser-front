<script setup lang="ts">
import SpoilerElement from "~/components/SpoilerElement.vue";

defineProps<{
    type: string,
    variant?: string,
    text: string,
    align?: string,
    aligned?: boolean,
    direction?: string,
    children: any[]
}>();
</script>

<template>
    <template v-if="type === 'text'">{{ text }}</template>

    <div v-if="type === 'block'"
         :class="{'text-center': align == 'center'}">
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

    <a v-if="type == 'anchor'" :href="text" class="text-primary-600 hover:text-primary-800 font-semibold group [&>img]:m-1.5">
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

    <hr v-if="type == 'horizontal'" class="my-1.5"/>

    <SpoilerElement v-if="type == 'spoiler'" :text="text" :children="children"/>
</template>

<style scoped>

</style>