/*---[Modola] this function will need to be fixed, 
as it does not always load these files 
before the program's main files are loaded. ---*/

(async function loadModolaModules() {
    const currentScript = document.currentScript;
    //const basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf("/") + 1);
    const basePath = "http://192.168.1.103/backend/ModolaJS/";

    const modules = [
        "ModolaJS/core/core.js",
        "ModolaJS/core/keywords.js",
        "ModolaJS/modules/defaultValues/defaultValues.js",
        "ModolaJS/modules/scopes/scopeStack.js",
        "ModolaJS/modules/components/dom.js",
        "ModolaJS/modules/modules.js",
        "ModolaJS/modules/components/components.js",
        "ModolaJS/modules/events/eventSystem.js",
        "ModolaJS/modules/sessionData.js",
        "ModolaJS/modules/temporaryData.js",
        "ModolaJS/modules/test.js",
        "ModolaJS/modules/components/stackedComponents.js",
        "ModolaJS/modules/requirements/traits.js",
        "ModolaJS/modules/requirements/mustBe.js",
        "ModolaJS/modules/requirements/traitsLib.js",
        "ModolaJS/modules/variables(objects)/variablesEngine.js",
        "ModolaJS/modules/types/types.js",
        "ModolaJS/modules/types/typeOf.js",
        "ModolaJS/modules/types/typeValidators.js",
        "ModolaJS/modules/types/typeModifiers/typeModifiers.js",
        "ModolaJS/modules/arguments/arguments.js",
        "ModolaJS/modules/constants/constants.js",
        "ModolaJS/modules/references/reference.js",
        "ModolaJS/modules/operators/operators.js",
        "ModolaJS/modules/operators/operatorsLib/additionAssign.js",
        "ModolaJS/modules/operators/operatorsLib/addition.js",
        "ModolaJS/modules/operators/operatorsLib/subtractionAssign.js",
        "ModolaJS/modules/operators/operatorsLib/subtraction.js",
        "ModolaJS/modules/operators/operatorsLib/multiplyingAssign.js",
        "ModolaJS/modules/operators/operatorsLib/multiplying.js",
        "ModolaJS/modules/operators/operatorsLib/division.js",
        "ModolaJS/modules/operators/operatorsLib/assignment.js",
        "ModolaJS/modules/operators/operatorsEngine.js",
        "ModolaJS/modules/commands/commands.js",
        "ModolaJS/modules/oop/oopEngine.js",
        "ModolaJS/modules/oop/objectEngine.js",
        "ModolaJS/parser/tokenizer.js",
        //"ModolaJS/modules/templates/templates.js",
        "ModolaJS/modules/functions/functionsEngine.js",
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
    ];

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = basePath + src;
            script.async = false;
            script.onload = () => resolve(src);
            document.head.appendChild(script);
        });
    }

    function loadStyle(href) {
        const link = document.createElement("link");
        link.href = basePath + href;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }

    for (const file of modules) {
        loadScript(file);
    }

    styles.forEach(loadStyle);
})();
