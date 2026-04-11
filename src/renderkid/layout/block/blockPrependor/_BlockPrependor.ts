import { _classCallCheck, _createClass } from "#renderkid/tools";

const _BlockPrependor = /*#__PURE__*/ (function () {
  function _BlockPrependor(_config) {
    _classCallCheck(this, _BlockPrependor);

    this._config = _config;
  }

  _createClass(_BlockPrependor, [
    {
      key: "render",
      value: function render(options) {
        return this._render(options);
      },
    },
  ]);

  return _BlockPrependor;
})();

export default _BlockPrependor;
