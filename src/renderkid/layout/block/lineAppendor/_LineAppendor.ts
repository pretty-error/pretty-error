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

const _LineAppendor = /*#__PURE__*/ (function () {
  function _LineAppendor(_config) {
    _classCallCheck(this, _LineAppendor);

    this._config = _config;
    this._lineNo = 0;
  }

  _createClass(_LineAppendor, [
    {
      key: "render",
      value: function render(inherited, options) {
        this._lineNo++;
        return "<none>" + this._render(inherited, options) + "</none>";
      },
    },
  ]);

  return _LineAppendor;
})();

export default _LineAppendor;
