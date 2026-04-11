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

let i, len, prop, ref;

const SpecialString = function () {
  let self;

  const SpecialString = /*#__PURE__*/ (function () {
    function SpecialString(str) {
      _classCallCheck(this, SpecialString);

      if (!(this instanceof self)) {
        return new self(str);
      }

      this._str = String(str);
      this._len = 0;
    }

    _createClass(
      SpecialString,
      [
        {
          key: "_getStr",
          value: function _getStr() {
            return this._str;
          },
        },
        {
          key: "set",
          value: function set(str) {
            this._str = String(str);
            return this;
          },
        },
        {
          key: "clone",
          value: function clone() {
            return new SpecialString(this._str);
          },
        },
        {
          key: "isEmpty",
          value: function isEmpty() {
            return this._str === "";
          },
        },
        {
          key: "isOnlySpecialChars",
          value: function isOnlySpecialChars() {
            return !this.isEmpty() && this.length === 0;
          },
        },
        {
          key: "_reset",
          value: function _reset() {
            return (this._len = 0);
          },
        },
        {
          key: "splitIn",
          value: function splitIn(limit) {
            const trimLeftEachLine =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : false;
            let buffer, bufferLength, justSkippedSkipChar, lines;
            buffer = "";
            bufferLength = 0;
            lines = [];
            justSkippedSkipChar = false;

            self._countChars(this._str, function (char, charLength) {
              if (bufferLength > limit || bufferLength + charLength > limit) {
                lines.push(buffer);
                buffer = "";
                bufferLength = 0;
              }

              if (
                bufferLength === 0 &&
                char === " " &&
                !justSkippedSkipChar &&
                trimLeftEachLine
              ) {
                return (justSkippedSkipChar = true);
              } else {
                buffer += char;
                bufferLength += charLength;
                return (justSkippedSkipChar = false);
              }
            });

            if (buffer.length > 0) {
              lines.push(buffer);
            }

            return lines;
          },
        },
        {
          key: "trim",
          value: function trim() {
            return new SpecialString(this.str.trim());
          },
        },
        {
          key: "_getLength",
          value: function _getLength() {
            let sum;
            sum = 0;

            self._countChars(this._str, function (char, charLength) {
              sum += charLength;
            });

            return sum;
          },
        },
        {
          key: "cut",
          value: function cut(from, to) {
            const _this = this;

            const trimLeft =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : false;
            let after, before, cur, cut;

            if (to == null) {
              to = this.length;
            }

            from = parseInt(from);

            if (from >= to) {
              throw Error("`from` shouldn't be larger than `to`");
            }

            before = "";
            after = "";
            cut = "";
            cur = 0;

            self._countChars(this._str, function (char, charLength) {
              if (_this.str === "ab<tag>") {
                console.log(charLength, char);
              }

              if (cur === from && char.match(/^\s+$/) && trimLeft) {
                return;
              }

              if (cur < from) {
                before += char; // let's be greedy
              } else if (cur < to || cur + charLength <= to) {
                cut += char;
              } else {
                after += char;
              }

              cur += charLength;
            });

            this._str = before + after;

            this._reset();

            return new SpecialString(cut);
          },
        },
      ],
      [
        {
          key: "_countChars",
          value: function _countChars(text, cb) {
            let char, charLength, m;

            while (text.length !== 0) {
              if ((m = text.match(self._tagRx))) {
                char = m[0];
                charLength = 0;
                text = text.substr(char.length, text.length);
              } else if ((m = text.match(self._quotedHtmlRx))) {
                char = m[0];
                charLength = 1;
                text = text.substr(char.length, text.length);
              } else if (text.match(self._tabRx)) {
                char = "\t";
                charLength = 8;
                text = text.substr(1, text.length);
              } else {
                char = text[0];
                charLength = 1;
                text = text.substr(1, text.length);
              }

              cb.call(null, char, charLength);
            }
          },
        },
      ],
    );

    return SpecialString;
  })();
  self = SpecialString;
  SpecialString._tabRx = /^\t/;
  SpecialString._tagRx = /^<[^>]+>/;
  SpecialString._quotedHtmlRx = /^&(gt|lt|quot|amp|apos|sp);/;
  return SpecialString;
}.call(void 0);

ref = ["str", "length"];

for (i = 0, len = ref.length; i < len; i++) {
  prop = ref[i];

  (function () {
    let methodName;
    methodName = "_get" + prop[0].toUpperCase() + prop.substr(1, prop.length);
    return SpecialString.prototype.__defineGetter__(prop, function () {
      return this[methodName]();
    });
  })();
}

export default SpecialString;
