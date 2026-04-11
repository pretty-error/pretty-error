import tty from "node:tty";

import htmlparser from "htmlparser2";

import { objectToDom as _objectToDom } from "#dom-converter";
import { isPlainObject, p, sp } from "#utils";
import cloneDeep from "#utils/clone-deep";
import merge from "#utils/merge";

function cloneAndMergeDeep(base, toAppend) {
  return merge(cloneDeep(base), toAppend);
}

function toDom(subject) {
  if (typeof subject === "string") {
    return stringToDom(subject);
  } else if (isPlainObject(subject)) {
    return objectToDom(subject);
  } else {
    throw Error("tools.toDom() only supports strings and objects");
  }
}

function stringToDom(string: string) {
  const handler = new htmlparser.DomHandler();
  const parser = new htmlparser.Parser(handler);
  parser.write(string);
  parser.end();
  return handler.dom;
}

function _fixQuotesInDom(input) {
  let j, len, node;

  if (Array.isArray(input)) {
    for (j = 0, len = input.length; j < len; j++) {
      node = input[j];

      _fixQuotesInDom(node);
    }

    return input;
  }

  node = input;

  if (node.type === "text") {
    return (node.data = _quoteNodeText(node.data));
  } else {
    return _fixQuotesInDom(node.children);
  }
}

function objectToDom(o) {
  if (!Array.isArray(o)) {
    if (!isPlainObject(o)) {
      throw Error("objectToDom() only accepts a bare object or an array");
    }
  }

  return _fixQuotesInDom(_objectToDom(o));
}

function quote(str) {
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/ /g, "&sp;")
    .replace(/\n/g, "<br />");
}

function _quoteNodeText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/ /g, "&sp;")
    .replace(/\n/g, "&nl;");
}

function getCols() {
  const cols = (function () {
    try {
      if (tty.isatty(1) && tty.isatty(2)) {
        return process.stdout.getWindowSize()[0];
      }
    } catch {}
  })();

  if (typeof cols === "number" && cols > 30) {
    return cols;
  } else {
    return 80;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps?) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) sp(subClass, superClass);
}

function _createSuper(Derived) {
  const hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    let Super = p(Derived),
      result;
    if (hasNativeReflectConstruct) {
      const NewTarget = p(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

export {
  cloneAndMergeDeep,
  toDom,
  stringToDom,
  objectToDom,
  quote,
  getCols,

  // --------------
  _classCallCheck,
  _defineProperties,
  _createClass,
  _inherits,
  _createSuper,
};
