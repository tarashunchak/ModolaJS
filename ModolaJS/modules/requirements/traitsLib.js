Modola.defineTrait("isObject", (T) => {
    return T !== null && typeof T === "object"
        && !Array.isArray(T);
});

Modola.defineTrait("isFunction", (T) => {
    return typeof T === "function";
});

Modola.defineTrait("isString", (T) => {
    return typeof T === "string";
});

Modola.defineTrait("isArray", (T) => {
    return Array.isArray(T);
});

Modola.defineTrait("isBool", (T) => {
    return typeof T === "boolean";
});

Modola.defineTrait("isEmptyObject", (T) => {
    if (T == {}) return false;
    else return true;
});

Modola.defineTrait("isEmptyString", (T) => {

});

Modola.defineTrait("isEmptyArray", (t) => {

});

Modola.defineTrait("isNumber", (t) => {

});

Modola.defineTrait("isInteger", (t) => {

});

Modola.defineTrait("isFloat", (t) => {

});