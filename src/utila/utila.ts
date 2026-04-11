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
    if (typeof newVal !== "object" || this.isInstance(newVal)) {
      base[key] = this.clone(newVal);
    } else {
      if (typeof oldVal !== "object" || this.isInstance(oldVal)) {
        base[key] = this.clone(newVal);
      } else {
        this.overrideOnto(oldVal, newVal);
      }
    }
  }
  return base;
}

const object = {
  isBareObject,

  isInstance: function isInstance(what) {
    return !isBareObject(what);
  },

  typeOf,

  clone,

  empty: function empty(o) {
    let prop;
    for (prop in o) {
      if (o.hasOwnProperty(prop)) {
        delete o[prop];
      }
    }
    return o;
  },

  fastEmpty: function fastEmpty(o) {
    let property;
    for (property in o) {
      delete o[property];
    }
    return o;
  },

  overrideOnto,
  /*
  	Takes a clone of 'base' and runs #overrideOnto on it
  */

  override: function (base, newValues) {
    return this.overrideOnto(this.clone(base), newValues);
  },
  append: function (base, toAppend) {
    return this.appendOnto(this.clone(base), toAppend);
  },
  appendOnto: function (base, toAppend) {
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
      if (typeof newVal !== "object" || this.isInstance(newVal)) {
        base[key] = newVal;
      } else {
        oldVal = base[key];
        if (typeof oldVal !== "object" || this.isInstance(oldVal)) {
          base[key] = this.clone(newVal);
        } else {
          this.appendOnto(oldVal, newVal);
        }
      }
    }
    return base;
  },

  groupProps: function groupProps(obj, groups) {
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
  },
};

export { object, __hasProp };
