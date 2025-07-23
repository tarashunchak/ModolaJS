Modola.modules = [];

Modola.modules.addModule = (module) => {
    if (module.name) {
        Modola.modules.push(module);
        if (!module.init) {
            module.init = () => {
                console.log(`Init module: ${module.name}`);
            }
        }
    } else {
        console.log(`Cannot add module without name`);
        document.getElementsByTagName("html")[0].innerHTML = Modola.dom.el("p", {
            style: {
                fontSize: "24px",
                color: "black"
            },
            text: `Cannot add module without name;`
        }).innerHTML;
    }
};

Modola.initModules = () => {
    Modola.modules
        .sort((a, b) => (a.priority || 0) - (b.priority || 0))
        .forEach(mod => {
            if (typeof mod.init === "function") mod.init()
        }
        );
}