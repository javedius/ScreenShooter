export const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.windowId) throw new Error("ACTIVE_TAB_MISSING");
  if (!/^https?:|^file:/.test(tab.url || "")) throw new Error("PAGE_NOT_SUPPORTED");
  return tab;
}

export function captureTab(windowId) {
  return chrome.tabs.captureVisibleTab(windowId, { format: "png" });
}

export async function runInTab(tabId, func, args = []) {
  const [{ result }] = await chrome.scripting.executeScript({ target: { tabId }, func, args });
  return result;
}
