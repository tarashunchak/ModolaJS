const MODULA_STD_SELECT = "modula-std-select";
const MODULA_STD_OPTION = "modula-std-option";

Modola.ui.createSelect = (items, config = {}) => {
    const select = document.createElement("select");

    for (let i = 0; i < items.length; i++) {
        const option = document.createElement("option");
        if (items[i].value && items[i].label) {
            option.value = items[i].value;
            option.textContent = items[i].label;
            if (config.option_id) {
                option.id = config.option_id;
                Modola.defineComponent(option.id, option);
            }
            option.classList.add(MODULA_STD_OPTION);
            if (config.option_class) {
                const classes = config.option_class.split(" ");
                option.classList.add(...classes);
            }
            select.appendChild(option);
        }
    }

    if (config.onChange) {
        if (typeof config.onChange === "function")
            select.addEventListener("change", e => config.onChange(e.value));
    }

    if (config.emitEvent) {
        if (typeof config.emitEvent === "string")
            select.addEventListener("change", () => Modola.events.emit(config.emitEvent));
    }

    if (config.select_id) {
        select.id = config.select_id;
        Modola.defineComponent(select.id, select);
    }
    select.classList.add(MODULA_STD_SELECT);
    if (config.select_class) {
        const classes = config.select_class.split(" ");
        select.classList.add(...classes);
    }

    const container = config.appendTo ? document.querySelector(config.appendTo)
        : document.body;
    container.appendChild(select);

    return select;
};