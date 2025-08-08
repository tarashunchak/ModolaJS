const MODULA_STD_INPUT = "modola-std-input";

Modola.ui.createInput = (_1, _2, config = {}) => {
    const input = document.createElement("input");

    if (config.onEvent) {
        input.addEventListener(config.onEvent, (e) => Modola.events.emit(config.emitEvent, e.target.value));
    }

    input.type = config.type || "text";

    input.value = config.text || '';

    if (config.value != undefined) input.value = config.value;

    input.classList.add(MODULA_STD_INPUT);
    if (config.class) {
        const classes = config.class.split(" ");
        input.classList.add(...classes);
    }
    if (config.id) input.id = config.id;
    if (config.placeholder) {
        console.log("placeholder: ", config.placeholder);
        input.placeholder = config.placeholder;
    }
    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;
    container.appendChild(input);

    if (config.style && typeof config.style === "object") {
        for (const [prop, value] of Object.entries(config.style)) {
            input.style[prop] = value;
        }
    }

    Modola.global.setSize(input, config.size);
    Modola.global.setAlignment(input, config.align);

    return {
        type: "UI",
        coreType: "Input",
        value: input
    };
};