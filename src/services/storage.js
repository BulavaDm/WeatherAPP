const storage = {
    get location() {
        return sessionStorage.location ? JSON.parse(sessionStorage.location) : null;
    },

    set location(position) {
        sessionStorage.setItem('location', JSON.stringify({
            latitude: position.latitude,
            longitude: position.longitude
        }));
    }
}

export default storage