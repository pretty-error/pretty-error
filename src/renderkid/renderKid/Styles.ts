import { _classCallCheck, _createClass } from "#renderkid/tools";

import * as tools from "../tools";
import MixedDeclarationSet from "./styles/rule/MixedDeclarationSet";
import StyleSheet from "./styles/StyleSheet";

const terminalWidth = tools.getCols();

const Styles = function () {
  let self;

  const Styles = /*#__PURE__*/ (function () {
    function Styles() {
      _classCallCheck(this, Styles);

      this._defaultStyles = new StyleSheet();
      this._userStyles = new StyleSheet();

      this._setDefaultStyles();
    }

    _createClass(Styles, [
      {
        key: "_setDefaultStyles",
        value: function _setDefaultStyles() {
          this._defaultStyles.setRule(self.defaultRules);
        },
      },
      {
        key: "setRule",
        value: function setRule(selector, rules) {
          this._userStyles.setRule.apply(this._userStyles, arguments);

          return this;
        },
      },
      {
        key: "getStyleFor",
        value: function getStyleFor(el) {
          let styles;
          styles = el.styles;

          if (styles == null) {
            el.styles = styles = this._getComputedStyleFor(el);
          }

          return styles;
        },
      },
      {
        key: "_getRawStyleFor",
        value: function _getRawStyleFor(el) {
          let def, user;
          def = this._defaultStyles.getRulesFor(el);
          user = this._userStyles.getRulesFor(el);
          return MixedDeclarationSet.mix(def, user).toObject();
        },
      },
      {
        key: "_getComputedStyleFor",
        value: function _getComputedStyleFor(el) {
          let decs, parent, prop, ref, val;
          decs = {};
          parent = el.parent;
          ref = this._getRawStyleFor(el);

          for (prop in ref) {
            val = ref[prop];

            if (val !== "inherit") {
              decs[prop] = val;
            } else {
              throw Error("Inherited styles are not supported yet.");
            }
          }

          return decs;
        },
      },
    ]);

    return Styles;
  })();
  self = Styles;
  Styles.defaultRules = {
    "*": {
      display: "inline",
    },
    body: {
      background: "none",
      color: "white",
      display: "block",
      width: terminalWidth + " !important",
    },
  };
  return Styles;
}.call(void 0);

export default Styles;
