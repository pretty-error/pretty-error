const hasProp = {}.hasOwnProperty;

import { object } from "#utila";

function sanitize(val) {
  return _toChildren(val);
}

function _toChildren(val) {
  let ref;
  if (object.isBareObject(val)) {
    return _objectToChildren(val);
  } else if (Array.isArray(val)) {
    return _arrayToChildren(val);
  } else if (val === null || typeof val === "undefined") {
    return [];
  } else if ((ref = typeof val) === "string" || ref === "number") {
    return [String(val)];
  } else {
    throw Error("not a valid child node: `" + val);
  }
}

function _objectToChildren(o) {
  let a, cur, key, val;
  a = [];
  for (key in o) {
    if (!hasProp.call(o, key)) continue;
    val = o[key];
    cur = {};
    cur[key] = sanitize(val);
    a.push(cur);
  }
  return a;
}

function _arrayToChildren(a) {
  let i, len, ret, v;
  ret = [];
  for (i = 0, len = a.length; i < len; i++) {
    v = a[i];
    ret.push(_toNode(v));
  }
  return ret;
}

function _toNode(o) {
  let key, keys, obj, ref;
  if ((ref = typeof o) === "string" || ref === "number") {
    return String(o);
  } else if (object.isBareObject(o)) {
    keys = Object.keys(o);
    if (keys.length !== 1) {
      throw Error("a node must only have one key as tag name");
    }
    key = keys[0];
    obj = {};
    obj[key] = _toChildren(o[key]);
    return obj;
  } else {
    throw Error("not a valid node: `" + o + "`");
  }
}

export { sanitize };
