let modulaStdClasses = [];
modulaStdClasses["Button"] = "modula-std-button";
modulaStdClasses["IconButton"] = "modula-std-icon-button";
const MODOLA_STD_BUTTON = "modula-std-button";
const MODOLA_STD_ICON_BUTTON = "modula-std-icon-button";
const MODOLA_STD_TOGGLE_BUTTON_LABEL = "modula-std-toggle-button-label";
const MODOLA_STD_TOGGLE_BUTTON_INPUT = "modula-std-toggle-button-input";
const MODOLA_STD_TOGGLE_BUTTON_SPAN = "modula-std-toggle-button-span";

Modola.ui.createButton = (text, onClick = {}, config = {}) => {
    const btn = document.createElement("button");
    btn.textContent = text;

    if (onClick) {
        if (typeof onClick === "function")
            btn.addEventListener("click", onClick);
    }

    if (config.emitEvent) {
        Modola.events.emit(config.emitEvent);
    }

    btn.classList.add(MODOLA_STD_BUTTON);

    if (config.class) {
        const classes = config.class.split(" ");
        btn.classList.add(...classes);
    }
    if (config.id) btn.id = config.id;
    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;
    container.appendChild(btn);
    if (config.style && typeof config.style === "object") {
        for (const [prop, value] of Object.entries(config.style)) {
            btn.style[prop] = value;
        }
    }

    return btn;
};

Modola.ui.createIconButton = (path, text, onClick, config = {}) => {
    //
    const btn = document.createElement("button");
    btn.classList.add(MODOLA_STD_ICON_BUTTON);
    if (config.class) {
        const classes = config.class.split(" ");
        btn.classList.add(...classes);
    }
    if (config.btn_id) btn.id = config.btn_id
    if (typeof onClick === "function") {
        btn.addEventListener("click", onClick);
    }
    //
    const icon = document.createElement("img");
    icon.src = path;
    if (config.alt) icon.alt = config.alt;
    if (config.img_class) icon.className = config.img_class;
    if (config.img_id) icon.id = config.img_id;
    //
    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;
    container.appendChild(btn);

    const span = document.createElement("span");
    span.textContent = text;

    btn.appendChild(icon);
    btn.appendChild(span);
    return btn;
};

Modola.ui.createToggleButton = (onClick, config = {}) => {
    const toggleLabel = document.createElement("label");
    const toggleInput = document.createElement("input");
    const toggleSpan = document.createElement("span");

    toggleInput.type = "checkbox";

    if (typeof onClick === "function") {
        btn.addEventListener("click", onClick);
    }

    toggleLabel.classList.add(MODOLA_STD_TOGGLE_BUTTON_LABEL);
    toggleInput.classList.add(MODOLA_STD_TOGGLE_BUTTON_INPUT);
    toggleSpan.classList.add(MODOLA_STD_TOGGLE_BUTTON_SPAN);

    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSpan);
    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;

    container.appendChild(toggleLabel);

    return toggleLabel;
};
