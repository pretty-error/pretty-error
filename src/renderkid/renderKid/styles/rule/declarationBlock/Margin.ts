import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Declaration from "./_Declaration";
import MarginTop from "./MarginTop";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";
import { p } from "#utils";

const Margin = function () {
  let self;

  const Margin = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Margin, _Declaration2);

    const _super = _createSuper(Margin);

    function Margin() {
      _classCallCheck(this, Margin);

      return _super.apply(this, arguments);
    }

    _createClass(Margin, null, [
      {
        key: "setOnto",
        value: function setOnto(declarations, prop, originalValue) {
          let append, val, vals;
          append = "";
          val = _Declaration.sanitizeValue(originalValue);

          if (_Declaration.importantClauseRx.test(String(val))) {
            append = " !important";
            val = val.replace(_Declaration.importantClauseRx, "");
          }

          val = val.trim();

          if (val.length === 0) {
            return self._setAllDirections(
              declarations,
              append,
              append,
              append,
              append,
            );
          }

          vals = val.split(" ").map(function (val) {
            return val + append;
          });

          if (vals.length === 1) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[0],
              vals[0],
              vals[0],
            );
          } else if (vals.length === 2) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[0],
              vals[1],
            );
          } else if (vals.length === 3) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[2],
              vals[1],
            );
          } else if (vals.length === 4) {
            return self._setAllDirections(
              declarations,
              vals[0],
              vals[1],
              vals[2],
              vals[3],
            );
          } else {
            throw Error(
              "Can't understand value for margin: `".concat(originalValue, "`"),
            );
          }
        },
      },
      {
        key: "_setAllDirections",
        value: function _setAllDirections(
          declarations,
          top,
          right,
          bottom,
          left,
        ) {
          MarginTop.setOnto(declarations, "marginTop", top);
          MarginTop.setOnto(declarations, "marginRight", right);
          MarginTop.setOnto(declarations, "marginBottom", bottom);
          MarginTop.setOnto(declarations, "marginLeft", left);
        },
      },
    ]);

    return Margin;
  })(_Declaration);
  self = Margin;
  return Margin;
}.call(void 0);

export default Margin;
