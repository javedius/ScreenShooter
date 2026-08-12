export function installCaptureStyles() {
  document.querySelector("style[data-screenshooter-style]")?.remove();
  const style = document.createElement("style");
  style.setAttribute("data-screenshooter-style", "");
  style.textContent = `
    html { scrollbar-width: none !important; }
    html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
    [data-screenshooter-pinned] { visibility: hidden !important; }
    [data-screenshooter-nuisance] { display: none !important; }
    [data-screenshooter-scroll-root] { scrollbar-width: none !important; }
    [data-screenshooter-scroll-root]::-webkit-scrollbar { display: none !important; }
  `;
  document.documentElement.appendChild(style);
}
