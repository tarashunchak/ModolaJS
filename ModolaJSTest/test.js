Modola.defineGlobal("main", () => { return 0; });
//
/*
const classHeaderRegex = /^(global|local|dev)\s+type\s+(\w+)\s+class\s*\{$/;
const classFieldsRegex = /^(public|private)\s+(\w+)\s*:\s*(.+)\s*:=\s*(.*)\s+@json:"(.*)";$/;
const classMethodsRegex = /^(public|private)\s+(\w+)\(([^)]*)\)\s*{$/;
//
const varDefRegex = /^(global|local|dev|\w*)\s+(\w+)\s*:\s*(\w+)\s*:=\s*(.*)\s*;$/;
//
const funcHeaderArgsRegex = /^(?:(\w+)\s+)?(\w+)\s*:\s*(.+)\s*:=\s*(.+)$/;
const funcHeaderRegex = /^(global|local|dev)\s+(\w+)\(([^)]*)\)\s*->(\w+)\s*\n*{$/;
const funcCallRegex = /^(\w+)\(([^)]*)\);$/;
const funcCallArgsRegex = /^(.*)$/;
*/

const fieldSpec = ["private", "public"];
const endOfBlock = ["}", "};"];

function parseFuncParams(tokens, i) {
}

function parseScript(script) {
    const tokens = Modola.core.tokenizeScript(script);
    const result = [];

    let i = 0;
    while (i < tokens.length) {
        if (Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) && tokens[i + 1].value === "type" && tokens[i + 3].value === "class") {
            console.log("parsing class definition");
            const parsedClass = Modola.core.parseClassBlock(tokens, i);
            result.push(parsedClass);
            i = parsedClass.nextIndex;

        } else if (Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) && tokens[i + 2].value === "(") {
            console.log("parsing func definition");
            const parsedFunc = Modola.core.parseFuncBlock(tokens, i);
            result.push(parsedFunc);
            i = parsedFunc.nextIndex;

        } else if (Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) && tokens[i + 2].value === ":") {
            console.log("parsing variable definition");
            const parsedVariable = Modola.core.parseVariableDef(tokens, i);
            result.push(parsedVariable);
            i = parsedVariable.nextIndex;
        } else {
            //console.log("else in script parse");
            i++;
        }
    }

    return result;
}

// 🧪 Тест:
const script = `
    global x: int := 20;

    local y: int := 4010;
    local z: int := x;

    global type States enum {

    };

    local type AAlias alias A;

    global funcName(someVar: int)->void{
        local ddd : float;
        return ddd;
    }

    global type MyClass class {
        private name: string := "defSome" json:"first_name";
        public constructor(name: string := "defaultName") {
            this->name = name;
        };
    };
`;

console.log("parseOOP");
console.log(parseScript(script));