import * as tools from "../../tools";
import _common from "./_common";

const self = {
  applyTo: function applyTo(el, style) {
    let ret;
    ret = _common.getStyleTagsFor(style);

    if (style.marginLeft != null) {
      ret.before =
        tools.repeatString("&sp;", parseInt(style.marginLeft)) + ret.before;
    }

    if (style.marginRight != null) {
      ret.after += tools.repeatString("&sp;", parseInt(style.marginRight));
    }

    if (style.paddingLeft != null) {
      ret.before += tools.repeatString("&sp;", parseInt(style.paddingLeft));
    }

    if (style.paddingRight != null) {
      ret.after =
        tools.repeatString("&sp;", parseInt(style.paddingRight)) + ret.after;
    }

    return ret;
  },
};

export default self;
