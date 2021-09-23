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

<script lang="ts">
import {defineComponent} from "vue";

import HeroImage from "../components/home/HeroImage.vue";
import Spinner from "../components/Spinner.vue";
import Grid from "../components/Grid.vue";
import MovieThumb from "../components/MovieThumb.vue";
import SearchBar from "../components/home/SearchBar.vue";
import Button from "../components/Button.vue";
import Error from "../components/Error.vue";

import useHomeFetch from '../composables/useHomeFetch';

export default defineComponent({
    name: 'Home',
    components: {
        Error,
        Spinner,
        HeroImage,
        SearchBar,
        Grid,
        MovieThumb,
        Button,
    },
    setup() {
        const {state, searchTerm, isLoading, isError, isLoadingMore, fetchMovies} = useHomeFetch();

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
})
</script>
