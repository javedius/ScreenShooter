import { elements } from "./elements.js";
import { language, localizePage, t } from "./localization.js";
import { bindSettings, currentOptions, loadSettings } from "./settings.js";
import { captureFinished, captureStarted, setControlsDisabled, showStatus } from "./ui.js";

localizePage();
setControlsDisabled(true);
bindSettings();
const settingsReady = loadSettings().finally(() => setControlsDisabled(false));

elements.visibleButton.addEventListener("click", () => runCapture("visible"));
elements.fullButton.addEventListener("click", () => runCapture("full"));
elements.elementButton.addEventListener("click", startElementSelection);

async function runCapture(type) {
  await settingsReady;
  const options = { ...currentOptions(), language };
  setControlsDisabled(true);
  captureStarted(type);
  try {
    await sendCaptureMessage({ type, ...options });
    captureFinished();
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    setControlsDisabled(false);
  }
}

async function startElementSelection() {
  await settingsReady;
  const options = { ...currentOptions(), language };
  setControlsDisabled(true);
  showStatus(t("selectingElement"));
  try {
    await sendCaptureMessage({ type: "pick-element", ...options });
    window.close();
  } catch (error) {
    showStatus(error.message, true);
    setControlsDisabled(false);
  }
}

async function sendCaptureMessage(message) {
  const response = await chrome.runtime.sendMessage(message);
  if (!response?.ok) throw new Error(response?.error || t("captureFailed"));
}
