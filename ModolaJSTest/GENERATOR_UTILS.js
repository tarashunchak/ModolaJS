Modola.jsGeneratorUtils = {};

Modola.jsGeneratorUtils.formatArgs = (args) => {
  return args.map(arg =>
    `"${arg.name}" : {
              modifier: ${args.modifier}
              type: "${arg.type}",
              default: ${arg.defValue}
              }`).join(",\n");
};

Modola.jsGeneratorUtils.formatFunction = (node) => {
  return;
};

Modola.jsGeneratorUtils.formatFields = (fields) => {
  return fields.map(field => {
    return `${field.name} : {
              type: "${field.type}",
              default: ${field.defValue},
              json: "${field.jsonAn}",
              access: "${field.access}",
            }`;
  }).join(",\n");
};

Modola.jsGeneratorUtils.formatMethods = (methods) => {
  return methods.map(method => {
    //const bodyLines = Modola.core.generateJS(method.body);
    //const bodyStr = bodyLines.join("\n");

    return `${method.name} : {
            returnType: "${method.returnType}",
            args: {${Modola.jsGeneratorUtils.formatArgs(method.args)}},
            access: "${method.access}",
          }`
  }).join(",\n");
};

Modola.jsGeneratorUtils.formatConstructors = (constructors) => {
  return constructors.map(ctor => {
    return `{
      access: "${ctor.access}",
      args: {${Modola.jsGeneratorUtils.formatArgs(ctor.args)}},
    }`
  }).join(",\n");
};