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

    if (tokens[i].type === "unsafeBlock") {
      const unsafeBlock = {
        kind: "unsafeBlock",
        value: tokens[i].value
      };
      result.push(unsafeBlock);
      i++;
    }
    /*---[Modola Parser] parsing class type definition ---*/
    else if (Modola.core.isTypeDefining(tokens, i, "class")) {
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
    /*---[Modola Parser] parsing operator declaration ---*/
    else if (Modola.parserUtils.isOperatorDec(tokens, i)) {
      const parsedOpDec = Modola.core.parseOperatorDec(tokens, i);
      result.push(parsedOpDec);
      i = parsedOpDec.nextIndex;
    }
    /*---[Modola Parser] parsing emit ---*/
    else if (Modola.parserUtils.isEmit(tokens, i)) {
      const parsedEmit = Modola.core.parseEmit(tokens, i);
      result.push(parsedEmit);
      i = parsedEmit.nextIndex;
    }
    /*---[Modola Parser] parsing expression ---*/
    else if (Modola.parserUtils.isExpressionStart(tokens[i])) {
      console.warn("expression parsing");
      const parsedExpression = Modola.core.parseExpression(tokens, i);
      result.push(parsedExpression);
      i = parsedExpression.nextIndex;
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