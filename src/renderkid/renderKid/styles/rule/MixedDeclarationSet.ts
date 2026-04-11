import { _classCallCheck, _createClass } from "#renderkid/tools";

const MixedDeclarationSet = function () {
  let self;

  const MixedDeclarationSet = /*#__PURE__*/ (function () {
    function MixedDeclarationSet() {
      _classCallCheck(this, MixedDeclarationSet);

      this._declarations = {};
    }

    _createClass(
      MixedDeclarationSet,
      [
        {
          key: "mixWithList",
          value: function mixWithList(rules) {
            let i, len, rule;
            rules.sort(function (a, b) {
              return a.selector.priority > b.selector.priority;
            });

            for (i = 0, len = rules.length; i < len; i++) {
              rule = rules[i];

              this._mixWithRule(rule);
            }

            return this;
          },
        },
        {
          key: "_mixWithRule",
          value: function _mixWithRule(rule) {
            let dec, prop, ref;
            ref = rule.styles._declarations;

            for (prop in ref) {
              dec = ref[prop];

              this._mixWithDeclaration(dec);
            }
          },
        },
        {
          key: "_mixWithDeclaration",
          value: function _mixWithDeclaration(dec) {
            let cur;
            cur = this._declarations[dec.prop];

            if (cur != null && cur.important && !dec.important) {
              return;
            }

            this._declarations[dec.prop] = dec;
          },
        },
        {
          key: "get",
          value: function get(prop) {
            if (prop == null) {
              return this._declarations;
            }

            if (this._declarations[prop] == null) {
              return null;
            }

            return this._declarations[prop].val;
          },
        },
        {
          key: "toObject",
          value: function toObject() {
            let dec, obj, prop, ref;
            obj = {};
            ref = this._declarations;

            for (prop in ref) {
              dec = ref[prop];
              obj[prop] = dec.val;
            }

            return obj;
          },
        },
      ],
      [
        {
          key: "mix",
          value: function mix() {
            let i, len, mixed, rules;
            mixed = new self();

            for (
              var _len = arguments.length, ruleSets = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              ruleSets[_key] = arguments[_key];
            }

            for (i = 0, len = ruleSets.length; i < len; i++) {
              rules = ruleSets[i];
              mixed.mixWithList(rules);
            }

            return mixed;
          },
        },
      ],
    );

    return MixedDeclarationSet;
  })();
  self = MixedDeclarationSet;
  return MixedDeclarationSet;
}.call(void 0);

export default MixedDeclarationSet;
