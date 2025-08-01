Modola.types.typeOf = (param) => {
    if (typeof param === "number") {
        return Number.isInteger(param) ? "int" : "float";
    } else if (typeof param === "string") {
        return "string";
    } else if (typeof param === "object") {
        if (param.type)
            return param.type;
    }

    return undefined;
};

Modola.types.castTo = (type, value) => {
};