const Modola = {
    modules: {},
    state: {},
    tokens: [],
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
//Modola.killProgram = () => { Modola = null; };

window.Modola = Modola;