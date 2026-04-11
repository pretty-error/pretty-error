import _Declaration from "./_Declaration";
import MarginTop from "./MarginTop";

const _typeof = (obj) => typeof obj;

import { _classCallCheck, _createClass } from "#renderkid/tools";

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

import { p } from "#utils";

const Margin = function () {
  let self;

  const Margin = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Margin, _Declaration2);

    const _super = _createSuper(Margin);

    function Margin() {
      _classCallCheck(this, Margin);

      return _super.apply(this, arguments);
    }

    _createClass(Margin, null, [
      {
        key: "setOnto",
        value: function setOnto(declarations, prop, originalValue) {
          let append, val, vals;
          append = "";
          val = _Declaration.sanitizeValue(originalValue);

          if (_Declaration.importantClauseRx.test(String(val))) {
            append = " !important";
            val = val.replace(_Declaration.importantClauseRx, "");
          }

          val = val.trim();

          if (val.length === 0) {
            return self._setAllDirections(
              declarations,
              append,
              append,
              append,
              append,
            );
          }

          vals = val.split(" ").map(function (val) {
            return val + append;
          });

          if (vals.length === 1) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[0],
              vals[0],
              vals[0],
            );
          } else if (vals.length === 2) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[0],
              vals[1],
            );
          } else if (vals.length === 3) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[2],
              vals[1],
            );
          } else if (vals.length === 4) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[2],
              vals[3],
            );
          } else {
            throw Error(
              "Can't understand value for margin: `".concat(originalValue, "`"),
            );
          }
        },
      },
      {
        key: "_setAllDirections",
        value: function _setAllDirections(
          declarations,
          top,
          right,
          bottom,
          left,
        ) {
          MarginTop.setOnto(declarations, "marginTop", top);
          MarginTop.setOnto(declarations, "marginRight", right);
          MarginTop.setOnto(declarations, "marginBottom", bottom);
          MarginTop.setOnto(declarations, "marginLeft", left);
        },
      },
    ]);

    return Margin;
  })(_Declaration);
  self = Margin;
  return Margin;
}.call(void 0);

export default Margin;
