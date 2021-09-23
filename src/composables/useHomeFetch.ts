import {ref, watch} from "vue";
import apiService from "../service/api";
import {Movies} from "@/types";

const useHomeFetch = () => {
    const initialState = {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
    } as Movies

    const state = ref<Movies>(initialState);
    const searchTerm = ref<string>('');
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);
    const isLoadingMore = ref<boolean>(false);

    const fetchMovies = async (page: number, searchTerm = '') => {
        try {
            isError.value = false;
            isLoading.value = true;

            const movies = await apiService.fetchMovies(searchTerm, page);

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
