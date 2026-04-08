"use strict";

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

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

let Block, Layout, i, len, prop, ref;

Block = require("./layout/Block");

import tools from "./tools";

const cloneAndMergeDeep = tools.cloneAndMergeDeep;

import SpecialString from "./layout/SpecialString";
const terminalWidth = tools.getCols();

module.exports = Layout = function () {
  let self;

  const Layout = /*#__PURE__*/ (function () {
    function Layout() {
      const config =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const rootBlockConfig =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Layout);

      let rootConfig;
      this._written = [];
      this._activeBlock = null;
      this._config = cloneAndMergeDeep(self._defaultConfig, config); // Every layout has a root block

      rootConfig = cloneAndMergeDeep(
        self._rootBlockDefaultConfig,
        rootBlockConfig,
      );
      this._root = new Block(this, null, rootConfig, "__root");

      this._root._open();
    }

    _createClass(Layout, [
      {
        key: "getRootBlock",
        value: function getRootBlock() {
          return this._root;
        },
      },
      {
        key: "_append",
        value: function _append(text) {
          return this._written.push(text);
        },
      },
      {
        key: "_appendLine",
        value: function _appendLine(text) {
          let s;

          this._append(text);

          s = new SpecialString(text);

          if (s.length < this._config.terminalWidth) {
            this._append("<none>\n</none>");
          }

          return this;
        },
      },
      {
        key: "get",
        value: function get() {
          this._ensureClosed();

          if (this._written[this._written.length - 1] === "<none>\n</none>") {
            this._written.pop();
          }

          return this._written.join("");
        },
      },
      {
        key: "_ensureClosed",
        value: function _ensureClosed() {
          if (this._activeBlock !== this._root) {
            throw Error(
              "Not all the blocks have been closed. Please call block.close() on all open blocks.",
            );
          }

          if (this._root.isOpen()) {
            this._root.close();
          }
        },
      },
    ]);

    return Layout;
  })();
  self = Layout;
  Layout._rootBlockDefaultConfig = {
    linePrependor: {
      options: {
        amount: 0,
      },
    },
    lineAppendor: {
      options: {
        amount: 0,
      },
    },
    blockPrependor: {
      options: {
        amount: 0,
      },
    },
    blockAppendor: {
      options: {
        amount: 0,
      },
    },
  };
  Layout._defaultConfig = {
    terminalWidth: terminalWidth,
  };
  return Layout;
}.call(void 0);

ref = ["openBlock", "write"];

for (i = 0, len = ref.length; i < len; i++) {
  prop = ref[i];

  (function () {
    let method;
    method = prop;
    return (Layout.prototype[method] = function () {
      return this._root[method].apply(this._root, arguments);
    });
  })();
}
