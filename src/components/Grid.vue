<template>
    <div class="wrapper">
        <div class="container mx-auto py-6 px-6 sm:px-0">
            <h3 v-if="header" class="font-bold text-3xl sm:text-5xl">{{ header }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-6">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Grid",
    props: {
        header: String,
    },
})
</script>

<style scoped>

</style>