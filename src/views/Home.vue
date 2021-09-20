<template>
    <div class="home">
        <transition name="fade">
            <HeroImage v-if="state.results[0]"
                       :image="state.results[0].backdrop_path"
                       :text="state.results[0].overview"
                       :title="state.results[0].original_title"
            />
        </transition>
        <transition name="fade">
            <Grid v-if="state.results.length > 0" header="Popular Movies">
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
import {ref} from "vue";
import HeroImage from "../components/HeroImage";
import apiSettings from "../service/api";
import Spinner from "../components/Spinner";
import Grid from "../components/Grid";
import MovieThumb from "../components/MovieThumb";

export default {
    name: 'Home',
    components: {MovieThumb, Grid, Spinner, HeroImage},
    setup() {
        const initialState = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0,
        }

        const state = ref(initialState);
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

        fetchMovies();

        return {
            state,
            isLoading,
            isError,
        }
    },
}
</script>
