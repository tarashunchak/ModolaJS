Modola.temporaryData = {
    storage: {},
    set(key, value) {
        this.storage[key] = value;
    },

    get(key) {
        return this.storage[key];
    },

    remove(key) {
        delete this.storage[key];
    },

    clear() {
        this.storage = {};
    }
}