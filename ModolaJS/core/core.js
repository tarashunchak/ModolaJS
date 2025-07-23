const Modola = {
    modules: {},
    state: {},

    registerModule(name, module) {
        this.modules[name] = module;
        if (module.init) module.init(this);
    },

    getModule(name) {
        return this.modules[name];
    },

    setState(key, value) {
        this.state[key] = value;
    },

    getState(key) {
        return this.state[key];
    }
};

window.Modola = Modola;