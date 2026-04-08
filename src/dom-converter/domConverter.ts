const objectToSaneObject = require("./objectToSaneObject");

const saneObjectToDom = require("./saneObjectToDom");

import { object } from "#utila";

const self = {
  objectToDom: function (o) {
    o = self._object2SaneObject(o);
    return saneObjectToDom.convert(o);
  },
  _object2SaneObject: function (o) {
    if (!Array.isArray(o)) {
      if (!object.isBareObject(o)) {
        throw Error("toDom() only accepts arrays and bare objects as input");
      }
    }
    return objectToSaneObject.sanitize(o);
  },
};

module.exports = self;
