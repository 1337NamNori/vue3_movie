<template>
    <div class="wrapper">
        <div class="container mx-auto py-16 px-6 sm:px-0">
            <div class="bg-gray-800 bg-opacity-80 md:flex rounded-3xl">
                <MovieThumb
                    :id="movie.id"
                    :clickable="false"
                    :image="movie.poster_path"
                    :title="movie.original_title"
                    class="md:max-w-md"
                />
                <div class="p-12 text-white">
                    <h2 class="text-4xl">{{ movie.original_title }}</h2>
                    <div v-if="movie.genres.length >= 0" class="mt-6">
                        <h4 class="text-xl uppercase">{{ movie.genres.length > 1 ? 'Genres' : 'Genre' }}</h4>
                        <span v-for="genre in movie.genres" :key="genre.id" class="text-lg mt-3">
                            {{ genre.name }}
                            <span v-if="genre.id !== movie.genres[movie.genres.length-1].id">| </span>
                        </span>
                    </div>
                    <div class="mt-6">
                        <h4 class="text-xl uppercase">Plot</h4>
                        <p class="text-lg">{{ movie.overview }}</p>
                    </div>
                    <div class="mt-6 flex">
                        <div>
                            <h4 class="text-xl uppercase">Rating</h4>
                            <div class="mt-3 w-10 h-10 bg-white rounded-full font-black text-xl text-black
                                        flex justify-center items-center"
                            >
                                    {{ movie.vote_average }}
                            </div>
                        </div>
                        <div class="ml-10">
                            <h4 class="text-xl uppercase mb-3">
                                {{ movie.directors.length > 1 ? 'Directors' : 'Director' }}
                            </h4>
                            <p v-for="director in movie.directors" :key="director.id" class="text-lg">
                                {{ director.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue";

import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../../config";
import MovieThumb from "../MovieThumb";

export default {
    name: "MovieInfo",
    components: {MovieThumb},
    props: {
        movie: Object,
    },
    setup(props) {
        const backdropUrlCss = computed(() => {
            return props.movie.backdrop_path
                ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path})`
                : '#000';
        });

        return {
            backdropUrlCss,
        }
    }
}
</script>

<style scoped>
.wrapper {
    background: v-bind(backdropUrlCss);
    background-size: cover;
    background-position: center;
}
</style>