Modola.useState = obj => {
    let proxy = new Proxy(obj, {
        set(target, prop, value, receiver) {
            if (target[prop] !== value) {
                target[prop] = value;
                if (target[emitOnChange]) {
                    Modola.events.emit(target[emitOnChange]);
                } else {
                    Modola.events.emit(prop + "Changed");
                }
            }
        },
        get(target, prop, reseiver) {
            return target[prop];
        }
    })
};