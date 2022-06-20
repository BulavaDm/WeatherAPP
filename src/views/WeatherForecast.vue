<template>
    <div class="forecast">
        <div v-if="isLoading" class="forecast__loader">
            <app-loader/>
        </div>
        <div v-else class="forecast__content">
            <weather-card/>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import AppLoader from "../components/loader/AppLoader"
import WeatherCard from "../components/cards/WeatherCard"

export default {
    name: 'WeatherForecast',

    components: {
        AppLoader,
        WeatherCard
    },

    computed: {
        ...mapState({
            isLoading: state => state.loading.isLoading
        }),
    },
}
</script>

<style lang="scss" scoped>
    .forecast {
        height: 100%;

        &__content {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            min-height: -webkit-fill-available;
            min-height: -webkit-stretch;
            min-height: -moz-available;
            min-height: stretch;
            display: flex;
            padding: 4%;
            background-image: url("../assets/weather_bckg.jpg");
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            background-size: cover;
        }

        &__loader {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center; 
        }
    }
</style>