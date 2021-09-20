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
                    :id="movie.id"
                    :key="movie.id"
                    :clickable="true"
                    :image="movie.poster_path"
                    :title="movie.original_title"
                />
            </Grid>
        </transition>
        <Spinner v-if="isLoading"/>
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

export default {
    name: 'Home',
    components: {SearchBar, MovieThumb, Grid, Spinner, HeroImage},
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

        const fetchMovies = async (page, searchTerm = '') => {
            try {
                isError.value = false;
                isLoading.value = true;

                const movies = await apiSettings.fetchMovies(searchTerm, page);

                if (page > 1) {
                    state.value.results = [...movies.results, ...state.value.results];
                } else {
                    state.value.results = movies.results;
                }
            } catch (error) {
                isError.value = true;
            }
            isLoading.value = false;
        }

        watch(searchTerm, () => {
            fetchMovies(1, searchTerm.value);
        })

        fetchMovies(1, searchTerm.value);

        return {
            state,
            searchTerm,
            isLoading,
            isError,
        }
    },
}
</script>
