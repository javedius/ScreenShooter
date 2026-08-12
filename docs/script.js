const translations = {
  en: {
    navFeatures: "Features", navInstall: "Install", navPrivacy: "Privacy", eyebrow: "Lightweight browser extension", heroTitle: "Capture more than what fits on the screen.", heroText: "Save a visible area, an entire scrolling page, or one precise element. Clean PNG and PDF exports in a couple of clicks.", getExtension: "Get the extension", seeFeatures: "See how it works", local: "Processed locally", noAccount: "No account", openSource: "Open source", previewSubtitle: "Choose what to capture", visibleTitle: "Visible area", visibleText: "Everything currently on screen", fullTitle: "Full page", fullText: "The whole scrolling page", elementTitle: "Select element", elementText: "Pick one part of the page", featuresKicker: "Three capture modes", featuresTitle: "The right screenshot every time.", featuresText: "From a quick snapshot to a page several screens long.", featureVisible: "Capture the current browser viewport exactly as you see it.", featureFull: "Automatically scroll and stitch the page into one clean image.", featureElement: "Point at a page element and capture only the part you need.", cleanBadge: "Clean capture", cleanKicker: "Less cleanup", cleanTitle: "The page, without the clutter.", cleanText: "During full-page capture, ScreenShooter hides scrollbars, repeated sticky headers, cookie banners, chat widgets, and common advertising overlays.", cleanOne: "No repeated sticky navigation", cleanTwo: "No scrollbar in the final image", cleanThree: "Cleaner long screenshots", pngTitle: "Pixel-perfect images", pngText: "Ideal for sharing, documentation, and visual references.", pdfTitle: "Ready-to-send documents", pdfText: "Save a long capture as a convenient PDF file.", installKicker: "Install in a minute", installTitle: "Start capturing.", stepOneTitle: "Download", stepOneText: "Download or clone ScreenShooter from GitHub.", stepTwoTitle: "Open extensions", stepTwoText: "Visit chrome://extensions and enable Developer mode.", stepThreeTitle: "Load it", stepThreeText: "Choose “Load unpacked” and select the project folder.", openGithub: "Open on GitHub", ctaTitle: "One extension. The whole page.", ctaText: "Capture exactly what you need and keep moving.", footerText: "Lightweight screenshot extension for Chromium browsers."
  },
  ru: {
    navFeatures: "Возможности", navInstall: "Установка", navPrivacy: "Конфиденциальность", eyebrow: "Лёгкое расширение для браузера", heroTitle: "Снимайте больше, чем помещается на экране.", heroText: "Сохраняйте видимую область, всю прокручиваемую страницу или отдельный элемент. Чистый экспорт в PNG и PDF за пару кликов.", getExtension: "Скачать расширение", seeFeatures: "Как это работает", local: "Обработка локально", noAccount: "Без регистрации", openSource: "Открытый код", previewSubtitle: "Выберите область захвата", visibleTitle: "Видимая область", visibleText: "Всё, что сейчас на экране", fullTitle: "Вся страница", fullText: "Вся прокручиваемая страница", elementTitle: "Выбрать элемент", elementText: "Только нужная часть страницы", featuresKicker: "Три режима захвата", featuresTitle: "Правильный скриншот каждый раз.", featuresText: "От быстрого снимка до страницы длиной в несколько экранов.", featureVisible: "Сохраните текущую область браузера именно такой, какой вы её видите.", featureFull: "Расширение прокрутит и соберёт всю страницу в одно чистое изображение.", featureElement: "Наведите курсор на элемент и сохраните только нужную часть страницы.", cleanBadge: "Чистый снимок", cleanKicker: "Меньше лишнего", cleanTitle: "Страница без визуального шума.", cleanText: "При полном захвате ScreenShooter скрывает полосы прокрутки, повторяющиеся закреплённые шапки, cookie-баннеры, чаты и распространённые рекламные окна.", cleanOne: "Без повторяющейся навигации", cleanTwo: "Без полосы прокрутки на снимке", cleanThree: "Более чистые длинные скриншоты", pngTitle: "Чёткие изображения", pngText: "Для публикаций, документации и визуальных примеров.", pdfTitle: "Готовые документы", pdfText: "Сохраняйте длинный снимок в удобный PDF-файл.", installKicker: "Установка за минуту", installTitle: "Начните снимать.", stepOneTitle: "Скачайте", stepOneText: "Скачайте или клонируйте ScreenShooter с GitHub.", stepTwoTitle: "Откройте расширения", stepTwoText: "Перейдите на chrome://extensions и включите режим разработчика.", stepThreeTitle: "Подключите", stepThreeText: "Нажмите «Загрузить распакованное расширение» и выберите папку проекта.", openGithub: "Открыть GitHub", ctaTitle: "Одно расширение. Вся страница.", ctaText: "Снимайте именно то, что нужно, и двигайтесь дальше.", footerText: "Лёгкое расширение для скриншотов в Chromium-браузерах."
  }
};

const browserLanguage = navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
let language = localStorage.getItem("screenshooter-language") || browserLanguage;

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translations[language][element.dataset.i18n];
  });
  document.querySelectorAll("[data-privacy-link]").forEach((link) => {
    link.href = language === "ru" ? "privacy.ru.html" : "privacy.html";
  });
  document.querySelector(".language").textContent = language === "en" ? "RU" : "EN";
}

document.querySelector(".language").addEventListener("click", () => {
  language = language === "en" ? "ru" : "en";
  localStorage.setItem("screenshooter-language", language);
  applyLanguage();
});

applyLanguage();
