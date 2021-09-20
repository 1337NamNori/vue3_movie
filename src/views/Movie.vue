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
import {useRoute} from "vue-router";

import useMovieFetch from "../composables/useMovieFetch";

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
        const {movie, isError, isLoading, fetchMovie} = useMovieFetch(movieId);

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