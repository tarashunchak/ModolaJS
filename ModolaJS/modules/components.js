Modola.components = {};

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