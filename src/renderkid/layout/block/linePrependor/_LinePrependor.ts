import { _classCallCheck, _createClass } from "#renderkid/tools";

const _LinePrependor = /*#__PURE__*/ (function () {
  function _LinePrependor(_config) {
    _classCallCheck(this, _LinePrependor);

    this._config = _config;
    this._lineNo = -1;
  }

  _createClass(_LinePrependor, [
    {
      key: "render",
      value: function render(inherited, options) {
        this._lineNo++;
        return "<none>" + this._render(inherited, options) + "</none>";
      },
    },
  ]);

  return _LinePrependor;
})();

export default _LinePrependor;
