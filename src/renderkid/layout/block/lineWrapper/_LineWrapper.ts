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

const _LineWrapper = /*#__PURE__*/ (function () {
  function _LineWrapper() {
    _classCallCheck(this, _LineWrapper);
  }

  _createClass(_LineWrapper, [
    {
      key: "render",
      value: function render(str, options) {
        return this._render(str, options);
      },
    },
  ]);

  return _LineWrapper;
})();

export default _LineWrapper;
