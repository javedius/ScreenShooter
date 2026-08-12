import { makeFilename } from "../shared/options.js";
import { renderOutput, revokeOutputUrl } from "./offscreen-client.js";

export async function deliverCapture({ mode, frames, width, fullHeight, crop, options }) {
  if (mode === "visible" && options.format === "png") {
    await chrome.downloads.download({ url: frames[0].dataUrl, filename: makeFilename(mode, "png"), saveAs: false });
    return;
  }

  const result = await renderOutput({ frames, width, fullHeight, crop, ...options });
  const url = result.url;
  if (!url) throw new Error("OUTPUT_URL_MISSING");
  try {
    await chrome.downloads.download({ url, filename: makeFilename(mode, options.format), saveAs: false });
  } finally {
    await revokeOutputUrl(url);
  }
}
