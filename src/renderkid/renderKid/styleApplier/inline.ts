import _common from "./_common";

const self = {
  applyTo: function applyTo(el, style) {
    let ret;
    ret = _common.getStyleTagsFor(style);

    if (style.marginLeft != null) {
      ret.before = "&sp;".repeat(parseInt(style.marginLeft)) + ret.before;
    }

    if (style.marginRight != null) {
      ret.after += "&sp;".repeat(parseInt(style.marginRight));
    }

    if (style.paddingLeft != null) {
      ret.before += "&sp;".repeat(parseInt(style.paddingLeft));
    }

    if (style.paddingRight != null) {
      ret.after = "&sp;".repeat(parseInt(style.paddingRight)) + ret.after;
    }

    return ret;
  },
};

export default self;
