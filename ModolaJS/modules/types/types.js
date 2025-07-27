Modola.types = [
    `int`,
    `float`,
    `bool`,
    `string`,
    `char`
];

Modola.types.int = (value) => {
    return parseInt(value);
}

Modola.types.float = (value) => {
    return parseFloat(value);
}

Modola.types.string = (value) => {
    return parseString(value);
}