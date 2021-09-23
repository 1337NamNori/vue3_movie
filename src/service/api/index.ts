import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    API_URL,
    API_KEY,
} from '../../config';
import {Credit, MovieDetail, Movies} from "@/types";

const apiSettings = {
    fetchMovies: async (searchTerm:string, page:number): Promise<Movies> => {
        const endpoint = searchTerm
            ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
            : `${POPULAR_BASE_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchMovie: async (movieId: number): Promise<MovieDetail> => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchCredits: async (movieId: number): Promise<Credit> => {
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
};

export default apiSettings;