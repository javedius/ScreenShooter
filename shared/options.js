export function normalizeOptions({ format = "png", language = "en" } = {}) {
  return {
    format: format === "pdf" ? "pdf" : "png",
    language: language === "ru" ? "ru" : "en"
  };
}

export function makeFilename(mode, format) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `ScreenShooter/${mode}-${stamp}.${format}`;
}
