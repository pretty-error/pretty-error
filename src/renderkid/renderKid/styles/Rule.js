function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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
