export function restorePage(originalY) {
  document.querySelectorAll("[data-screenshooter-pinned]").forEach((element) => element.removeAttribute("data-screenshooter-pinned"));
  document.querySelectorAll("[data-screenshooter-nuisance]").forEach((element) => element.removeAttribute("data-screenshooter-nuisance"));
  for (const root of [document.documentElement, document.body]) {
    if (!("screenshooterOverflow" in root.dataset)) continue;
    const value = root.dataset.screenshooterOverflow;
    const priority = root.dataset.screenshooterOverflowPriority;
    value ? root.style.setProperty("overflow", value, priority) : root.style.removeProperty("overflow");
    delete root.dataset.screenshooterOverflow;
    delete root.dataset.screenshooterOverflowPriority;
  }
  document.querySelector("style[data-screenshooter-style]")?.remove();
  const scrollRoot = document.querySelector("[data-screenshooter-scroll-root]") || document.scrollingElement;
  scrollRoot.scrollTo(0, originalY);
  scrollRoot.removeAttribute("data-screenshooter-scroll-root");
}
