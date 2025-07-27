(function loadModolaModules() {
    const basePath = "http://192.168.1.103/backend/ModolaJS/";
    const modules = [
        "ModolaJS/core/core.js",
        "ModolaJS/core/keywords.js",
        "ModolaJS/modules/scopes/scopeStack.js",
        "ModolaJS/modules/components/dom.js",
        "ModolaJS/modules/components/components.js",
        "ModolaJS/modules/commands/commands.js",
        "ModolaJS/modules/events/eventSystem.js",
        "ModolaJS/modules/sessionData.js",
        "ModolaJS/modules/temporaryData.js",
        "ModolaJS/modules/test.js",
        "ModolaJS/modules/components/stackedComponents.js",
        "ModolaJS/modules/modules.js",
        "ModolaJS/modules/requirements/traits.js",
        "ModolaJS/modules/requirements/mustBe.js",
        "ModolaJS/modules/requirements/traitsLib.js",
        "ModolaJS/modules/types/types.js",
        "ModolaJS/modules/types/typeValidators.js",
        "ModolaJS/modules/types/typeModifiers/typeModifiers.js",
        "ModolaJS/modules/operators/operators.js",
        "ModolaJS/modules/operators/operatorsLib/addition.js",
        "ModolaJS/modules/operators/operatorsLib/subtraction.js",
        "ModolaJS/modules/operators/operatorsLib/division.js",
        "ModolaJS/modules/operators/operatorsLib/assignment.js",
        "ModolaJS/modules/operators/operatorsEngine.js",
        "ModolaJS/modules/references/reference.js",
        "ModolaJS/modules/templates/templates.js",
        "ModolaJS/modules/ui/ui.js",
        "ModolaJS/modules/ui/buttons.js",
        "ModolaJS/modules/ui/input.js",
        "ModolaJS/modules/ui/select.js",
        "ModolaJS/modules/ui/modal.js",
        "ModolaJS/modules/ui/table.js",
    ];

    const styles = [
        "ModolaCSS/modula.css",
        "ModolaCSS/modula_table.css",
        "ModolaCSS/modula_buttons.css"
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