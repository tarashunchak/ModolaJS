const MODULA_STD_MODAL = "modula-std-modal";

Modola.ui.makeModal = (obj, onEvent, config = {}) => {
    const modal = document.createElement("div");
    modal.classList.add(MODULA_STD_MODAL);
    if (config.class) {
        const classes = config.class.split(" ");
        modal.classList.add(...classes);
    }
    if (obj) modal.appendChild(obj);
    if (config.id) modal.id = config.id;

    return modal;
};