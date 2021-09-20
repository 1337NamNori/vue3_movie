<template>
    <div class="wrapper bg-gray-700">
        <div class="container mx-auto py-6 px-6 sm:px-0">
            <div class="text-white text-2xl">
                <router-link :to="{name: 'Home'}">Home</router-link>
                |
                <span>{{ title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BreadCrumb",
    props: ['title'],
}
</script>

<style scoped>

</style>