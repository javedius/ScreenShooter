import { composeCapture } from "./canvas.js";
import { createOutputBlob } from "./output.js";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== "offscreen") return undefined;
  if (message.type === "revoke") {
    URL.revokeObjectURL(message.url);
    sendResponse({ ok: true });
    return undefined;
  }
  if (message.type !== "render") return undefined;
  render(message)
    .then((result) => sendResponse({ ok: true, ...result }))
    .catch((error) => {
      console.error(error);
      sendResponse({ ok: false, error: error.message });
    });
  return true;
});

async function render(request) {
  const canvas = await composeCapture(request);
  const blob = await createOutputBlob(canvas, request.format);
  return { url: URL.createObjectURL(blob) };
}
