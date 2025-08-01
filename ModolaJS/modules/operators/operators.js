Modola.operators = {};

/*---[Modola] `Modola.defineOperator` is function that allow
to operator overloading -*/
Modola.defineOperator = (opObj) => {
    let op = opObj.opName;
    if (!Modola.keywords.operators[op]) {
        Modola.killProgram();
        console.log("[Modola] unknown operator ", op);
        return;
    }

    const argNames = Object.keys(opObj.args);

    console.log(`defining operator${op}`);
    if (opObj.body.length > 2 || argNames.length === 0 || argNames.length > 2) {
        console.error(`[Modola] maximum available is 2 arguments for operators function`);
        Modola.killProgram();
        return;
    }

    /*let funcArgs = [];
    for (let i = 0; i < argNames.length; i++) {
        funcArgs.push({ isPh: true, type: argNames[i] });
    };*/

    let operatorFunc = {
        isUnary: Modola.keywords.operators[op].props.isUnary && argNames.length < 2,
        returnType: opObj.returnType,
        opProps: Modola.keywords.operators[op],
        args: argNames.map(name => ({
            name: name,
            type: opObj.args[name].type,
        })),
        body: opObj.body
    };
    if (!Modola.operators[op]) Modola.operators[op] = [];
    Modola.operators[op].push(operatorFunc);
}

function findOperator(op, args) {
    if (typeof op === "string" && Modola.operators[op]) {
        let isSameType = Modola.types["isSameType"];
        let makeRefType = Modola["makeReferenceType"];

        let isSameTypeSc = (defArgs, callArgs) => {
            for (let i = 0; i < callArgs.length; i++) {
                if (!(isSameType(defArgs[i], callArgs[i]) || isSameType(makeRefType(defArgs[i].type), callArgs[i]))) {
                    return false;
                }
            }

            return true;
        };

        return Modola.operators[op].find((el) => el.args.length === args.length && isSameTypeSc(el.args, args));
    };
};

/*---[Modola] `Modola.callOperator(operatorName, argsName)` is function that call 
suitable operator function for arguments ---*/
Modola.callOperator = (op, argsName) => {
    if (typeof argsName[0] !== "string")
        return;

    if (!argsName.length) {
        Modola.killProgram();
        console.log(`[Modola] argsName in callOperator function is empty`);
        return;
    }
    let args = argsName.map(name => Modola.getVariable(name));

    console.log(`Args value in operator callin: ${args[0].value}`);

    let operator = findOperator(op, args);

    if (operator) {
        if (args[0].name) {
            if (Modola.constants[args[0].name] && operator.opProps.props.isAssignable) {
                Modola.killProgram();
            } else {
                if (operator.isUnary && args.length !== 1) {
                    Modola.killProgram();
                    return;
                }

                const namedArgs = {};
                operator.args.forEach((def, i) => namedArgs[def.name] = args[i]);
                console.log("call operator ", op, namedArgs["a"].value);
                return operator.body(namedArgs);
            }
        }
    } else
        if (args[1]) {
            console.log(`operator ${op} for {${args[0].type}, ${args[1].type}} not finded`);
        } else {
            console.log(`operator ${op} for {${args[0].type}} not finded`);
        };

    Modola.killProgram();
};