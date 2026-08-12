import { captureTab, getActiveTab, runInTab } from "./browser.js";
import { deliverCapture } from "./output.js";

export async function captureVisibleArea(options) {
  const tab = await getActiveTab();
  const viewport = await runInTab(tab.id, () => ({ width: innerWidth, height: innerHeight }));
  const dataUrl = await captureTab(tab.windowId);
  await deliverCapture({
    mode: "visible",
    frames: [{ y: 0, dataUrl }],
    width: viewport.width,
    fullHeight: viewport.height,
    options
  });
}
