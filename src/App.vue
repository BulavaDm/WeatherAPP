<template>
    <router-view/>
</template>

<script>
import defaultLocation from "./config/defaultLocation";
import storage from "./services/storage" 
import { mapMutations, mapActions } from "vuex"

export default {
    name: "App",

    created() {
        this.init();
    },

    methods: {
        ...mapMutations({
            setLoading: "loading/setLoading"
        }),

        ...mapActions({
            getWeather: "forecast/getWeatherForecast"
        }),

        init() {
            this.setLoading(true);

            (async () => {
                if (!storage.location) {
                    await this.getLocation()
                        .then((location) => {
                            storage.location = location.coords;
                        })
                        .catch((err) => {
                            storage.location = defaultLocation.coords;
                        });
                }

                await this.getWeather(storage.location);
                await this.setLoading(false);
            })();
        },

        getLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }
    }
}
</script>
