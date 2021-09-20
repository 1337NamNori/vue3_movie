import {ref} from "vue";
import apiSettings from "../service/api";

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

export default {
    state,
    searchTerm,
    isLoading,
    isError,
    isLoadingMore,
    fetchMovies,
}
