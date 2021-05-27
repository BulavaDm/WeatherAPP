<template>
    <div class="location-card">
        <div class="location-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                <path d="M257.13,125.11c40.21,0,72.52,30.23,72.52,70.43,0,38.59-32.31,70.76-72.52,70.76-40.52,0-72.85-32.17-72.85-70.76,0-40.2,32.33-70.43,72.85-70.43Zm181.54,52.42C438.67,78.79,358,0,257.13,0c-101,0-183.8,78.79-183.8,177.53,0,4.18,0,10.3,2.09,14.15H73.33c0,96.81,183.8,320.32,183.8,320.32S438.67,288.49,438.67,191.68h0V177.53Z" fill="#000"/>
            </svg>
        </div>
        <div class="location-card__title">Search required location</div>
        <div class="location-card__search">
            <div class="search" :class="{ 'not-empty': !!filteredLocations.length }">
                <input 
                    type="text"
                    v-model="searchValue"
                    @input="searchLocation" 
                />
                <button type="button" @click="saveLocation" :disabled="!selectedLocation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                        <path d="M346.5,164.74H284.73V57.88H346.5ZM512,51V486.4A25.66,25.66,0,0,1,486.39,512H25.61A25.66,25.66,0,0,1,0,486.4V25.62A25.68,25.68,0,0,1,25.61,0H461ZM126.61,164.54a22,22,0,0,0,21.91,21.91h215a22,22,0,0,0,21.91-21.91V36.19H126.61ZM433,299.83a24,24,0,0,0-23.94-23.92H102.91A24,24,0,0,0,79,299.83V476.66H433Z" fill="#000"/>
                    </svg>
                </button>
                <div class="search__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                        <path d="M503.4,438.34l-152-152.21a188.91,188.91,0,0,0,26.81-95.48C378.89,86.09,294.84.75,190.4,0S.75,83.43,0,188,83.3,377.91,187.72,378.65a187.94,187.94,0,0,0,98.83-27.34L438.44,503.39a29.63,29.63,0,0,0,41.77,0l23.2-23.21A29.7,29.7,0,0,0,503.4,438.34ZM188,335.3c-80.54-.55-145.34-66.37-144.76-147s66.3-145.53,146.84-145,145.33,66.38,144.76,147A146.07,146.07,0,0,1,188,335.3Z" fill="#000"/>
                    </svg>
                </div>
            </div>
            <virtual-list class="virtual-list"
                :data-key="'id'"
                :data-sources="filteredLocations"
                :data-component="itemComponent"
                :extra-props="{ search: searchValue, handleClick: selectLocation }"
                :keeps="20"
                :estimate-size="50"
            /> 
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex"
import storage from "../../services/storage"
import locations from "../../UA_Locations.json"
import VirtualList from 'vue-virtual-scroll-list'
import SearchItem from "../search/SearchItem"

export default {
    name: "LocationCard",

    data() {
        return {
            searchValue: '',
            filteredLocations: [],
            itemComponent: SearchItem,
            selectedLocation: null
        }
    },

    methods: {
        ...mapMutations({
            setLoading: "loading/setLoading"
        }),
        ...mapActions({
            getWeather: "forecast/getWeatherForecast"
        }),

        searchLocation() {
            this.filteredLocations = locations.filter(location => location.name.toUpperCase().includes(this.searchValue.toUpperCase()));
        },

        selectLocation(location) {
            this.selectedLocation = {
                latitude: location.coord.lat,
                longitude: location.coord.lon
            }

            this.searchValue = location.name;
            this.filteredLocations = [];
        },

        saveLocation() {
            storage.location = this.selectedLocation;

            this.setLoading(true);

            this.$router.push({ name: "WeatherForecast" });

            (async () => {
                await this.getWeather(storage.location);
                await this.setLoading(false);
            })();
        },
    }    
}
</script>

<style scoped lang="scss">
    .location-card {
        width: 100%;
        max-width: 800px;
        background: linear-gradient(180deg, #E6E9EF 0%, rgba(133, 143, 209, 0) 39.06%, rgba(254, 254, 254, 0.48) 100%);
        border-radius: 16px;
        padding: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
        color: #000;

        @media screen and (max-width: 600px) {
            font-size: 10px;
        }

        &__icon {
            width: 40px;
            height: 40px;
        }

        &__title {
            font-size: 2em;
            margin-top: 1%;
        }

        &__search {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }

    .search {
        width: 100%;
        position: relative;
        padding: 2% 10%;
        font-size: 1.5em;
        border-radius: 8px;
        background: #EDF0F4;
        margin-top: 5%;

        input {
            width: 100%;
            background: transparent;
        }

        &__icon {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 0;
            top: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5%;
            margin-left: 5%;
        }

        button {
            position: absolute;
            transform: translate(-50%, -50%);
            right: 0;
            top: 50%;
            width: 5%;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .not-empty {
        border-radius: 8px 8px 0 0;
    }

    .virtual-list {
        width: 100%; 
        height: 450px; 
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0;
        }
    }
</style>