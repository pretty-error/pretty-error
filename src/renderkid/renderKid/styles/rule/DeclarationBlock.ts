import Arbitrary from "./declarationBlock/Arbitrary";
import Background from "./declarationBlock/Background";
import Bullet from "./declarationBlock/Bullet";
import Color from "./declarationBlock/Color";
import Display from "./declarationBlock/Display";
import Height from "./declarationBlock/Height";
import Margin from "./declarationBlock/Margin";
import MarginBottom from "./declarationBlock/MarginBottom";
import MarginLeft from "./declarationBlock/MarginLeft";
import MarginRight from "./declarationBlock/MarginRight";
import MarginTop from "./declarationBlock/MarginTop";
import Padding from "./declarationBlock/Padding";
import PaddingBottom from "./declarationBlock/PaddingBottom";
import PaddingLeft from "./declarationBlock/PaddingLeft";
import PaddingRight from "./declarationBlock/PaddingRight";
import PaddingTop from "./declarationBlock/PaddingTop";
import Width from "./declarationBlock/Width";

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

let declarationClasses;

const DeclarationBlock = function () {
  let self;

  const DeclarationBlock = /*#__PURE__*/ (function () {
    function DeclarationBlock() {
      _classCallCheck(this, DeclarationBlock);

      this._declarations = {};
    }

    _createClass(
      DeclarationBlock,
      [
        {
          key: "set",
          value: function set(prop, value) {
            let key, val;

            if (typeof prop === "object") {
              for (key in prop) {
                val = prop[key];
                this.set(key, val);
              }

              return this;
            }

            prop = self.sanitizeProp(prop);

            this._getDeclarationClass(prop).setOnto(
              this._declarations,
              prop,
              value,
            );

            return this;
          },
        },
        {
          key: "_getDeclarationClass",
          value: function _getDeclarationClass(prop) {
            let cls;

            if (prop[0] === "_") {
              return Arbitrary;
            }

            if (!(cls = declarationClasses[prop])) {
              throw Error(
                "Unknown property `"
                  .concat(prop, "`. Write it as `_")
                  .concat(prop, "` if you're defining a custom property"),
              );
            }

            return cls;
          },
        },
      ],
      [
        {
          key: "sanitizeProp",
          value: function sanitizeProp(prop) {
            return String(prop).trim();
          },
        },
      ],
    );

    return DeclarationBlock;
  })();
  self = DeclarationBlock;
  return DeclarationBlock;
}.call(void 0);

declarationClasses = {
  color: Color,
  background: Background,
  width: Width,
  height: Height,
  bullet: Bullet,
  display: Display,
  margin: Margin,
  marginTop: MarginTop,
  marginLeft: MarginLeft,
  marginRight: MarginRight,
  marginBottom: MarginBottom,
  padding: Padding,
  paddingTop: PaddingTop,
  paddingLeft: PaddingLeft,
  paddingRight: PaddingRight,
  paddingBottom: PaddingBottom,
};

export default DeclarationBlock;
