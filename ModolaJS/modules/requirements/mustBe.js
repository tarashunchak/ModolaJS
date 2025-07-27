const BeAvaible = (obj) => ({
    obj: obj,
    be: (traits) => {
        if (!Modola.traits[traits]) return false;
        if (typeof traits !== "string" || Array.isArray(traits)) {
            return false;
        } else {
            if (typeof traits === "string") {
                return Modola.traits[traits].traitBody(obj);
            } else {
                return Modola.traits.all(...traits.traitBody(obj));
            }
        }
    }
});

Modola.must = (obj) => {
    return BeAvaible(obj);
};
