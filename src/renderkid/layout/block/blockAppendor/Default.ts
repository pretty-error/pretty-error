import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";
import { p } from "#utils";

import _BlockAppendor from "./_BlockAppendor";

const DefaultBlockAppendor = /*#__PURE__*/ (function (_require) {
  _inherits(DefaultBlockAppendor, _require);

  const _super = _createSuper(DefaultBlockAppendor);

  function DefaultBlockAppendor() {
    _classCallCheck(this, DefaultBlockAppendor);

    return _super.apply(this, arguments);
  }

  _createClass(DefaultBlockAppendor, [
    {
      key: "_render",
      value: function _render(options) {
        return "\n".repeat(this._config.amount);
      },
    },
  ]);

  return DefaultBlockAppendor;
})(_BlockAppendor);

export default DefaultBlockAppendor;
