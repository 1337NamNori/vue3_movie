<template>
    <Spinner v-if="isLoading"/>
    <Error v-else-if="isError"/>
    <div v-else>
        <BreadCrumb :title="movie.original_title"/>
        <MovieInfo :movie="movie"/>
        <MovieInfoBar :budget="movie.budget" :revenue="movie.revenue" :time="movie.runtime"/>
        <Grid header="Actors">
            <Actor
                v-for="actor in movie.actors"
                :key="actor.id"
                :image="actor.profile_path"
                :name="actor.name"
                :character="actor.character"
            />
        </Grid>
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
import Grid from "../components/Grid";
import Actor from "../components/movie/Actor";

export default {
    name: "Movie",
    components: {
        Error,
        Spinner,
        BreadCrumb,
        MovieInfo,
        MovieInfoBar,
        Grid,
        Actor,
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

                isLoading.value = false;

                const directors = credits.crew.filter(member => member.job === 'Director');

                movie.value = {
                    ...result,
                    directors,
                    actors: credits.cast,
                };
                console.log(movie.value);
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