let creatingDocument;

async function ensureOffscreenDocument() {
  const url = chrome.runtime.getURL("offscreen.html");
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [url]
  });
  if (contexts.length) return;
  if (!creatingDocument) {
    creatingDocument = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["BLOBS"],
      justification: "Compose screenshot frames and create the output file"
    }).finally(() => { creatingDocument = undefined; });
  }
  await creatingDocument;
}

export async function renderOutput(request) {
  await ensureOffscreenDocument();
  const result = await chrome.runtime.sendMessage({ target: "offscreen", type: "render", ...request });
  if (!result?.ok) throw new Error(result?.error || "OUTPUT_FAILED");
  return result;
}

export function revokeOutputUrl(url) {
  if (!url) return Promise.resolve();
  return chrome.runtime.sendMessage({ target: "offscreen", type: "revoke", url }).catch(() => {});
}
