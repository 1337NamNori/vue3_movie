<template>
    <div class="home" v-if="!isError">
        <transition name="fade">
            <HeroImage v-if="state.results[0] && !searchTerm"
                       :image="state.results[0].backdrop_path"
                       :text="state.results[0].overview"
                       :title="state.results[0].original_title"
            />
        </transition>
        <SearchBar @update:search="searchTerm = $event"/>
        <transition name="fade">
            <Grid
                v-if="state.results.length > 0"
                :header="searchTerm ? `Results for '${searchTerm}'` : 'Popular Movies'"
            >
                <MovieThumb
                    v-for="movie in state.results"
                    :key="movie.id"
                    :id="movie.id"
                    :title="movie.original_title"
                    :image="movie.poster_path"
                    :clickable="true"
                />
            </Grid>
        </transition>
        <Spinner v-if="isLoading"/>
        <Button
            v-if="state.page < state.total_pages && !isLoading"
            :callback="() => {isLoadingMore = true}"
            text="Load more"
        />
    </div>
    <div v-else>
        <Error/>
    </div>
</template>

<script>
import {watch} from "vue";

import HeroImage from "../components/HeroImage";
import Spinner from "../components/Spinner";
import Grid from "../components/Grid";
import MovieThumb from "../components/MovieThumb";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

import useHomeFetch from '../composables/useHomeFetch';
import Error from "../components/Error";

export default {
    name: 'Home',
    components: {Error, Button, SearchBar, MovieThumb, Grid, Spinner, HeroImage},
    setup() {
        const {state, searchTerm, isLoading, isError, isLoadingMore, fetchMovies} = useHomeFetch;

        // search
        watch(searchTerm, () => {
            fetchMovies(1, searchTerm.value);
        });

        // load more
        watch([searchTerm, isLoadingMore], () => {
            if (!isLoadingMore.value) return;
            fetchMovies(state.value.page + 1, searchTerm.value);
            isLoadingMore.value = false;
        });

        // initial
        fetchMovies(1);

        return {
            state,
            searchTerm,
            isLoading,
            isError,
            isLoadingMore,
        }
    },
}
</script>
