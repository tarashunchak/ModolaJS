Modola.constants = {};

Modola.defineConstant = (name, value) => {
  if (typeof name === "string" && value !== undefined) {
    Modola.constants[name] = value;
  }
};