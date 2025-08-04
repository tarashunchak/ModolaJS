Modola.globalConstants = {};

Modola.defineGlobalConstant = (name, value) => {
  if (value.type) {
    if (typeof name === "string" && value !== undefined) {
      Modola.globalConstants[name] = value;
    }
  }
};

Modola.getGlobalConstant = (name) => {
  return Modola.globalConstants[name];
}