import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

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

import _LineAppendor from "./_LineAppendor";

const DefaultLineAppendor = /*#__PURE__*/ (function (_require) {
  _inherits(DefaultLineAppendor, _require);

  const _super = _createSuper(DefaultLineAppendor);

  function DefaultLineAppendor() {
    _classCallCheck(this, DefaultLineAppendor);

    return _super.apply(this, arguments);
  }

  _createClass(DefaultLineAppendor, [
    {
      key: "_render",
      value: function _render(inherited, options) {
        return inherited + " ".repeat(this._config.amount);
      },
    },
  ]);

  return DefaultLineAppendor;
})(_LineAppendor);

export default DefaultLineAppendor;
