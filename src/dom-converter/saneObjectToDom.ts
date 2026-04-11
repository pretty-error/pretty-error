const hasProp = {}.hasOwnProperty;

function convert(obj) {
  return _arrayToChildren(obj);
}

function _arrayToChildren(a, parent?) {
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
    if (!hasProp.call(o, k)) continue;
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
    children = _arrayToChildren(val, node);
  } else {
    inspect(o);
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

export { convert };
