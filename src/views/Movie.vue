<template>
    <div v-if="isLoading">
        <Spinner/>
    </div>
    <div v-else-if="isError">
        <Error/>
    </div>
    <div v-else>
        <BreadCrumb :title="movie.original_title"/>
        <MovieInfo :movie="movie"/>
        <MovieInfoBar :time="movie.runtime" :budget="movie.budget" :revenue="movie.revenue"/>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";

import apiService from "../service/api";

import BreadCrumb from "../components/movie/BreadCrumb";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import MovieInfo from "../components/movie/MovieInfo";
import MovieInfoBar from "../components/movie/MovieInfoBar";

export default {
    name: "Movie",
    components: {
        MovieInfoBar,
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

                const result = await apiService.fetchMovie(movieId);
                const credits = await apiService.fetchCredits(movieId);
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