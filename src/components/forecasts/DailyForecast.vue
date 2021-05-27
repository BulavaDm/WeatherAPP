<template>
    <div class="daily">
        <p class="daily__date">
            {{ dailyDate }}
        </p>
        <div class="daily__params">
            <div class="param">
                <div>MAX</div>
                <div class="param__temp">{{ maxTemp | round }}</div>
            </div>
            <div class="param">
                <div>MIN</div>
                <div class="param__temp">{{ minTemp | round }}</div>
            </div>
            <div class="param">
                <div>HUM</div>
                <div>{{ humidity }}%</div>
            </div>
            <div class="param">
                <div>WIND</div>
                <div>{{ windSpeed }}m/s</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDate, getNameMonth, getDayName } from '../../services/dateTime'

export default {
    name: "DailyForecast",

    props: {
        dateTime: {
            type: Number,
            required: true
        },

        maxTemp: {
            type: Number,
            required: true
        },

        minTemp: {
            type: Number,
            required: true
        },

        humidity: {
            type: Number,
            required: true
        },

        windSpeed: {
            type: Number,
            required: true
        }
    },

    computed: {
        dailyDate() {
            return `${this.date} ${this.month}, ${this.day}`;
        },

        date() {
            return getDate(this.dateTime);
        },

        month() {
            return getNameMonth(this.dateTime);
        },

        day() {
            return getDayName(this.dateTime);
        }
    }
}
</script>

<style scoped lang="scss">
    .daily {
        text-align: center;
        font-size: 32px;

        @media screen and (max-width: 600px) {
            font-size: 20px;
        }

        &__date {
            font-size: 0.75em;
            margin-bottom: 2%;
        }

        &__params {
            display: flex;
            justify-content: center;
            font-size: 1em;
        }
    }

    .param {
        margin: 0 2%;

        &__temp:after {
            content: "\00B0";
        }
    }
</style>