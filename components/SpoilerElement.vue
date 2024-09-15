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
    <UAccordion :items="items" class="my-1" size="xl">
        <template #item>
            <div class="border p-5 rounded-xl overflow-clip">
                <ElementRenderer v-for="element in children" v-bind="element"/>
            </div>
        </template>
    </UAccordion>
</template>

<style scoped>

</style>