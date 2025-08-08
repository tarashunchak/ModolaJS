Modola.jsGeneratorUtils = {};

Modola.jsGeneratorUtils.formatStyle = (styleObj) => {
  return `style : {\n
    ${Object.entries(styleObj)
      .map(([key, value]) => `${key} : ${value}`)
      .join(",\n")}
  \n},`;
};

Modola.jsGeneratorUtils.formatJSObject = (obj) => {
  return `{
  ${Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object") {
      return `${key}:  ${Modola.jsGeneratorUtils.formatJSObject(value)}`
    } else if (value.style) {
      return Modola.jsGeneratorUtils.formatStyle(value);
    } else {
      return `${key} : ${value}`
    }
  }
  ).join(",\n")}
  }`
};

Modola.jsGeneratorUtils.formatArgs = (args) => {
  return args.map(arg =>
    `"${arg.name}" : {
              modifier: "${arg.modifier}",
              type: "${arg.type}",
              default: ${arg.defValue},
              }`).join(",\n");
};

Modola.jsGeneratorUtils.formatFunctionDec = (node) => {
  return;
};

Modola.jsGeneratorUtils.formatFieldsDec = (fields) => {
  return fields.map(field => {
    return `${field.name} : {
              type: "${field.type}",
              default: ${field.defValue},
              json: ${field.jsonAn},
              access: "${field.access}",
            }`;
  }).join(",\n");
};

Modola.jsGeneratorUtils.formatMethodsDec = (methods) => {
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

Modola.jsGeneratorUtils.formatConstructorsDec = (constructors) => {
  return constructors.map(ctor => {
    return `{
      access: "${ctor.access}",
      args: {${Modola.jsGeneratorUtils.formatArgs(ctor.args)}},
    }`
  }).join(",\n");
};

Modola.jsGeneratorUtils.formatComponentDec = (comp) => {
  return `${comp.body.text}, null, 
    ${Modola.jsGeneratorUtils.formatJSObject(comp.body)}
  `;
};

Modola.jsGeneratorUtils.formatOperatorDec = (op) => {
  return `{
    args: {${Modola.jsGeneratorUtils.formatArgs(op.args)} },
    returnType: ${op.returnName},
    opName: "${op.opName}",
      body: { },
  } `;
};