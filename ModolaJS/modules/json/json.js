Modola.JSON = {};

Modola.JSON.findFieldByJsonAn = (object, jsonKey) => {
  for (const fieldName in object.fields) {
    if (object.fields[fieldName].jsonAn === jsonKey) {
      return fieldName;
    };
  };

  return null;
};

Modola.JSON.fromJSON = (jsonObj, objectRef) => {
  for (const [key, value] of Object.entries(jsonObj)) {
    const fieldName = Modola.JSON.findFieldByJsonAn(objectRef.value, key);
    if (!fieldName) continue;

    objectRef.value.fields[fieldName].value = value;
  };
};

Modola.JSON.toJSON = (object) => {
  const jsonObj = {};
  for (const field of Object.keys(object.fields)) {
    jsonObj[object.fields[field].jsonAn] = object.fields[field].value;
  };

  return jsonObj;
};