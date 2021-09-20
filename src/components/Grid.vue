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

<script>
export default {
    name: "Grid",
    props: ['header'],
}
</script>

<style scoped>

</style>