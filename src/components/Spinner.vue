<template>
    <div class="border-8 border-t-8 border-gray-200 mx-auto my-20 rounded-full w-24 h-24 animate-spin">

    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Spinner"
})
</script>

<style scoped>
div {
    border-top-color: #666;
}
</style>