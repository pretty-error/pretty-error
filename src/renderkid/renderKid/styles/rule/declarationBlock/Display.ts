import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";
import { p } from "#utils";

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

const indexOf = [].indexOf;

const Display = function () {
  let self;

  const Display = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Display, _Declaration2);

    const _super = _createSuper(Display);

    function Display() {
      _classCallCheck(this, Display);

      return _super.apply(this, arguments);
    }

    _createClass(Display, [
      {
        key: "_set",
        value: function _set(val) {
          val = String(val).toLowerCase();

          if (indexOf.call(self._allowed, val) < 0) {
            throw Error(
              "Unrecognizable value `"
                .concat(val, "` for `")
                .concat(this.prop, "`"),
            );
          }

          return (this.val = val);
        },
      },
    ]);

    return Display;
  })(_Declaration);
  self = Display;
  Display._allowed = ["inline", "block", "none"];
  return Display;
}.call(void 0);

export default Display;
