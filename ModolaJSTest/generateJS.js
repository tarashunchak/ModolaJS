Modola.defineCore("generateJS", async (AST) => {
  const lines = [];
  console.log("AST TYPE : ", typeof AST);
  for (const node of AST) {
    lines.push("\n");
    switch (node.kind) {
      case "variableDef": {
        lines.push(`Modola.defineVariable("${node.type}", "${node.name}", ${node.value});`);
        break;
      }
      case "constDef": {
        if (node.scope === "global") {
          lines.push(`Modola.defineGlobalConstant("${node.name}", {
              scope: "${node.scope}",
              type: "${node.type}",
              value: ${node.value},
            });`);
        } else if (node.scope === "local") {
          lines.push(`Modola.defineLocalConstant("${node.name}", {
              scope: "${node.scope}",
              type: ${node.type},
              value: ${node.value},
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
          fields : {\n${Modola.jsGeneratorUtils.formatFields(fields)}},
          methods : {\n${Modola.jsGeneratorUtils.formatMethods(methods)}},
          constructors: [\n${Modola.jsGeneratorUtils.formatConstructors(constructors)}],
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
          body: {${body}},
        }`;
        lines.push(`Modola.defineFunction(${funcObjStr});`);
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