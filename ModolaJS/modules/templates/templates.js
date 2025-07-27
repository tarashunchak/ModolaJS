Modola.templates = {};

Modola.defineTemplate = (typenames, name, func) => {
    if (!Array.isArray(typenames) || typeof name !== "stirng" || typeof func !== "function") {
        return;
    }

    let templateName = `template<${typenames.map((tName) => `typename ${tName}`).join(`,`)}>${name}`;

    if (Modola.templates[name]) {
        console.error(`[Modola] ${templateName} allready exist, you cannot override it.`);
    }
}