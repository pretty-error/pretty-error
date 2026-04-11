const __hasProp = {}.hasOwnProperty;

import { isBareObject, typeOf, clone } from "./_common";

function overrideOnto(base, newValues) {
  let key, newVal, oldVal;
  if (!isBareObject(newValues) || !isBareObject(base)) {
    return base;
  }
  for (key in base) {
    oldVal = base[key];
    newVal = newValues[key];
    if (newVal === void 0) {
      continue;
    }
    if (typeof newVal !== "object" || isInstance(newVal)) {
      base[key] = clone(newVal);
    } else {
      if (typeof oldVal !== "object" || isInstance(oldVal)) {
        base[key] = clone(newVal);
      } else {
        overrideOnto(oldVal, newVal);
      }
    }
  }
  return base;
}

function isInstance(what) {
  return !isBareObject(what);
}

function empty(o) {
  let prop;
  for (prop in o) {
    if (o.hasOwnProperty(prop)) {
      delete o[prop];
    }
  }
  return o;
}

function groupProps(obj, groups) {
  let def, defs, grouped, key, name, shouldAdd, val, _i, _len;
  grouped = {};
  for (name in groups) {
    defs = groups[name];
    grouped[name] = {};
  }
  grouped["rest"] = {};
  top: for (key in obj) {
    val = obj[key];
    shouldAdd = false;
    for (name in groups) {
      defs = groups[name];
      if (!Array.isArray(defs)) {
        defs = [defs];
      }
      for (_i = 0, _len = defs.length; _i < _len; _i++) {
        def = defs[_i];
        if (typeof def === "string") {
          if (key === def) {
            shouldAdd = true;
          }
        } else if (def instanceof RegExp) {
          if (def.test(key)) {
            shouldAdd = true;
          }
        } else if (def instanceof Function) {
          if (def(key)) {
            shouldAdd = true;
          }
        } else {
          throw Error(
            "Group definitions must either\
						be strings, regexes, or functions.",
          );
        }
        if (shouldAdd) {
          grouped[name][key] = val;
          continue top;
        }
      }
    }
    grouped["rest"][key] = val;
  }
  return grouped;
}

function appendOnto(base, toAppend) {
  let key, newVal, oldVal;
  if (!isBareObject(toAppend) || !isBareObject(base)) {
    return base;
  }
  for (key in toAppend) {
    if (!__hasProp.call(toAppend, key)) continue;
    newVal = toAppend[key];
    if (newVal === void 0) {
      continue;
    }
    if (typeof newVal !== "object" || isInstance(newVal)) {
      base[key] = newVal;
    } else {
      oldVal = base[key];
      if (typeof oldVal !== "object" || isInstance(oldVal)) {
        base[key] = clone(newVal);
      } else {
        appendOnto(oldVal, newVal);
      }
    }
  }
  return base;
}

function fastEmpty(o) {
  let property;
  for (property in o) {
    delete o[property];
  }
  return o;
}

function append(base, toAppend) {
  return appendOnto(clone(base), toAppend);
}

function override(base, newValues) {
  return overrideOnto(clone(base), newValues);
}

const object = {
  isBareObject,

  isInstance,

  typeOf,

  clone,

  empty,

  fastEmpty,

  overrideOnto,

  override,

  append,

  appendOnto,

  groupProps,
};

export { object, __hasProp };
