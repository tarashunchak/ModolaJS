(function loadModulaModules() {
    const basePath = "http://192.168.1.103/backend/Modula/";
    const modules = [
        "ModulaJS/core/core.js",
        "ModulaJS/modules/dom.js",
        "ModulaJS/modules/components.js",
        "ModulaJS/modules/commands.js",
        "ModulaJS/modules/eventSystem.js",
        "ModulaJS/modules/sessionData.js",
        "ModulaJS/modules/temporaryData.js",
        "ModulaJS/modules/traits.js",
        "ModulaJS/modules/modal.js",
        "ModulaJS/modules/test.js",
        "ModulaJS/modules/stackedComponents.js",
        "ModulaJS/modules/modules.js",
        "ModulaJS/modules/mustBe.js",
        "ModulaJS/modules/traitsLib.js",
        "ModulaJS/modules/ui/ui.js",
        "ModulaJS/modules/ui/buttons.js",
        "ModulaJS/modules/ui/input.js",
        "ModulaJS/modules/ui/select.js",
        "ModulaJS/modules/ui/modal.js",
        "ModulaJS/modules/ui/table.js",
    ];

    const styles = [
        "ModulaCSS/modula.css",
        "ModulaCSS/modula_table.css",
        "ModulaCSS/modula_buttons.css"
    ]

    modules.forEach(file => {
        const script = document.createElement("script");
        script.src = basePath + file;
        script.defer = true;
        document.head.appendChild(script);
    });

    styles.forEach(file => {
        const link = document.createElement("link");
        link.href = basePath + file;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    });
})();