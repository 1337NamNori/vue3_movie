<template>
    <div v-if="isLoading">
        <Spinner/>
    </div>
    <div v-else-if="isError">
        <Error/>
    </div>
    <div v-else>
        <BreadCrumb :title="state.original_title"/>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";

import BreadCrumb from "../components/movie/BreadCrumb";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import apiSettings from "../service/api";

export default {
    name: "Movie",
    components: {
        Error,
        Spinner,
        BreadCrumb
    },
    setup() {
        const movieId = useRoute().params.id;

        const state = ref({});
        const isLoading = ref(false);
        const isError = ref(false);

        const fetchMovie = async () => {
            try {
                isLoading.value = true;
                isError.value = false;

                const movie = await apiSettings.fetchMovie(movieId);
                const credits = await apiSettings.fetchCredits(movieId);
                const directors = credits.crew.filter(member => member.job === 'Director');

                state.value = {
                    ...movie,
                    directors,
                    actors: credits.cast,
                };

                console.log(state.value);

                isLoading.value = false;
            } catch (error) {
                isError.value = true;
            }
        }

        fetchMovie();

        return {
            state,
            isLoading,
            isError,
        }
    }
}
</script>

<style scoped>

</style>