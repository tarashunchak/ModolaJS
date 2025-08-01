Modola.types = {
    int: {
        default: 0,
        castableTo: [
            "float"
        ]
    },
    "int&": {
        default: undefined,
        castableTo: [
            "int",
            "float"
        ]
    },
    float: {
        default: 0.0,
        castableTo: [
            "int",
            "float"
        ]
    },
    "float&": {
        default: undefined,
        castableTo: [
            "int",
            "float"
        ]
    },
    bool: {
        default: false,
        castableTo: [
            "int",
            "float"
        ]
    },
    string: {
        default: "",
        castableTo: [
            "array<char>"
        ]
    },
    char: {
        default: '',
        castableTo: [
            "int",
            "string"
        ]
    }
};

Modola.types.getDefaultValue = (type) => {
    return Modola.types[type]?.default ?? null;
}

Modola.types.int = (value) => {
    return parseInt(value);
}

Modola.types.float = (value) => {
    return parseFloat(value);
}

Modola.types.string = (value) => {
    return parseString(value);
}