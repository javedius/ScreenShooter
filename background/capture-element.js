import { captureTab, getActiveTab, runInTab, wait } from "./browser.js";
import { deliverCapture } from "./output.js";
import { installElementPicker } from "../page/element-picker.js";

export async function startElementPicker(options) {
  const tab = await getActiveTab();
  await runInTab(tab.id, installElementPicker, [options]);
}

export async function captureElement(rect, sourceTab, options) {
  validateRect(rect);
  const tab = sourceTab?.windowId ? sourceTab : await getActiveTab();
  await wait(50);
  const dataUrl = await captureTab(tab.windowId);
  await deliverCapture({
    mode: "element",
    frames: [{ y: 0, dataUrl }],
    width: rect.viewportWidth,
    fullHeight: rect.viewportHeight,
    crop: rect,
    options
  });
}

function validateRect(rect) {
  if (!rect || rect.width <= 0 || rect.height <= 0) throw new Error("ELEMENT_NOT_VISIBLE");
}
