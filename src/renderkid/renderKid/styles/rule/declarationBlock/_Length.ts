import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";
import { _createSuper } from "#renderkid/tools";
import { p, sp } from "#utils";

import _Declaration from "./_Declaration";

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
