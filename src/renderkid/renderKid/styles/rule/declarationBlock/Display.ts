import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";
import { p } from "#utils";

import _Declaration from "./_Declaration";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";

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
