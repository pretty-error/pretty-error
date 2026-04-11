import {
  _classCallCheck,
  _createClass,
  _createSuper,
  _inherits,
} from "#renderkid/tools";

import SpecialString from "../../SpecialString";
import _LinePrependor from "./_LinePrependor";

const DefaultLinePrependor = function () {
  let self;

  const DefaultLinePrependor = /*#__PURE__*/ (function (_require) {
    _inherits(DefaultLinePrependor, _require);

    const _super = _createSuper(DefaultLinePrependor);

    function DefaultLinePrependor() {
      _classCallCheck(this, DefaultLinePrependor);

      return _super.apply(this, arguments);
    }

    _createClass(
      DefaultLinePrependor,
      [
        {
          key: "_render",
          value: function _render(inherited, options) {
            let addToLeft,
              addToRight,
              alignment,
              bullet,
              char,
              charLen,
              diff,
              left,
              output,
              space,
              toWrite;

            if (this._lineNo === 0 && (bullet = this._config.bullet)) {
              char = bullet.char;
              charLen = new SpecialString(char).length;
              alignment = bullet.alignment;
              space = this._config.amount;
              toWrite = char;
              addToLeft = "";
              addToRight = "";

              if (space > charLen) {
                diff = space - charLen;

                if (alignment === "right") {
                  addToLeft = self.pad(diff);
                } else if (alignment === "left") {
                  addToRight = self.pad(diff);
                } else if (alignment === "center") {
                  left = Math.round(diff / 2);
                  addToLeft = self.pad(left);
                  addToRight = self.pad(diff - left);
                } else {
                  throw Error("Unknown alignment `".concat(alignment, "`"));
                }
              }

              output = addToLeft + char + addToRight;
            } else {
              output = self.pad(this._config.amount);
            }

            return inherited + output;
          },
        },
      ],
      [
        {
          key: "pad",
          value: function pad(howMuch) {
            return " ".repeat(howMuch);
          },
        },
      ],
    );

    return DefaultLinePrependor;
  })(_LinePrependor);
  self = DefaultLinePrependor;
  return DefaultLinePrependor;
}.call(void 0);

export default DefaultLinePrependor;
