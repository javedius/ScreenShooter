export async function detectBottomPinnedElements() {
  const root = document.querySelector("[data-screenshooter-scroll-root]") || document.scrollingElement;
  const startY = root.scrollTop;
  const points = [0.08, 0.3, 0.5, 0.7, 0.92].map((ratio) => [innerWidth * ratio, innerHeight - 8]);
  const candidates = points.map(([x, y]) => document.elementFromPoint(x, y));
  const initialTops = candidates.map((element) => element?.getBoundingClientRect().top);
  const distance = Math.min(80, Math.max(0, root.scrollHeight - root.clientHeight));
  if (!distance) return;
  root.scrollTo(0, Math.min(startY + distance, root.scrollHeight));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  candidates.forEach((element, index) => {
    if (!element || element === document.body || element === document.documentElement) return;
    if (Math.abs(element.getBoundingClientRect().top - initialTops[index]) > 2) return;
    let target = element;
    while (target.parentElement && target.parentElement !== document.body) {
      const parentRect = target.parentElement.getBoundingClientRect();
      if (parentRect.bottom < innerHeight - 3 || parentRect.top < innerHeight * 0.25) break;
      target = target.parentElement;
    }
    target.setAttribute("data-screenshooter-pinned", "");
  });
  root.scrollTo(0, startY);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

export async function scrollForCapture(y, hideTopPinnedElements) {
  const root = document.querySelector("[data-screenshooter-scroll-root]") || document.scrollingElement;
  root.scrollTo(0, y);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  for (const element of document.querySelectorAll("body *")) {
    const computed = getComputedStyle(element);
    if (computed.visibility === "hidden" || computed.display === "none") continue;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const top = Number.parseFloat(computed.top);
    const bottom = Number.parseFloat(computed.bottom);
    const isFixed = computed.position === "fixed";
    const stuckTop = computed.position === "sticky" && Number.isFinite(top) && rect.top <= top + 1;
    const stuckBottom = computed.position === "sticky" && Number.isFinite(bottom) && rect.bottom >= innerHeight - bottom - 1;
    const touchesBottom = rect.bottom >= innerHeight - 2 && rect.top > innerHeight * 0.35;
    const bottomPinned = (isFixed && (Number.isFinite(bottom) || touchesBottom)) || stuckBottom;
    if (bottomPinned || (hideTopPinnedElements && (isFixed || stuckTop))) {
      element.setAttribute("data-screenshooter-pinned", "");
    }
  }
  await new Promise((resolve) => requestAnimationFrame(resolve));
  return root.scrollTop;
}
