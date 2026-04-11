import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Declaration from "./_Declaration";

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

const Bullet = function () {
  let self;

  const Bullet = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Bullet, _Declaration2);

    const _super = _createSuper(Bullet);

    function Bullet() {
      _classCallCheck(this, Bullet);

      return _super.apply(this, arguments);
    }

    _createClass(Bullet, [
      {
        key: "_set",
        value: function _set(val) {
          let alignment, bg, char, color, enabled, m, original;
          val = String(val);
          original = val;
          char = null;
          enabled = false;
          color = "none";
          bg = "none";

          if ((m = val.match(/"([^"]+)"/) || (m = val.match(/'([^']+)'/)))) {
            char = m[1];
            val = val.replace(m[0], "");
            enabled = true;
          }

          if ((m = val.match(/(none|left|right|center)/))) {
            alignment = m[1];
            val = val.replace(m[0], "");
          } else {
            alignment = "left";
          }

          if (alignment === "none") {
            enabled = false;
          }

          if ((m = val.match(/color:([\w-]+)/))) {
            color = m[1];
            val = val.replace(m[0], "");
          }

          if ((m = val.match(/bg:([\w-]+)/))) {
            bg = m[1];
            val = val.replace(m[0], "");
          }

          if (val.trim() !== "") {
            throw Error(
              "Unrecognizable value `"
                .concat(original, "` for `")
                .concat(this.prop, "`"),
            );
          }

          return (this.val = {
            enabled: enabled,
            char: char,
            alignment: alignment,
            background: bg,
            color: color,
          });
        },
      },
    ]);

    return Bullet;
  })(_Declaration);
  self = Bullet;
  return Bullet;
}.call(void 0);

export default Bullet;
