import { object } from "#utila";

import * as objectToSaneObject from "./objectToSaneObject";
import saneObjectToDom from "./saneObjectToDom";

function object2SaneObject(o) {
  if (!Array.isArray(o)) {
    if (!object.isBareObject(o)) {
      throw Error("toDom() only accepts arrays and bare objects as input");
    }
  }
  return objectToSaneObject.sanitize(o);
}

function objectToDom(o) {
  o = object2SaneObject(o);
  return saneObjectToDom.convert(o);
}

export { objectToDom };
