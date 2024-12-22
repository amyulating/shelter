(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugins/remixer/index.ts
  var remixer_exports = {};
  __export(remixer_exports, {
    onUnload: () => onUnload
  });
  var {
    http: { intercept }
  } = shelter;
  var unintercept = intercept("post", /\/channels\/\d+\/messages/, async (req, send) => {
    if (req.body.attachments) {
      for (let i = 0; i < req.body.attachments.length; i++) {
        req.body.attachments[i] = {
          ...req.body.attachments[i],
          is_remix: true
        };
      }
    }
    return send(req);
  });
  function onUnload() {
    unintercept();
  }
  return __toCommonJS(remixer_exports);
})();
