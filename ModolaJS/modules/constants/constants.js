Modola.constants = {};

Modola.defineConstant = (name, value) => {
  if (value.type) {
    if (typeof name === "string" && value !== undefined) {
      Modola.constants[name] = value;
    }
  }
};