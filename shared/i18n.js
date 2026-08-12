export const translations = {
  ru: {
    subtitle: "Сохранить в PNG или PDF",
    format: "Формат",
    captureMode: "Режим снимка",
    visibleTitle: "Видимая область",
    visibleDescription: "Только то, что сейчас на экране",
    fullTitle: "Вся страница",
    fullDescription: "Автопрокрутка и склейка",
    elementTitle: "Выбрать элемент",
    elementDescription: "Навести и кликнуть на блок страницы",
    selectingElement: "Выберите элемент на странице…",
    capturingPage: "Очищаю и снимаю страницу…",
    capturing: "Делаю снимок…",
    saved: "Готово — снимок сохранён",
    captureFailed: "Не удалось сделать снимок",
    pickerFailed: "Не удалось включить выбор",
    unsupportedPage: "Эту служебную страницу браузера нельзя снять",
    activeTabMissing: "Не удалось определить активную вкладку",
    elementNotVisible: "Выбранный элемент не виден на экране",
    genericError: "Не удалось сделать снимок. Обновите страницу и попробуйте снова"
  },
  en: {
    subtitle: "Save as PNG or PDF",
    format: "Format",
    captureMode: "Capture mode",
    visibleTitle: "Visible area",
    visibleDescription: "Only what is currently on screen",
    fullTitle: "Full page",
    fullDescription: "Auto-scroll and stitch",
    elementTitle: "Select element",
    elementDescription: "Hover and click a page element",
    selectingElement: "Select an element on the page…",
    capturingPage: "Cleaning and capturing the page…",
    capturing: "Capturing…",
    saved: "Done — screenshot saved",
    captureFailed: "Could not capture the screenshot",
    pickerFailed: "Could not start element selection",
    unsupportedPage: "Browser system pages cannot be captured",
    activeTabMissing: "Could not find the active tab",
    elementNotVisible: "The selected element is not visible",
    genericError: "Could not capture the screenshot. Reload the page and try again"
  }
};

export function detectLanguage() {
  const locale = globalThis.chrome?.i18n?.getUILanguage?.() || globalThis.navigator?.language || "en";
  return locale.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function translator(language = detectLanguage()) {
  const messages = translations[language] || translations.en;
  return (key) => messages[key] || translations.en[key] || key;
}
