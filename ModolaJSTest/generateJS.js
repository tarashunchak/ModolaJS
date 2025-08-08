Modola.defineCore("generateJS", async (AST) => {
  const lines = [];

  for (const node of AST) {
    switch (node.kind) {
      case "componentDec": {
        const formated = Modola.jsGeneratorUtils.formatComponentDec(node);
        lines.push(`Modola.ui.create${node.name}(${formated});`);
        break;
      }
      case "unsafeBlock": {
        lines.push(node.value);
        break;
      }
      case "variableDef": {
        if (typeof node.value !== "object") {
          lines.push(`Modola.defineVariable("${node.type}", "${node.name}", ${node.value})`);
        } else if (node.type === "UI" && node.value.type === "UI") {
          if (node.scope === "global")
            lines.push(`Modola.defineGlobalComponent("${node.type}", "${node.name}", Modola.ui.create${node.value.name}(${Modola.jsGeneratorUtils.formatComponentDec(node.value)}))`);
          else if (node.scope === "local")
            lines.push(`Modola.defineLocalComponent("${node.type}", "${node.name}", Modola.ui.create${node.value.name}(${Modola.jsGeneratorUtils.formatComponentDec(node.value)}))`);
        }
        break;
      }
      case "constDef": {
        if (node.scope === "global") {
          lines.push(`Modola.defineGlobalConstant("${node.name}", {
              scope: "${node.scope}",
              type: "${node.type}",
              value: ${node.value},
              isConst: true,
            })`);
        } else if (node.scope === "local") {
          lines.push(`Modola.defineLocalConstant("${node.name}", {
              scope: "${node.scope}",
              type: ${node.type},
              value: ${node.value},
              isConst: true,
            });`);
        }
        break;
      }
      case "classDef": {
        const fields = node.class.body.filter(obj => obj.kind === "classField");
        const methods = node.class.body.filter(obj => obj.kind === "classMethod" && obj.name !== "constructor");
        const constructors = node.class.body.filter(obj => obj.kind === "classMethod" && obj.name === "constructor");

        const classObjStr = `
        {
          className : "${node.class.header.name}",
          extend : "${node.class.header.extend}",
          scope: "${node.class.header.scope}",
          fields : {\n${Modola.jsGeneratorUtils.formatFieldsDec(fields)}},
          methods : {\n${Modola.jsGeneratorUtils.formatMethodsDec(methods)}},
          constructors: [\n${Modola.jsGeneratorUtils.formatConstructorsDec(constructors)}],
          destructor: null,
        }
        `;
        lines.push(`Modola.defineClass(${classObjStr});`);
        break;
      }
      case "funcDef": {

        const body = await Modola.core.generateJS(node.func.body);

        const funcObjStr = `{
          name: "${node.func.header.name}",
          scope: "${node.func.header.scope}",
          returnType: "${node.func.header.returnType}",
          args: {${Modola.jsGeneratorUtils.formatArgs(node.func.header.args)}},
          body: {\n${body}},
        }`;
        lines.push(`Modola.defineFunction(${funcObjStr});`);
        break;
      }
      case "operatorDec": {
        const operator = Modola.jsGeneratorUtils.formatOperatorDec(node);
        lines.push(`Modola.defineOperator(${operator});`);
        break;
      }
      case "importedScript": {
        lines.push(`/*--[Modola] code from "${node.from}" ---*/`);
        const inner = await Modola.core.generateJS(node.body);
        lines.push(...inner);
        break;
      }
    }
  };


  return lines;
});