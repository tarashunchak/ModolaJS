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

/*---[Modola Parser] this function will need to be fixed, 
as it does not always load these files before the program's main files are loaded. ---*/

Modola.defineCore("parseScript", async (pathURL) => {

  const moduleFile = new URL(pathURL, Modola.core.mainFilePath);
  const response = await fetch(moduleFile.href);
  const script = await response.text();

  const tokens = Modola.tokenizeScript(script);
  const result = [];

  Modola.core.isTypeDefining = (locTokens, i, type) =>
    Modola.keywords.modifiers.scopeModifiers.includes(locTokens[i].value)
    && locTokens[i + 1].value === "type" && locTokens[i + 3].value === type;

  let i = 0;
  while (i < tokens.length) {

    if (tokens[i] === ';') i++;

    /*---[Modola Parser] parsing class type definition ---*/
    if (Modola.core.isTypeDefining(tokens, i, "class")) {
      const parsedClass = Modola.core.parseClassBlock(tokens, i);
      result.push(parsedClass);
      i = parsedClass.nextIndex;
    }
    /*---[Modola Parser] parsing enum type definition ---*/
    else if (Modola.core.isTypeDefining(tokens, i, "enum")) {
      const parsedEnum = Modola.core.parseEnumBlock(tokens, i);
      result.push(parsedEnum);
      i = parsedEnum.nextIndex;
    }
    else if (Modola.parserUtils.isUnsafeBlock(tokens, i)) {
      const unsafeBlock = {
        kind: "unsafeBlock",
        body: []
      };
      let lines = ";";
      i += 2;
      while (tokens[i].value !== "}") {
        lines += tokens[i].value;
        if (tokens[i].value === ";") {
          unsafeBlock.body.push(lines);
          lines = '';
        }
        i++;
      }
      result.push(unsafeBlock);
    }
    /*---[Modola Parser] parsing function definition ---*/
    else if (Modola.keywords.modifiers.scopeModifiers.includes(tokens[i].value) &&
      tokens[i + 2].value === "(") {

      const parsedFunc = Modola.core.parseFuncBlock(tokens, i);
      result.push(parsedFunc);
      i = parsedFunc.nextIndex;
    }
    /*---[Modola Parser] parsing constant definition ---*/
    else if (Modola.parserUtils.isConstantDef(tokens, i)) {
      const parsedConstant = Modola.core.parseConstantDef(tokens, i);
      result.push(parsedConstant);
      i = parsedConstant.nextIndex;
    }
    /*---[Modola Parser] parsing variables definition ---*/
    else if (Modola.parserUtils.isVariableDef(tokens, i)) {
      const parsedVariable = Modola.core.parseVariableDef(tokens, i);
      result.push(parsedVariable);
      i = parsedVariable.nextIndex;
    }
    /*---[Modola Parser] parsing component definition ---*/
    else if (Modola.parserUtils.isComponentDef(tokens, i)) {
      const parsedComponent = Modola.core.parseComponentDec(tokens, i);
      result.push(parsedComponent);
      i = parsedComponent.nextIndex;
    }
    /*---[Modola Parser] recursive parsing of imported .modola files ---*/
    else if (tokens[i].value === "import" && tokens[i + 1].value === "{") {
      const parsedImports = Modola.core.parseImportBlock(tokens, i);
      result.push(parsedImports);
      i = parsedImports.nextIndex;
      if (parsedImports.imports) {
        for (let index = 0; index < parsedImports.imports.length; index++) {
          let path = parsedImports.imports[index];
          if (typeof path === "object" && typeof path.value === "string") {
            path = path.value;
          }
          path = path.replace(/^["']|["']$/g, "");

          const res = await Modola.core.parseScript(path);
          result.push({
            kind: "importedScript",
            from: parsedImports.imports[index],
            body: res
          });
        }
      }
    }
    else {
      i++;
    }
  }

  return result;
});