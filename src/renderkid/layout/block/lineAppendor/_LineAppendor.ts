import { _classCallCheck, _createClass } from "#renderkid/tools";

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
