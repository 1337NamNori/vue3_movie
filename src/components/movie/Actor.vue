<template>
    <div class="bg-gray-900 rounded-2xl p-1">
        <img :src="imageUrl" alt="" class="rounded-xl">
        <h3 class="text-2xl text-white text-center pt-3">{{name}}</h3>
        <p class="text-xl text-gray-200 text-center pt-1 pb-6">{{character}}</p>
    </div>
</template>

<script>
import {computed} from "vue";

import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import NoImage from '../../assets/images/no_image.jpg';

export default {
    name: "Actor",
    props: {
        name: String,
        character: String,
        image: String,
    },
    setup(props) {
        const imageUrl = computed(() => {
            return props.image
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.image}`
                : NoImage;
        });

        return {
            imageUrl,
        }
    }
}
</script>

<style scoped>

</style>