import { captureTab, getActiveTab, runInTab, wait } from "./browser.js";
import { deliverCapture } from "./output.js";
import { installCaptureStyles } from "../page/capture-styles.js";
import { hidePageNuisances } from "../page/nuisances.js";
import { detectBottomPinnedElements, scrollForCapture } from "../page/pinned-elements.js";
import { restorePage } from "../page/restore.js";
import { readPageMetrics, selectScrollRoot } from "../page/scroll-root.js";

const CAPTURE_INTERVAL_MS = 550;

export async function captureFullPage(options) {
  const tab = await getActiveTab();
  let originalY = 0;
  try {
    await runInTab(tab.id, installCaptureStyles);
    await runInTab(tab.id, hidePageNuisances);
    await runInTab(tab.id, selectScrollRoot);
    const metrics = await runInTab(tab.id, readPageMetrics);
    originalY = metrics.originalY;
    await runInTab(tab.id, detectBottomPinnedElements);
    const frames = await captureFrames(tab, metrics);
    await deliverCapture({
      mode: "full-page",
      frames,
      width: metrics.width,
      fullHeight: metrics.fullHeight,
      options
    });
  } finally {
    await runInTab(tab.id, restorePage, [originalY]).catch(() => {});
  }
}

async function captureFrames(tab, metrics) {
  const frames = [];
  const positions = createScrollPositions(metrics.fullHeight, metrics.viewportHeight);
  for (const [index, requestedY] of positions.entries()) {
    const actualY = await runInTab(tab.id, scrollForCapture, [requestedY, index > 0]);
    if (frames.at(-1)?.y === actualY) continue;
    await wait(CAPTURE_INTERVAL_MS);
    frames.push({ y: actualY, dataUrl: await captureTab(tab.windowId) });
  }
  return frames;
}

function createScrollPositions(fullHeight, viewportHeight) {
  const positions = [];
  for (let y = 0; y < fullHeight; y += viewportHeight) {
    positions.push(Math.min(y, Math.max(0, fullHeight - viewportHeight)));
  }
  return [...new Set(positions)];
}
