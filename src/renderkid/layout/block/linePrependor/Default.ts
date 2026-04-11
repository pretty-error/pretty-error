const _typeof = (obj) => typeof obj;

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

const _setPrototypeOf = Object.setPrototypeOf;

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
  if (call && (typeof(call) === "object" || typeof call === "function")) {
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
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
    return true;
  } catch {
    return false;
  }
}

import { p } from "#utils";
const _getPrototypeOf = p;

import SpecialString from "../../SpecialString";
import _LinePrependor from "./_LinePrependor";

const DefaultLinePrependor = function () {
  let self;

  const DefaultLinePrependor = /*#__PURE__*/ (function (_require) {
    _inherits(DefaultLinePrependor, _require);

    const _super = _createSuper(DefaultLinePrependor);

    function DefaultLinePrependor() {
      _classCallCheck(this, DefaultLinePrependor);

      return _super.apply(this, arguments);
    }

    _createClass(
      DefaultLinePrependor,
      [
        {
          key: "_render",
          value: function _render(inherited, options) {
            let addToLeft,
              addToRight,
              alignment,
              bullet,
              char,
              charLen,
              diff,
              left,
              output,
              space,
              toWrite;

            if (this._lineNo === 0 && (bullet = this._config.bullet)) {
              char = bullet.char;
              charLen = new SpecialString(char).length;
              alignment = bullet.alignment;
              space = this._config.amount;
              toWrite = char;
              addToLeft = "";
              addToRight = "";

              if (space > charLen) {
                diff = space - charLen;

                if (alignment === "right") {
                  addToLeft = self.pad(diff);
                } else if (alignment === "left") {
                  addToRight = self.pad(diff);
                } else if (alignment === "center") {
                  left = Math.round(diff / 2);
                  addToLeft = self.pad(left);
                  addToRight = self.pad(diff - left);
                } else {
                  throw Error("Unknown alignment `".concat(alignment, "`"));
                }
              }

              output = addToLeft + char + addToRight;
            } else {
              output = self.pad(this._config.amount);
            }

            return inherited + output;
          },
        },
      ],
      [
        {
          key: "pad",
          value: function pad(howMuch) {
            return " ".repeat(howMuch);
          },
        },
      ],
    );

    return DefaultLinePrependor;
  })(_LinePrependor);
  self = DefaultLinePrependor;
  return DefaultLinePrependor;
}.call(void 0);

export default DefaultLinePrependor;
