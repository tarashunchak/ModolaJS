Modola.traits = {};
Modola.concepts = {};

const traitObj = (name, body) => {
    return {
        traitName: name,
        traitBody: body,
        traitDesc: "",
        desc: (descString) => {
            this.traitDesc = descString;
            return traitDesc;
        }
    }
};

Modola.traits.any = function () {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === true) return true;
    }
};

Modola.traits.all = function () {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === false) return false;
    }
};

Modola.defineTrait = (traitName, traitBody) => {
    if (typeof traitName === "string"
        && typeof traitBody === "function") {
        Modola.traits[traitName] = traitObj(traitName, traitBody);
        return Modola.traits[traitName];
    }
};

Modola.defineConcept = (conceptName, conceptBody) => {

};
