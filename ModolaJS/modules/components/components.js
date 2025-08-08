Modola.components = {};
Modola.globalComponents = {};
Modola.localComponents = [];

Modola.defineComponent = (name, func, override = false) => {
    if (Modola.components[name] && !override) {
        console.log(`[Modola] component with id: ${name} already exist. Use override = true to replce it.`);
    } else {
        Modola.components[name] = func;
    }
};

Modola.removeComponent = (name) => {
    delete Modola.components[name];
};

Modola.defineGlobalComponent = (name, comp) => {
    if (comp.type === "UI") {
        Modola.globalComponents[name] = comp.value;
    }
}

Modola.defineLocalComponent = (scope, name, comp) => {
    if (comp.type === "UI" && Modola.scopes.includes(scope)) {
        if (!Modola.localComponents[scope]) {
            Modola.localComponents[scope] = {};
        }
        Modola.localComponents[scope][name] = comp.value;
    }
}