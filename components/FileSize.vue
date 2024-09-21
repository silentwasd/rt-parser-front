<script setup lang="ts">
const props = defineProps<{
    size: number
}>();

const value = computed(() => {
    if (props.size > 1024 * 1024 * 1024 * 1024) {
        return (props.size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
    }

    if (props.size > 1024 * 1024 * 1024 * 100) {
        return (props.size / 1024 / 1024 / 1024).toFixed(1) + ' GB';
    }

    if (props.size > 1024 * 1024 * 1024) {
        return (props.size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }

    return Math.round(props.size / 1024 / 1024) + ' MB';
});
</script>

<template>
    <span>{{ value }}</span>
</template>

<style scoped>

</style>