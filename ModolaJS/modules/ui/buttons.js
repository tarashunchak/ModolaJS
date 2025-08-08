let modolaStdClasses = [];
modolaStdClasses["Button"] = "modola-std-button";
modolaStdClasses["IconButton"] = "modola-std-icon-button";
const MODOLA_STD_BUTTON = "modola-std-button";
const MODOLA_STD_ICON_BUTTON = "modola-std-icon-button";
const MODOLA_STD_TOGGLE_BUTTON_LABEL = "modola-std-toggle-button-label";
const MODOLA_STD_TOGGLE_BUTTON_INPUT = "modola-std-toggle-button-input";
const MODOLA_STD_TOGGLE_BUTTON_SPAN = "modola-std-toggle-button-span";

Modola.ui.createButton = (_1, _2, config = {}) => {
    const btn = document.createElement("button");
    btn.textContent = config.text;

    if (config.onClick && config.onClick.kind === "emitDec") {
        btn.addEventListener("click", () => {
            Modola.events.emit(config.onClick.value);
        }
        );
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
            if (prop !== "display")
                btn.style[prop] = value;
        }
    }

    Modola.global.setSize(btn, config.size);
    Modola.global.setMinSize(btn, config.minSize);
    Modola.global.setMaxSize(btn, config.maxSize);
    Modola.global.setAlignment(btn, config.align);
    Modola.global.setPosition(btn, config.position);
    Modola.global.setShadow(btn, config.shadow);
    Modola.global.setDraggable(btn, config.draggable);

    return {
        type: "UI",
        innerType: "Button",
        value: btn
    };
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

    Modola.global.setAlignment(btn, config.align);

    return btn;
};

Modola.ui.createToggleButton = (_1, _2, config = {}) => {
    const toggleLabel = document.createElement("label");
    const toggleInput = document.createElement("input");
    const toggleSpan = document.createElement("span");

    toggleInput.type = "checkbox";

    const activeColor = config.style.backgroundColor || "#2196F3";
    toggleInput.addEventListener("change", () => {
        if (config.onChange && config.onChange.kind === "emitDec") {
            Modola.events.emit(config.onChange.value);
        }
        toggleSpan.style.backgroundColor = toggleInput.checked ? activeColor : "#ccc";
    });
    toggleInput.addEventListener("focus", () => {
        if (config.onFocus && config.onFocus.kind === "emitDec") {
            Modola.events.emit(config.onFocus.value);
        }
        toggleSpan.style.backgroundColor = toggleInput.checked ? activeColor : "#ccc";
    });

    toggleLabel.classList.add(MODOLA_STD_TOGGLE_BUTTON_LABEL);
    toggleInput.classList.add(MODOLA_STD_TOGGLE_BUTTON_INPUT);
    toggleSpan.classList.add(MODOLA_STD_TOGGLE_BUTTON_SPAN);

    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSpan);
    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;

    container.appendChild(toggleLabel);

    Modola.global.setAlignment(toggleInput, config.align);

    toggleLabel.isActive = () => toggleInput.checked;

    return toggleLabel;
};
