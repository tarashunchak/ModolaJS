Modola.references = {};
Modola.referenceValues = {};

/*---[Modola] this function recursively check if this 
variable have references ---*/
function checkIfExistRef(sourceName) {
    for (let i = Modola.scopes.length; i >= 0; i--) {
        let currScope = "";
        for (let j = 0; j < i; j++) {
            currScope += `${Modola.scopes[j]}:`;
        }
        currScope += sourceName;
        if (Modola.variables[currScope]) {
            return currScope;
        }
    }
    return null;
};

/*---[Modola] this function recursively check if this 
---*/
Modola.checkIfExist = (sourceName) => {
    for (let i = Modola.scopes.length; i >= 0; i--) {
        let currScope = "";
        for (let j = 0; j < i; j++) {
            currScope += `${Modola.scopes[j]}:`;
        }
        currScope += sourceName;
        if (Modola.variables[currScope]) {
            console.log(currScope);
            return currScope;
        } else if (Modola.globalConstants[currScope]) {
            console.log(currScope);
            return currScope;
        } else if (Modola.globalTest[currScope]) {
            console.log(currScope);
            return currScope;
        }
    }
    return null;
}

/*---[Modola] this function make variable with reference type
---*/
Modola.makeReferenceType = (typeName) => {
    return { type: `${typeName}${Modola.keywords.references}` };
};

/*---[Modola] this function creating reference to existing variable 
or another references ---*/
Modola.defineReference = (refName, sourceName) => {
    if (typeof refName === "string" && typeof sourceName === "string") {
        const sourceScope = checkIfExistRef(sourceName);
        const refScope = `${Modola.currentScope()}:${refName}`;
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
                Modola.references[refScope] = {
                    type: Modola.getVariable(sourceName).type + "&",
                    source: sourceScope
                };
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

function getOriginalVarSource(refName) {
    const currSource = Modola.makeScopeName(refName);
    if (!Modola.references[currSource]) {
        Modola.killProgram();
        return undefined;
    }

    let source = Modola.references[currSource].source;
    while (Modola.references[source]) {
        source = Modola.references[source].source;
    }
    return source;
}

/*---[Modola] this function set value to original source of 
reference ---*/
Modola.setRefValue = (refName, value) => {
    let source = getOriginalVarSource(refName);
    if (source) {
        if (Modola.variables[source]) {
            return Modola.callOperator("=", Modola.variables[source], value);
        } else if (Modola.constants[source]) {
            Modola.killProgram();
            return false;
        }
    }
};

/*---[Modola] this function recursively check if this 
reference name has source in variables or references ---*/
Modola.getRefValue = (refName) => {
    let source = getOriginalVarSource(refName);
    console.log(`geting ref value: ${source}`);
    if (source) {
        if (Modola.variables[source])
            return Modola.variables[source];
        else if (Modola.constants[source])
            return Modola.constants[source];
    }
};