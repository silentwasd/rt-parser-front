<script setup lang="ts">
const props = defineProps<{
    loading: boolean,
    counters?: any
}>();

const query = defineModel<string>({required: true});

const route = useRoute();

const isMoviesSelected = computed(() => route.path.startsWith('/movies'));

function moveTo(path: string) {
    return path + (query.value ? '?' + querify({query: query.value}) : '');
}

const counters = useState('counters', () => props.counters);
</script>

<template>
    <div class="w-full max-w-[600px] mx-auto">
        <div class="flex gap-2.5">
            <UInput v-model="query"
                    placeholder="Search..."
                    size="xl"
                    :loading="loading"
                    trailing
                    class="grow"
                    :ui="{rounded: 'rounded-full'}"/>

            <UColorModeButton size="xl"
                              variant="solid"
                              :ui="{rounded: 'rounded-full'}"/>

            <UButton color="gray"
                     size="xl"
                     icon="i-simple-icons-github"
                     to="https://github.com/silentwasd/rt-parser-front"
                     target="_blank"
                     :ui="{rounded: 'rounded-full'}"/>
        </div>

        <div class="mt-1.5">
            <NuxtLink :to="isMoviesSelected ? moveTo('/') : moveTo('/movies')">
                <UBadge :ui="{rounded: 'rounded-xl'}" :color="isMoviesSelected ? 'primary' : 'gray'">
                    Movies
                    <span class="ms-1 bg-transparent/50 rounded-md px-1"
                          :class="isMoviesSelected ? 'bg-transparent/50' : 'bg-transparent/10'">
                        {{ counters?.movies ?? 0 }}
                    </span>
                </UBadge>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>

</style>