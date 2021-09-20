<template>
    <div v-if="isLoading">
        <Spinner/>
    </div>
    <div v-else-if="isError">
        <Error/>
    </div>
    <div v-else>
        <BreadCrumb :title="movie.original_title"/>
        <transition name="fade">
            <MovieInfo :movie="movie"/>
        </transition>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";

import apiSettings from "../service/api";

import BreadCrumb from "../components/movie/BreadCrumb";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import MovieInfo from "../components/movie/MovieInfo";

export default {
    name: "Movie",
    components: {
        Error,
        Spinner,
        BreadCrumb,
        MovieInfo,
    },
    setup() {
        const movieId = useRoute().params.id;

        const movie = ref({});
        const isLoading = ref(false);
        const isError = ref(false);

        const fetchMovie = async () => {
            try {
                isLoading.value = true;
                isError.value = false;

                const result = await apiSettings.fetchMovie(movieId);
                const credits = await apiSettings.fetchCredits(movieId);
                const directors = credits.crew.filter(member => member.job === 'Director');

                movie.value = {
                    ...result,
                    directors,
                    actors: credits.cast,
                };
                console.log(movie);

                isLoading.value = false;
            } catch (error) {
                isError.value = true;
            }
        }

        fetchMovie();

        return {
            movie,
            isLoading,
            isError,
        }
    }
}
</script>

<style scoped>

</style>