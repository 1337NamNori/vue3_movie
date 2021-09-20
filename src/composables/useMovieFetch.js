import {ref} from "vue";
import apiService from "../service/api";

const useMovieFetch = (movieId) => {
    const movie = ref({});
    const isLoading = ref(false);
    const isError = ref(false);

    const fetchMovie = async () => {
        try {
            isLoading.value = true;
            isError.value = false;

            const result = await apiService.fetchMovie(movieId);
            const credits = await apiService.fetchCredits(movieId);

            isLoading.value = false;

            const directors = credits.crew.filter(member => member.job === 'Director');

            movie.value = {
                ...result,
                directors,
                actors: credits.cast,
            };
        } catch (error) {
            isError.value = true;
        }
    }

    return {
        isError,
        isLoading,
        movie,
        fetchMovie,
    }
}

export default useMovieFetch;