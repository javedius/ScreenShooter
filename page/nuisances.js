export function hidePageNuisances() {
  const selectors = [
    '[id*="onetrust" i]', '[class*="onetrust" i]', '[id*="cookiebot" i]', '[class*="cookiebot" i]',
    '[id*="cookie-banner" i]', '[class*="cookie-banner" i]', '[id*="cookie-consent" i]', '[class*="cookie-consent" i]',
    '[id*="consent-banner" i]', '[class*="consent-banner" i]', '[id*="gdpr" i]', '[class*="gdpr" i]',
    '[id*="didomi" i]', '[class*="didomi" i]', '[id*="intercom" i]', '[class*="intercom" i]',
    '[id*="zendesk" i]', '[class*="zendesk" i]', '[id*="crisp-chat" i]', '[class*="crisp-client" i]',
    '[id*="chat-widget" i]', '[class*="chat-widget" i]', '[id*="chatbot" i]', '[class*="chatbot" i]',
    '[id*="hubspot-messages" i]', '[class*="hubspot-messages" i]'
  ];
  const mark = (element) => {
    if (element && element !== document.body && element !== document.documentElement) {
      element.setAttribute("data-screenshooter-nuisance", "");
    }
  };
  document.querySelectorAll(selectors.join(",")).forEach(mark);

  const nuisanceWords = /cookie|cookies|куки|файл(?:ы|ов)? cookie|consent|соглас(?:ие|иться)|gdpr|accept all|allow all|принять все|реклам|advertisement|subscribe|подписаться|newsletter/i;
  const chatWords = /chat with|live chat|support chat|open chat|написать нам|онлайн.?чат|чат с поддержкой/i;
  for (const element of document.querySelectorAll("body *")) {
    if (element.hasAttribute("data-screenshooter-nuisance")) continue;
    const computed = getComputedStyle(element);
    if (computed.position !== "fixed") continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 30) continue;
    const text = `${element.getAttribute("aria-label") || ""} ${element.textContent || ""}`.slice(0, 2500);
    const coversPage = rect.width * rect.height > innerWidth * innerHeight * 0.35;
    const looksLikeBanner = nuisanceWords.test(text);
    const looksLikeChat = chatWords.test(text) || (rect.width < 500 && rect.height < 700 && rect.right > innerWidth - 180 && rect.bottom > innerHeight - 180);
    const highLayer = Number.parseInt(computed.zIndex, 10) >= 100;
    if ((looksLikeBanner && (highLayer || coversPage)) || (looksLikeChat && highLayer)) mark(element);
  }

  if (!document.querySelector("[data-screenshooter-nuisance]")) return;
  for (const root of [document.documentElement, document.body]) {
    root.dataset.screenshooterOverflow = root.style.getPropertyValue("overflow");
    root.dataset.screenshooterOverflowPriority = root.style.getPropertyPriority("overflow");
    root.style.setProperty("overflow", "auto", "important");
  }
}
