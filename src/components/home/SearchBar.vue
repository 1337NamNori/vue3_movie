<template>
    <div class="wrapper bg-gray-800 h-24 py-5 px-6 sm:px-0">
        <div class="container mx-auto h-full bg-gray-600 rounded-full">
            <div class="flex align-center h-full px-4">
                <img alt="" class="w-8" src="../../assets/images/search-icon.svg">
                <input v-model="searchTerm" class="flex-1 ml-4 bg-transparent text-3xl text-white focus:outline-none"
                       placeholder="Search movies..." type="text"
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {ref, watch, defineComponent} from "vue";

export default defineComponent({
    name: "SearchBar",
    emits: ['update:search'],
    setup(props, context) {
        const searchTerm = ref<string>('');

        watch(searchTerm, () => {
            const timer = setTimeout(() => {
                context.emit('update:search', searchTerm.value);
            }, 500);

            return () => clearTimeout(timer);
        });

        return {
            searchTerm,
        }
    }
})
</script>

<style scoped>

</style>