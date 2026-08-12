import { elements } from "./elements.js";

export async function loadSettings() {
  const settings = await chrome.storage.local.get({ format: "png" });
  checkInput(elements.formatInputs, settings.format);
}

export function bindSettings() {
  elements.formatInputs.forEach((input) => input.addEventListener("change", () => {
    chrome.storage.local.set({ format: input.value });
  }));
}

export function currentOptions() {
  return { format: checkedValue(elements.formatInputs, "png") };
}

function checkInput(inputs, value) {
  const input = inputs.find((item) => item.value === value);
  if (input) input.checked = true;
}

function checkedValue(inputs, fallback) {
  return inputs.find((input) => input.checked)?.value || fallback;
}
