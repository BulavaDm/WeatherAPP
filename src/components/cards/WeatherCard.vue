<template>
    <div class="weather-card">
        <div class="weather-card__calendar">
            <calendar-day v-for="day in daily" :key="day.dt"
                :date-time="day.dt"
                :is-selected="selectedDay.dt === day.dt"
                @click="handleClick"
            />
        </div>
        <div class="weather-card__current">
            <current-forecast
                :country="country"
                :city="current.name"
                :temp="current.main.temp"
                :description="current.weather[0].main"
                :icon="current.weather[0].icon"
            />
        </div>
        <div class="weather-card__daily">
            <daily-forecast
                :date-time="selectedDay.dt"
                :max-temp="selectedDay.temp.max"
                :min-temp="selectedDay.temp.min"
                :humidity="selectedDay.humidity"
                :wind-speed="selectedDay.wind_speed"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import countries from "../../countries.list"; 
import CalendarDay from "../calendar/CalendarDay"
import CurrentForecast from "../forecasts/CurrentForecast"
import DailyForecast from "../forecasts/DailyForecast"

export default {
    name: "WeatherForecast",

    components: {
        CalendarDay,
        CurrentForecast,
        DailyForecast
    },

    data() {
        return {
            selectedDay: null
        }
    },

    created() {
        this.init();
    },

    computed: {
        ...mapState({
            current: state => state.forecast.current,
            daily: state => state.forecast.daily,
        }),

        country() {
            return countries[this.current.sys.country];
        }
    },

    methods: {
        init() {
            this.selectedDay = this.daily[0];
        },

        handleClick(dateTime) {
            this.selectedDay = this.daily.find(day => day.dt === dateTime);
        }
    }
}
</script>

<style scoped lang="scss">
    .weather-card {
        width: 100%;
        max-width: 600px;
        background: linear-gradient(180deg, #E6E9EF 0%, rgba(133, 143, 209, 0) 39.06%, rgba(254, 254, 254, 0.48) 100%);
        border-radius: 16px;
        margin-left: 10%;
        padding: 2%;
        display: flex;
        flex-direction: column;
        color: #000;

        @media screen and (max-width: 600px) {
            margin-left: 0;
        }

        &__calendar {
            display: flex;
        }

        &__current {
            display: flex;
            align-items: center;
            flex-grow: 1;
        } 
    }
</style>