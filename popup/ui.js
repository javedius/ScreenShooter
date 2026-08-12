import { elements } from "./elements.js";
import { t } from "./localization.js";

export function setControlsDisabled(disabled) {
  elements.visibleButton.disabled = disabled;
  elements.fullButton.disabled = disabled;
  elements.elementButton.disabled = disabled;
  elements.formatFieldset.disabled = disabled;
}

export function showStatus(message, isError = false) {
  elements.status.className = isError ? "status error" : "status";
  elements.status.textContent = message;
}

export function captureStarted(type) {
  showStatus(type === "full" ? t("capturingPage") : t("capturing"));
}

export function captureFinished() {
  showStatus(t("saved"));
}
