const loading = {
    namespaced: true,
    state: {
        isLoading: false
    },
    mutations: {
        setLoading(state, value) {
            state.isLoading = value;
        }
    },
  };
  
  export default loading;