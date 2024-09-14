<script setup lang="ts">
const props = defineProps<{
    size: number
}>();

const value = computed(() => {
    if (props.size > 1024 * 1024 * 1024) {
        return (props.size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }

    return Math.round(props.size / 1024 / 1024) + ' MB';
});
</script>

<template>
    {{ value }}
</template>

<style scoped>

</style>