Modola.events = {
    listeners: {},
    onAnyEvent: null,

    /*---[Modola] eventName - name of event
    handlerFunc - function or command name ---*/
    on(eventName, handlerFunc) {
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        if (typeof handlerFunc === "function") {
            this.listeners[eventName].push(handlerFunc);
        } else if (Modola.global[handlerFunc]) {
            this.listeners[eventName].push(Modola.global[handlerFunc]);
        }
    },

    emit(eventName, data = {}) {
        if (this.listeners[eventName]) {
            if (this.onAnyEvent) {
                this.onAnyEvent();
            }
            this.listeners[eventName].forEach(fn => { fn(data) });
        } else {
            console.error("[Modola] emited signal with no subscribers!");
        }
    },

    off(eventName, handlerFunc) {
        this.listeners[eventName] = this.listeners[eventName].filter(fn => fn != handlerFunc);
    },

    onAny(func, override = false) {
        if (typeof func === "function") {
            if (this.onAnyEvent && !override)
                console.warn(`[Modola] "onAny" event handler is exits. Use verride = true to replace it.`);
            else
                this.onAnyEvent = func;
        }
    }
}
