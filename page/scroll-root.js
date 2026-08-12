export function selectScrollRoot() {
  const documentRoot = document.scrollingElement || document.documentElement;
  let scrollRoot = documentRoot;
  let bestArea = documentRoot.scrollHeight * documentRoot.clientWidth;
  for (const element of document.querySelectorAll("body *")) {
    const computed = getComputedStyle(element);
    if (!/(auto|scroll|overlay)/.test(computed.overflowY)) continue;
    if (element.scrollHeight <= element.clientHeight + 20) continue;
    const rect = element.getBoundingClientRect();
    const visibleWidth = Math.min(innerWidth, Math.max(0, rect.right)) - Math.max(0, rect.left);
    const visibleHeight = Math.min(innerHeight, Math.max(0, rect.bottom)) - Math.max(0, rect.top);
    if (visibleWidth < innerWidth * 0.45 || visibleHeight < innerHeight * 0.45) continue;
    const area = element.scrollHeight * visibleWidth;
    if (area > bestArea) {
      scrollRoot = element;
      bestArea = area;
    }
  }
  scrollRoot.setAttribute("data-screenshooter-scroll-root", "");
}

export function readPageMetrics() {
  const root = document.querySelector("[data-screenshooter-scroll-root]") || document.scrollingElement;
  return { width: innerWidth, viewportHeight: root.clientHeight, fullHeight: root.scrollHeight, originalY: root.scrollTop };
}
