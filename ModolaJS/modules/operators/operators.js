Modola.operators = {};

Modola.defineOperator = (type, op, func) => {
    if (func.length > 2) {
        console.error(`[Modola] maximum available is 2 arguments for operators function`);
        //Modola = null;
    } else {
        let operatorFunc = `${type}:operator${op}`;
        if (!Modola.operators[operatorFunc])
            Modola.operators[operatorFunc] = func;
        else
            console.error(`[Modola] ${operatorFunc} allready exist, you cannot override it.`)
    }
}