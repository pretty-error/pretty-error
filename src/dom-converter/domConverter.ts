import { isBareObject, __hasProp } from "#utila";

// ---

function saneObjectToDomConvert(a, parent?) {
  let children, j, len, node, prev, v;
  if (parent == null) {
    parent = null;
  }
  children = [];
  prev = null;
  for (j = 0, len = a.length; j < len; j++) {
    v = a[j];
    if (typeof v === "string") {
      node = _getTextNodeFor(v);
    } else {
      node = _objectToNode(v, parent);
      node.prev = null;
      node.next = null;
      node.parent = parent;
      if (prev != null) {
        node.prev = prev;
        prev.next = node;
      }
      prev = node;
    }
    children.push(node);
  }
  return children;
}

function _objectToNode(o) {
  let attribs, children, i, k, key, name, node, ref, v, val;
  i = 0;
  for (k in o) {
    if (!__hasProp.call(o, k)) continue;
    v = o[k];
    if (i > 0) {
      throw Error("_objectToNode() only accepts an object with one key/value");
    }
    key = k;
    val = v;
    i++;
  }
  node = {};
  if (typeof key !== "string") {
    throw Error(
      "_objectToNode()'s key must be a string of tag name and classes",
    );
  }
  if (typeof val === "string") {
    children = [_getTextNodeFor(val)];
  } else if (Array.isArray(val)) {
    children = saneObjectToDomConvert(val, node);
  } else {
    throw Error(
      "_objectToNode()'s key's value must only be a string or an array",
    );
  }
  node.type = "tag";
  ((ref = _parseTag(key)), (name = ref.name), (attribs = ref.attribs));
  node.name = name;
  node.attribs = attribs;
  node.children = children;
  return node;
}

function _getTextNodeFor(s) {
  return {
    type: "text",
    data: s,
  };
}

const _nameRx = /^[a-zA-Z\-_]{1}[a-zA-Z0-9\-_]*$/;

function _parseTag(k) {
  let attribs, classes, cls, id, m, name, parts;
  if (!k.match(/^[a-zA-Z0-9#\-_.[\]"'=,\s]+$/) || k.match(/^[0-9]+/)) {
    throw Error("cannot parse tag `" + k + "`");
  }
  attribs = {};
  parts = {
    name: "",
    attribs: attribs,
  };
  if ((m = k.match(/^([^.#]+)/))) {
    name = m[1];
    if (!name.match(_nameRx)) {
      throw Error("tag name `" + name + "` is not valid");
    }
    parts.name = name;
    k = k.substr(name.length, k.length);
  }
  if ((m = k.match(/^#([a-zA-Z0-9-]+)/))) {
    id = m[1];
    if (!id.match(_nameRx)) {
      throw Error("tag id `" + id + "` is not valid");
    }
    attribs.id = id;
    k = k.substr(id.length + 1, k.length);
  }
  classes = [];
  while ((m = k.match(/\.([a-zA-Z0-9\-_]+)/))) {
    cls = m[1];
    if (!cls.match(_nameRx)) {
      throw Error("tag class `" + cls + "` is not valid");
    }
    classes.push(cls);
    k = k.replace("." + cls, "");
  }
  if (classes.length) {
    attribs["class"] = classes.join(" ");
  }
  return parts;
}
// ---

function objectToSaneObjectSanitize(val) {
  let ref;
  if (isBareObject(val)) {
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
    if (!__hasProp.call(o, key)) continue;
    val = o[key];
    cur = {};
    cur[key] = objectToSaneObjectSanitize(val);
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
  } else if (isBareObject(o)) {
    keys = Object.keys(o);
    if (keys.length !== 1) {
      throw Error("a node must only have one key as tag name");
    }
    key = keys[0];
    obj = {};
    obj[key] = objectToSaneObjectSanitize(o[key]);
    return obj;
  } else {
    throw Error("not a valid node: `" + o + "`");
  }
}
// ---

function object2SaneObject(o) {
  if (!Array.isArray(o)) {
    if (!isBareObject(o)) {
      throw Error("toDom() only accepts arrays and bare objects as input");
    }
  }
  return objectToSaneObjectSanitize(o);
}

function objectToDom(o) {
  o = object2SaneObject(o);
  return saneObjectToDomConvert(o);
}

export { objectToDom };
