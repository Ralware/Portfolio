/* Theme: pure dark mode. This file only enforces `data-theme="dark"`
   (and repairs stale `light` values from older visits). There is no
   toggle UI anywhere; `toggle` is a no-op kept for API compatibility. */
(function () {
  const KEY = "portfolio-theme";

  function current() {
    return "dark";
  }
  function apply() {
    document.documentElement.dataset.theme = "dark";
    try {
      localStorage.setItem(KEY, "dark");
    } catch (e) {
      /* private mode */
    }
    document.dispatchEvent(new CustomEvent("themechange", { detail: "dark" }));
  }
  function init() {
    apply();
  }
  function toggle() {
    apply();
  }

  window.PortfolioTheme = { init, toggle, current, apply };
  document.addEventListener("DOMContentLoaded", init);
})();
