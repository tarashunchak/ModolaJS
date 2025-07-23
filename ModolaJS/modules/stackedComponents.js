Modola.stackedComponents = {};
Modola.stackedComponentsMap = {};

Modola.stackedComponents.add = (name, component, override = false) => {
    if (Modola.stackedComponentsMap[name] && !override)
        console.log(`[Modola] stacked component with name: ${name} already exist. Use override = true to replace it.`);
    else
        Modola.stackedComponentsMap[name] = component;
};

Modola.stackedComponents.remove = (name) => {
    delete Modola.stackedComponentsMap[name];
};

Modola.stackedComponents.show = (name) => {
    if (Modola.stackedComponentsMap[name]) {
        Modola.stackedComponentsMap[name].style.display = "block";
    }
};

Modola.stackedComponents.hide = (name) => {
    if (Modola.stackedComponentsMap[name]) {
        Modola.stackedComponentsMap[name].style.display = "none";
    }
};