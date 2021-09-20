<template>
    <div v-if="clickable">
        <router-link :to="{name: 'Movie', params: {id: id}}">
            <img
                :alt="title" :src="imageUrl" :title="title"
                class="h-full w-full object-cover rounded-3xl hover:opacity-80 duration-300"
            >
        </router-link>
    </div>
    <div v-else>
        <img
            :alt="title" :src="imageUrl" :title="title"
            class="h-full w-full object-cover rounded-3xl hover:opacity-80 duration-300"
        >
    </div>

</template>

<script>
import {computed} from "vue";
import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../config";
import NoImage from "../assets/images/no_image.jpg";

export default {
    name: "MovieThumb",
    props: {
        image: String,
        title: String,
        clickable: Boolean,
        id: Number,
    },
    setup(props) {
        const imageUrl = computed(() => {
            return props.image ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.image}` : NoImage;
        })

        return {
            imageUrl,
        }
    }
}
</script>

<style scoped>

</style>