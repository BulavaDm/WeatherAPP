<template>
    <div class="current">
        <div class="current__country">{{ country }}</div>
        <div class="current__city">
            <div>{{ city }}</div>
            <router-link :to="{ name: 'SelectLocation' }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                    <path d="M257.13,125.11c40.21,0,72.52,30.23,72.52,70.43,0,38.59-32.31,70.76-72.52,70.76-40.52,0-72.85-32.17-72.85-70.76,0-40.2,32.33-70.43,72.85-70.43Zm181.54,52.42C438.67,78.79,358,0,257.13,0c-101,0-183.8,78.79-183.8,177.53,0,4.18,0,10.3,2.09,14.15H73.33c0,96.81,183.8,320.32,183.8,320.32S438.67,288.49,438.67,191.68h0V177.53Z" fill="#000"/>
                </svg>
            </router-link>
        </div>
        <div class="current__temp">{{ temp | round }}</div>
        <div class="current__description">{{ description }}</div>
        <img :src="`http://openweathermap.org/img/w/${icon}.png`" alt="Weather icon"/>
    </div>  
</template>

<script>
export default {
    name: "CurrentForecast",

    props: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        temp: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .current {
        width: 100%;
        text-align: center;
        font-size: 32px;

        @media screen and (max-width: 600px) {
            font-size: 24px;
        }

        &__country {
            font-size: 1em;
            margin-bottom: 2%;
        }

        &__city  {
            display: flex;
            justify-content: center;
            font-size: 1.5em;
        }

        &__temp {
            font-size: 2em;
            margin: 4% 0;
        }

        &__temp:after {
            content: "\00B0";
        }

        &__description {
            font-size: 0.75em;
        }

        svg {
            width: 40px;
            height: 40px;
            margin-left: 10%;
        }

        svg:hover {
            animation: location-hover 2s alternate infinite ease-in;;
        }
    }
</style>