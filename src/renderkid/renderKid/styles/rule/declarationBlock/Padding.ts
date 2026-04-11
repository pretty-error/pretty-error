import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Declaration from "./_Declaration";
import PaddingTop from "./PaddingTop";

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

const Padding = function () {
  let self;

  const Padding = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Padding, _Declaration2);

    const _super = _createSuper(Padding);

    function Padding() {
      _classCallCheck(this, Padding);

      return _super.apply(this, arguments);
    }

    _createClass(Padding, null, [
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
              "Can't understand value for padding: `".concat(
                originalValue,
                "`",
              ),
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
          PaddingTop.setOnto(declarations, "paddingTop", top);
          PaddingTop.setOnto(declarations, "paddingRight", right);
          PaddingTop.setOnto(declarations, "paddingBottom", bottom);
          PaddingTop.setOnto(declarations, "paddingLeft", left);
        },
      },
    ]);

    return Padding;
  })(_Declaration);
  self = Padding;
  return Padding;
}.call(void 0);

export default Padding;
