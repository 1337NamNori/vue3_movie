<template>
    <div class="w-full flex justify-center py-8">
        <button
            class="w-56 h-16 bg-gray-800 text-white text-2xl rounded-full hover:opacity-80 duration-300"
            @click="callback"
        >
            {{ text }}
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: ['text', 'callback'],
}
</script>

<style scoped>

</style>