import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Declaration from "./_Declaration";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";
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
