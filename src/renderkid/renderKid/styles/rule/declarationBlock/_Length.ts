import { _classCallCheck, _createClass } from "#renderkid/tools";

import _Declaration from "./_Declaration";

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

const _Length = /*#__PURE__*/ (function (_Declaration2) {
  _inherits(_Length, _Declaration2);

  const _super = _createSuper(_Length);

  function _Length() {
    _classCallCheck(this, _Length);

    return _super.apply(this, arguments);
  }

  _createClass(_Length, [
    {
      key: "_set",
      value: function _set(val) {
        if (!/^[0-9]+$/.test(String(val))) {
          throw Error(
            "`".concat(this.prop, "` only takes an integer for value"),
          );
        }

        return (this.val = parseInt(val));
      },
    },
  ]);

  return _Length;
})(_Declaration);

export default _Length;
