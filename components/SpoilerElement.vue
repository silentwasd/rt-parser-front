<script setup lang="ts">
const props = defineProps<{
    text: string,
    children: any[]
}>();

const items = computed(() => [{
    label: props.text
}]);
</script>

<template>
    <UAccordion :items="items" class="my-1" size="xl" :ui="{default: {class: 'border border-primary-200 dark:border-primary-900/50'}}">
        <template #item>
            <div class="border border-primary-200 dark:border-primary-950 p-5 rounded-md overflow-clip text-gray-900 dark:text-gray-200 bg-primary-50 dark:bg-primary-950/50">
                <ElementRenderer v-for="element in children" v-bind="element"/>
            </div>
        </template>
    </UAccordion>
</template>

<style scoped>

</style>