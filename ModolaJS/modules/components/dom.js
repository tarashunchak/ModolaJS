Modola.dom = {};

Modola.dom.el = (tag, config = {}, children = []) => {
    const el = document.createElement(tag);

    children.forEach(child => {
        if (typeof child === "string")
            el.appendChild(document.createTextNode(child));
        else
            el.appendChild(child);
    });

    if (config) {
        for (const [key, value] of Object.entries(config)) {
            if (key === "placeHolder") {
                el.placeholder = value;
            }
            if (key === "text") el.textContent = value;
            if (key === "style") {
                if (config.style && typeof config.style === "object") {
                    for (const [prop, value] of Object.entries(config.style)) {
                        el.style[prop] = value;
                    }
                }
            }
            else if (key === "html") el.innerHTML = value;
            else el.setAttribute(key, value);
        }

        if (config.emitEvent) {
            el.addEventListener(config.onEvent || "click", () => {
                Modola.events.emit(config.emitEvent, config.eventData || {});
            });
        }
        if (config.appendTo) document.querySelector(config.appendTo).appendChild(el)
    }

    return el;
}

window.M = (tag, config = {}, children = []) => Modola.dom.el(tag, config, children);