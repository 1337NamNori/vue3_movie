<template>
    <div class="wrapper bg-gray-800 py-6">
        <div class="container mx-auto px-6 sm:px-0">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                <div class="bg-gray-700 text-white text-lg rounded-full py-3 flex justify-center items-center">
                    Runtime: {{ convertedTime }}
                </div>
                <div class="bg-gray-700 text-white text-lg rounded-full py-3 flex justify-center items-center">
                    Budget: {{ convertedBudget }}
                </div>
                <div class="bg-gray-700 text-white text-lg rounded-full py-3 flex justify-center items-center">
                    Revenue: {{ convertedRevenue }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue";

import {convertMoney, calcTime} from "../../helpers/convert";

export default {
    name: "MovieInfoBar",
    props: ['time', 'budget', 'revenue'],
    setup(props) {
        const convertedTime = computed(() => {
            return calcTime(props.time);
        });

        const convertedBudget = computed(() => {
            return convertMoney(props.budget);
        });

        const convertedRevenue = computed(() => {
            return convertMoney(props.revenue);
        })

        return {
            convertedTime,
            convertedBudget,
            convertedRevenue,
        }
    }
}
</script>

<style scoped>

</style>