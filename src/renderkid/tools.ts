import htmlparser from "htmlparser2";

import { objectToDom as _objectToDom } from "#dom-converter";
import { isPlainObject } from "#utils";
import cloneDeep from "#utils/clone-deep";
import merge from "#utils/merge";

function repeatString(str, times) {
  let i, j, output, ref;
  output = "";

  for (
    i = j = 0, ref = times;
    0 <= ref ? j < ref : j > ref;
    i = 0 <= ref ? ++j : --j
  ) {
    output += str;
  }

  return output;
}

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

function stringToDom(string) {
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
  let cols, tty; // Based on https://github.com/jonschlinkert/window-size

  tty = require("node:tty");

  cols = (function () {
    try {
      if (tty.isatty(1) && tty.isatty(2)) {
        if (process.stdout.getWindowSize) {
          return process.stdout.getWindowSize(1)[0];
        } else if (tty.getWindowSize) {
          return tty.getWindowSize()[1];
        } else if (process.stdout.columns) {
          return process.stdout.columns;
        }
      }
    } catch (error) {}
  })();

  if (typeof cols === "number" && cols > 30) {
    return cols;
  } else {
    return 80;
  }
}

export {
  repeatString,
  cloneAndMergeDeep,
  toDom,
  stringToDom,
  objectToDom,
  quote,
  getCols,
};
