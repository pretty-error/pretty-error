import { _classCallCheck, _createClass } from "#renderkid/tools";

const _BlockAppendor = /*#__PURE__*/ (function () {
  function _BlockAppendor(_config) {
    _classCallCheck(this, _BlockAppendor);

    this._config = _config;
  }

  _createClass(_BlockAppendor, [
    {
      key: "render",
      value: function render(options) {
        return this._render(options);
      },
    },
  ]);

  return _BlockAppendor;
})();

export default _BlockAppendor;
