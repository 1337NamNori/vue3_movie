<template>
    <div class="home">
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
</template>

<script>
import {ref, watch} from "vue";
import apiSettings from "../service/api";
import HeroImage from "../components/HeroImage";
import Spinner from "../components/Spinner";
import Grid from "../components/Grid";
import MovieThumb from "../components/MovieThumb";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

export default {
    name: 'Home',
    components: {Button, SearchBar, MovieThumb, Grid, Spinner, HeroImage},
    setup() {
        const initialState = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0,
        }

        const state = ref(initialState);
        const searchTerm = ref('');
        const isLoading = ref(false);
        const isError = ref(false);
        const isLoadingMore = ref(false);

        const fetchMovies = async (page, searchTerm = '') => {
            try {
                isError.value = false;
                isLoading.value = true;

                const movies = await apiSettings.fetchMovies(searchTerm, page);
                console.log(movies);

                state.value = {
                    ...movies,
                    results: page > 1 ? [...state.value.results, ...movies.results,] : [...movies.results],
                }
            } catch
                (error) {
                isError.value = true;
            }
            isLoading.value = false;
        }

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
