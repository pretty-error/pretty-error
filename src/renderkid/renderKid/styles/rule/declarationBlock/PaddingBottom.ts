import { _classCallCheck } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Length from "./_Length";

function _setPrototypeOf(o, p) {
  return Object.setPrototypeOf(o, p);
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

import { p } from "#utils";

const PaddingBottom = /*#__PURE__*/ (function (_Length2) {
  _inherits(PaddingBottom, _Length2);

  const _super = _createSuper(PaddingBottom);

  function PaddingBottom() {
    _classCallCheck(this, PaddingBottom);

    return _super.apply(this, arguments);
  }

  return PaddingBottom;
})(_Length);

export default PaddingBottom;
