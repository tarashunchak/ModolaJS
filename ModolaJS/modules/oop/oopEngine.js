Modola.classes = {};

Modola.defineClass = (className, obj) => {
    if (typeof obj !== "object") return;
    else {
        if (Modola.classes[className]) return;
        else {
            Modola.classes[className] = obj;
        }
    }
};