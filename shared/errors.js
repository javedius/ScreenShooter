import { translator } from "./i18n.js";

export function friendlyError(error, language) {
  const t = translator(language);
  const message = String(error?.message || error);
  if (message.includes("PAGE_NOT_SUPPORTED") || message.includes("Cannot access")) {
    return t("unsupportedPage");
  }
  if (message.includes("ACTIVE_TAB_MISSING")) return t("activeTabMissing");
  if (message.includes("ELEMENT_NOT_VISIBLE")) return t("elementNotVisible");
  return t("genericError");
}
