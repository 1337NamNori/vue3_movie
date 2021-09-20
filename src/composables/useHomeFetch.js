import {ref, watch} from "vue";
import apiSettings from "../service/api";

const useHomeFetch = () => {
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

            state.value = {
                ...movies,
                results: page > 1 ? [...state.value.results, ...movies.results] : movies.results,
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

    return {
        state,
        searchTerm,
        isLoading,
        isError,
        isLoadingMore,
        fetchMovies,
    }
}

export default useHomeFetch;
