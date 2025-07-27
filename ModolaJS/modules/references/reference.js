Modola.references = {};
Modola.referenceValues = {};

function checkIfExistRef(sourceName) {
    for (let i = Modola.scopes.length; i >= 0; i--) {
        let currScope = "";
        for (let j = 0; j < i; j++) {
            currScope += `${Modola.scopes[j]}:`;
        }
        currScope += sourceName;
        if (Modola.referenceValues[currScope]) {
            return currScope;
        }
    }
    return null;
};

Modola.defineReference = (refName, sourceName) => {
    if (typeof refName === "string" && typeof sourceName === "string") {
        const sourceScope = checkIfExistRef(sourceName);
        const refScope = `${Modola.currentScope()}:${refName} `;
        console.log(`defining ref: ref(${refScope}), source(${sourceScope})`);
        if (sourceScope === null) {
            console.error(`[Modola] you cannot define reference to types such as "null, undefined, {}, void."`);
            Modula.killProgram();
            return;
        }
        else if (!Modola.references[refScope]) {
            if (Modola.typeModifiers.unique[sourceScope] === true) {
                console.error(`[Modola] you trying to create reference to a unique modified object`);
                Modula.killProgram();
                return;
            } else {
                Modola.references[refScope] = sourceScope;
            }
        } else {
            console.error(`[Modola] reference with name ${refScope} allready exits.`);
            Modula.killProgram();
            return;
        }
    } else {
        console.error(`[Modola] refName and sourceName should be a "string" type.`);
        Modula.killProgram();
        return;
    }
};

Modola.setRefValue = (sourceName, value) => {
    const currSource = `${Modola.currentScope()}:${sourceName}`;
    console.log(`added ref: ${currSource} `);
    Modola.referenceValues[currSource] = value;
};

Modola.getRefValue = (refName) => {
    console.log(`geting ref value: ${Modola.currentScope()}:${refName} `);
    return Modola.referenceValues[Modola.references[`${Modola.currentScope()}:${refName} `]];
};