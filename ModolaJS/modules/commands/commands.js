Modola.global = {};
Modola.local = {};
Modola.dev = {};

let modulesLocalsBuff = {};

let isCallable = () => {

};

Modola.defineDev = (name, func, override = false) => {
    if (Modola.mode === Modola.DEV_MODE) {
        if (func) {
            if (Modola.dev[name] && name && !override) {
                console.warn(`[Modola] dev command with name: ${name} already exist. Use override = true to replace it.`);
                document.body.innerHTML = Modola.dom.el("p", {
                    text: `[Modola] dev command with name: "${name}"  already exist. Use override = true to replace it.`
                }).innerHTML;
            } else {
                if (typeof func === "function") {
                    Modola.dev[name] = func;
                } else {
                    console.warn(`[Modola] dev command with name: ${name} must be a "function" type.`);
                    document.body.innerHTML = Modola.dom.el("p", {
                        text: `[Modola] dev command with name: ${name} must be a "function" type.`
                    }).innerHTML;
                }
            }
        } else {

        }
    } /*else {
        //Sorry, you cannot use this func in release mode)))
    }*/
};

Modola.defineLocal = (name, func, override = false) => {
    if (Modola.global[name] && name === "main" && override) {
        console.error('%c[Modola] "main" command already exist. You cannot override it.', 'color: red; font-weight: bold');
        Modola = null;
        return;
    }
    if (Modola.local[name] && name && !override) {
        console.warn(`[Modola] local command with name: ${name} already exist. Use override = true to replace it.`);
        document.body.innerHTML = Modola.dom.el("p", {
            text: `[Modola] command with name: "${name}"  already exist. Use override = true to replace it.`
        }).innerHTML;
    } else {
        Modola.local[name] = () => {
            console.log("local command called");
            const err = new Error;
            console.log(err.stack);
            func();
        };
    }
};

Modola.defineGlobal = (name, func, override = false) => {
    if (Modola.global[name] && name === "main" && override) {
        console.error('%c[Modola] "main" command already exist. You cannot override it.', 'color: red; font-weight: bold');
        Modola = null;
        return;
    }
    if (Modola.global[name] && name && !override) {
        console.warn(`[Modola] global command with name: ${name} already exist. Use override = true to replace it.`);
        document.body.innerHTML = Modola.dom.el("p", {
            text: `[Modola] global command with name: "${name}"  already exist. Use override = true to replace it.`
        }).innerHTML;
    } else {
        Modola.global[name] = func;
    }
};

Modola.deleteGlobal = name => {
    Modola.global[name] = null;
};

Modola.deleteLocal = name => {
    Modola.local[name] = null;
};

document.addEventListener("DOMContentLoaded", () => {
    if (Modola.global["main"]) {
        console.log("Main is running");
        if (Modola.global.main() !== 0) {
            console.error('%c[Modola] "main" command should  return "0"', 'color: red; font-weight: bold');
            document.body.innerHTML = Modola.dom.el("p", {
                text: `[Modola] "main" command should return "0".`
            }).innerHTML;
            //Modola = null;
        }
    } else {
        console.error('%c[Modola] "main" command is not defined. Define it to launch your app.', 'color: red; font-weight: bold');
        document.body.innerHTML = Modola.dom.el("p", {
            text: '[Modola]: main() is not defined. Define it to launch your app.'
        }).innerHTML;
        //Modola = null;
    }
});