<template>
    <div class="bg-gray-800">
        <div class="container mx-auto py-6">
            <div class="flex justify-center sm:justify-between items-center">
                <router-link :to="{name: 'Home'}">
                    <div class="logo flex items-center">
                        <img alt="" class="w-10 sm:w-12" src="../assets/images/logo.png">
                        <h1 class="ml-2 text-white text-2xl sm:text-3xl">Vue3 MovieApp</h1>
                    </div>
                </router-link>
                <div class="tmdb">
                    <img alt="" class="w-0 sm:w-24" src="../assets/images/tmdb_logo.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

