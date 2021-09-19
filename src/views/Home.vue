<template>
    <div class="home">
        <transition name="fade">
            <HeroImage v-if="state.results[0]"
                       :image="state.results[0].backdrop_path"
                       :text="state.results[0].overview"
                       :title="state.results[0].original_title"
            />
        </transition>
    </div>
</template>

<script>
import {ref} from "vue";
import HeroImage from "../components/HeroImage";
import apiSettings from "../service/api";

export default {
    name: 'Home',
    components: {HeroImage},
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
