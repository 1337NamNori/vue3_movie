import {ref} from "vue";
import apiService from "../service/api";
import {Credit, Director, MovieDetail} from "@/types";

const useMovieFetch = (movieId: number) => {
    const initialMovie = {} as MovieDetail;

    const movie = ref<MovieDetail>(initialMovie);
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const fetchMovie = async () => {
        try {
            isLoading.value = true;
            isError.value = false;

            const result: MovieDetail = await apiService.fetchMovie(movieId);
            const credits: Credit = await apiService.fetchCredits(movieId);

            isLoading.value = false;

            const directors: Director[] = credits.crew.filter(member => member.job === 'Director');

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