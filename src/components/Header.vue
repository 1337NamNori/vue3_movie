<template>
    <div class="bg-gray-800">
        <div class="container mx-auto py-6">
            <div class="flex justify-between items-center">
                <router-link :to="{name: 'Home'}">
                    <div class="logo flex items-center">
                        <img alt="" class="w-12" src="../assets/logo.png">
                        <h1 class="ml-2 text-white text-3xl">Vue3 MovieApp</h1>
                    </div>
                </router-link>
                <div class="tmdb">
                    <img alt="" class="w-24" src="../assets/tmdb_logo.svg">
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

