<template>
    <div class="wrapper">
        <div class="container mx-auto h-full py-10 text-white flex flex-col justify-end px-6 sm:px-0">
            <h3 class="font-bold text-3xl sm:text-5xl mb-5">{{ title }}</h3>
            <p class="text-lg sm:text-xl max-w-3xl">{{ text }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {IMAGE_BASE_URL, BACKDROP_SIZE} from "../../config";

export default defineComponent({
    name: "HeroImage",
    props: {
        image: String,
        title: String,
        text: String,
    },
    setup(props) {
        const imageUrlCss = computed(() => {
            return `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.image})`;
        })

        return {
            imageUrlCss,
        }
    }
})
</script>

<style scoped>
.wrapper {
    height: 600px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), v-bind(imageUrlCss);
    background-size: 100%, cover;
    background-position: center;
}
</style>