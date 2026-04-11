function isBareObject(o) {
  if (o != null && o.constructor === Object) {
    return true;
  }
  return false;
}

function typeOf(item) {
  let _ref;
  if (item === null) {
    return "null";
  }
  if (typeof item !== "object") {
    return typeof item;
  }
  if (Array.isArray(item)) {
    return "array";
  }
  if (item.nodeName) {
    if (item.nodeType === 1) {
      return "element";
    }
    if (item.nodeType === 3) {
      return (_ref = /\S/.test(item.nodeValue)) != null
        ? _ref
        : {
            textnode: "whitespace",
          };
    }
  } else if (typeof item.length === "number") {
    if (item.callee) {
      return "arguments";
    }
  }
  return typeof item;
}

function clone(item, includePrototype) {
  if (includePrototype == null) {
    includePrototype = false;
  }
  switch (typeOf(item)) {
    case "array":
      return _cloneArray(item, includePrototype);
    case "object":
      return _cloneObject(item, includePrototype);
    default:
      return item;
  }
}

function _cloneObject(o, includePrototype) {
  let clone, key;
  if (includePrototype == null) {
    includePrototype = false;
  }
  if (isBareObject(o)) {
    clone = {};
    for (key in o) {
      clone[key] = clone(o[key], includePrototype);
    }
    return clone;
  } else {
    if (!includePrototype) {
      return o;
    }
    if (o instanceof Function) {
      return o;
    }
    clone = Object.create(o.constructor.prototype);
    for (key in o) {
      if (o.hasOwnProperty(key)) {
        clone[key] = clone(o[key], includePrototype);
      }
    }
    return clone;
  }
}

function _cloneArray(a, includePrototype) {
  let clone, i;
  if (includePrototype == null) {
    includePrototype = false;
  }
  i = a.length;
  clone = new Array(i);
  while (i--) {
    clone[i] = clone(a[i], includePrototype);
  }
  return clone;
}

export { isBareObject, typeOf, clone };
