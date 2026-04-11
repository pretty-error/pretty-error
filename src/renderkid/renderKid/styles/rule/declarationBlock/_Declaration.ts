import { _classCallCheck, _createClass } from "#renderkid/tools";

const _Declaration = function () {
  let self;

  const _Declaration = /*#__PURE__*/ (function () {
    function _Declaration(prop1, val) {
      _classCallCheck(this, _Declaration);

      this.prop = prop1;
      this.important = false;
      this.set(val);
    }

    _createClass(
      _Declaration,
      [
        {
          key: "get",
          value: function get() {
            return this._get();
          },
        },
        {
          key: "_get",
          value: function _get() {
            return this.val;
          },
        },
        {
          key: "_pickImportantClause",
          value: function _pickImportantClause(val) {
            if (self.importantClauseRx.test(String(val))) {
              this.important = true;
              return val.replace(self.importantClauseRx, "");
            } else {
              this.important = false;
              return val;
            }
          },
        },
        {
          key: "set",
          value: function set(val) {
            val = self.sanitizeValue(val);
            val = this._pickImportantClause(val);
            val = val.trim();

            if (this._handleNullOrInherit(val)) {
              return this;
            }

            this._set(val);

            return this;
          },
        },
        {
          key: "_set",
          value: function _set(val) {
            return (this.val = val);
          },
        },
        {
          key: "_handleNullOrInherit",
          value: function _handleNullOrInherit(val) {
            if (val === "") {
              this.val = "";
              return true;
            }

            if (val === "inherit") {
              if (this.constructor.inheritAllowed) {
                this.val = "inherit";
              } else {
                throw Error(
                  "Inherit is not allowed for `".concat(this.prop, "`"),
                );
              }

              return true;
            } else {
              return false;
            }
          },
        },
      ],
      [
        {
          key: "setOnto",
          value: function setOnto(declarations, prop, val) {
            let dec;

            if (!(dec = declarations[prop])) {
              return (declarations[prop] = new this(prop, val));
            } else {
              return dec.set(val);
            }
          },
        },
        {
          key: "sanitizeValue",
          value: function sanitizeValue(val) {
            return String(val).trim().replace(/[\s]+/g, " ");
          },
        },
      ],
    );

    return _Declaration;
  })();
  self = _Declaration;
  _Declaration.importantClauseRx = /(\s!important)$/;
  _Declaration.inheritAllowed = false;
  return _Declaration;
}.call(void 0);

export default _Declaration;
