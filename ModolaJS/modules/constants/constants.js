Modola.globalConstants = {};

Modola.defineGlobalConstant = (name, value) => {
  if (value.type) {
    if (typeof name === "string" && value !== undefined) {
      Modola.constants[name] = value;
    }
  }
};

Modola.getGlobalConstant = (name) => {
  return Modola.globalConstants[name];
}