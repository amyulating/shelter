import * as patcher from "spitroast";
import * as ui from "shelter-ui";
import * as util from "./util";
import * as plugins from "./plugins";
import { initSettings, removeAllSections } from "./settings";
import { initDispatchLogger } from "./dispatchLogger";
import { unobserve } from "./observer";
import windowApi from "./windowApi";

const start = performance.now();
util.log("shelter is initializing...");

(async () => {
  // load everything in parallel
  const unloads = await Promise.all([
    initSettings(),
    initDispatchLogger(),
    ui.cleanupCss,
    patcher.unpatchAll,
    unobserve,
    removeAllSections,
  ]);

  window["shelter"] = await windowApi(unloads);

  // once everything is fully inited, start plugins
  unloads.push(await plugins.startAllPlugins());

  util.log(`shelter is initialized. took: ${(performance.now() - start).toFixed(1)}ms`);
})();
