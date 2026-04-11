import { _classCallCheck, _createClass } from "#renderkid/tools";

import DeclarationBlock from "./rule/DeclarationBlock";
import Selector from "./rule/Selector";

const Rule = /*#__PURE__*/ (function () {
  function Rule(selector) {
    _classCallCheck(this, Rule);

    this.selector = new Selector(selector);
    this.styles = new DeclarationBlock();
  }

  _createClass(Rule, [
    {
      key: "setStyles",
      value: function setStyles(styles) {
        this.styles.set(styles);
        return this;
      },
    },
  ]);

  return Rule;
})();

export default Rule;
