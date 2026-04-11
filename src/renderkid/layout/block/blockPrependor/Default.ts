import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";
import { p } from "#utils";

import _BlockPrependor from "./_BlockPrependor";

const DefaultBlockPrependor = /*#__PURE__*/ (function (_require) {
  _inherits(DefaultBlockPrependor, _require);

  const _super = _createSuper(DefaultBlockPrependor);

  function DefaultBlockPrependor() {
    _classCallCheck(this, DefaultBlockPrependor);

    return _super.apply(this, arguments);
  }

  _createClass(DefaultBlockPrependor, [
    {
      key: "_render",
      value: function _render(options) {
        return "\n".repeat(this._config.amount);
      },
    },
  ]);

  return DefaultBlockPrependor;
})(_BlockPrependor);

export default DefaultBlockPrependor;
