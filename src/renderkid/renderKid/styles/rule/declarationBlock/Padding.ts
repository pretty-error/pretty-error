import { _classCallCheck, _createClass } from "#renderkid/tools";
import { _inherits } from "#renderkid/tools";

import _Declaration from "./_Declaration";
import PaddingTop from "./PaddingTop";

const _setPrototypeOf = Object.setPrototypeOf;

import { _createSuper } from "#renderkid/tools";
import { p } from "#utils";

const Padding = function () {
  let self;

  const Padding = /*#__PURE__*/ (function (_Declaration2) {
    _inherits(Padding, _Declaration2);

    const _super = _createSuper(Padding);

    function Padding() {
      _classCallCheck(this, Padding);

      return _super.apply(this, arguments);
    }

    _createClass(Padding, null, [
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
              "Can't understand value for padding: `".concat(
                originalValue,
                "`",
              ),
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
          PaddingTop.setOnto(declarations, "paddingTop", top);
          PaddingTop.setOnto(declarations, "paddingRight", right);
          PaddingTop.setOnto(declarations, "paddingBottom", bottom);
          PaddingTop.setOnto(declarations, "paddingLeft", left);
        },
      },
    ]);

    return Padding;
  })(_Declaration);
  self = Padding;
  return Padding;
}.call(void 0);

export default Padding;
