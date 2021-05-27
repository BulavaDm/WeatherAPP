import weatherAPI from '../../config/api';

const forecast = {
    namespaced: true,
    state: {
        current: {},
        daily: []
    },
    mutations: {
        setCurrentForecast(state, current) {
            state.current = current;
        },
        setDailyForecast(state, daily) {
            state.daily = daily;
        },
    },
    actions: {
        async getWeatherForecast({ commit, dispatch }, location) {
            const dailyForecast = dispatch('getDailyForecast', location);
            const currentForecast = dispatch('getCurrentForecast', location);

            return await Promise.all([dailyForecast, currentForecast])
                .then(([daily, current]) => { 
                    commit('setCurrentForecast', current.data);
                    commit('setDailyForecast', daily.data.daily);
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getDailyForecast(_, location) {
            return weatherAPI.get('/onecall', {
                params: {
                    lat: location.latitude,
                    lon: location.longitude,
                    units: 'metric',
                    exclude: ['minutely', 'hourly', 'current'],
                    appid: process.env.VUE_APP_API_KEY
                }
            })
        },

        getCurrentForecast(_, location) {
            return weatherAPI.get('/weather', {
                params: {
                    lat: location.latitude,
                    lon: location.longitude,
                    units: 'metric',
                    appid: process.env.VUE_APP_API_KEY
                }
            })
        },
    }
  };
  
  export default forecast;