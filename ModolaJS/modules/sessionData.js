Modola.sessionData = {
    set(key, value, override = false) {
        if (sessionStorage.getItem(key) && !override) {
            console.log(`[Modola] session data item with key: ${key} already exist. Use override = true to replace it.`);
            document.getElementsByTagName("html")[0].innerHTML = Modola.dom.el("p", {
                text: `[Modola] session data item with key: "${key}"  already exist. Use override = true to replace it.`
            }).innerHTML;
        } else {
            sessionStorage.setItem(key, value);
        }
    },

    get(key) {
        const item = sessionStorage.getItem(key);
        return item ? item : null;
    },

    remove(key) {
        sessionStorage.removeItem(key);
    },

    clear() {
        sessionStorage.clear();
    }
}