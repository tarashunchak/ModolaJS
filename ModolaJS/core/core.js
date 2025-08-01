const Modola = {
    modules: undefined,
    state: undefined,
    tokens: undefined,

    //
    keywords: {},
    //
    ui: undefined,

    //events system
    events: undefined,

    //scopes for commands storage
    global: undefined,
    local: undefined,
    dev: undefined,

    //variables and constants
    variables: undefined,
    constants: undefined,

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

Modola.killProgram = () => {
    window.Modola = null;
};

window.Modola = Modola;
