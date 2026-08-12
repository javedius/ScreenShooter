export function installElementPicker(outputOptions) {
  const PICKER_ATTRIBUTE = "data-screenshooter-picker";
  document.querySelector(`[${PICKER_ATTRIBUTE}]`)?.remove();

  const overlay = document.createElement("div");
  overlay.setAttribute(PICKER_ATTRIBUTE, "");
  Object.assign(overlay.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "2147483647",
    border: "2px solid #725cff",
    background: "rgba(114,92,255,.14)",
    borderRadius: "4px",
    boxSizing: "border-box",
    display: "none"
  });
  document.documentElement.appendChild(overlay);

  let hoveredElement;

  function showOverlay(element) {
    const rect = element.getBoundingClientRect();
    Object.assign(overlay.style, {
      display: "block",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    });
  }

  function handlePointerMove(event) {
    if (!(event.target instanceof Element) || event.target === overlay) return;
    hoveredElement = event.target;
    showOverlay(hoveredElement);
  }

  function visibleRect(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: Math.max(0, rect.left),
      y: Math.max(0, rect.top),
      width: Math.min(innerWidth, rect.right) - Math.max(0, rect.left),
      height: Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top),
      viewportWidth: innerWidth,
      viewportHeight: innerHeight
    };
  }

  function cleanup() {
    removeEventListener("mousemove", handlePointerMove, true);
    removeEventListener("click", handleSelection, true);
    removeEventListener("keydown", handleEscape, true);
    overlay.remove();
  }

  function handleSelection(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!hoveredElement) return;
    const rect = visibleRect(hoveredElement);
    cleanup();
    chrome.runtime.sendMessage({ type: "element-selected", rect, ...outputOptions });
  }

  function handleEscape(event) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    cleanup();
  }

  addEventListener("mousemove", handlePointerMove, true);
  addEventListener("click", handleSelection, true);
  addEventListener("keydown", handleEscape, true);
}
