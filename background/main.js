import { captureElement, startElementPicker } from "./capture-element.js";
import { captureFullPage } from "./capture-full.js";
import { captureVisibleArea } from "./capture-visible.js";
import { friendlyError } from "../shared/errors.js";
import { normalizeOptions } from "../shared/options.js";

const handlers = {
  visible: (message) => captureVisibleArea(normalizeOptions(message)),
  full: (message) => captureFullPage(normalizeOptions(message)),
  "pick-element": (message) => startElementPicker(normalizeOptions(message)),
  "element-selected": (message, sender) => captureElement(message.rect, sender.tab, normalizeOptions(message))
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const handler = handlers[message.type];
  if (!handler) return undefined;
  handler(message, sender)
    .then(() => sendResponse({ ok: true }))
    .catch((error) => {
      console.error(error);
      sendResponse({ ok: false, error: friendlyError(error, message.language) });
    });
  return true;
});
