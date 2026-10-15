/* ==========================================================================
   SPACE — cosmos background.
   Inspired by the attached Lively Wallpaper (particle-field starfield,
   grain). The background is static: no mouse tracking, no animation
   loop — pure CSS keyframes, generated once here.
   ========================================================================== */
(function () {
  "use strict";

  var STAR_COUNT = 170;
  var PATHS = ["particleDriftA", "particleDriftB", "particleDriftC", "particleDriftD"];
  var SIZES = ["1.5px", "1.5px", "2px", "2px", "2.5px"];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function reducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* Pure dark mode: always enforce the cosmos theme, repairing any
     stale `light` value saved by older visits. */
  function forceDarkMode() {
    document.documentElement.dataset.theme = "dark";
    try {
      localStorage.setItem("portfolio-theme", "dark");
    } catch (e) {
      /* private mode */
    }
  }

  function buildCosmos() {
    if (document.querySelector(".space-bg")) return;

    var bg = document.createElement("div");
    bg.className = "space-bg";
    bg.setAttribute("aria-hidden", "true");

    var field = document.createElement("div");
    field.className = "particle-field";

    var reduced = reducedMotion();
    for (var i = 0; i < STAR_COUNT; i++) {
      var s = document.createElement("span");
      s.style.setProperty("--top", rand(0, 100).toFixed(2) + "%");
      s.style.setProperty("--left", rand(0, 100).toFixed(2) + "%");
      s.style.setProperty("--size", pick(SIZES));
      if (!reduced) {
        s.style.setProperty("--duration", rand(18, 33).toFixed(1) + "s");
        s.style.setProperty("--delay", rand(-29, 0).toFixed(1) + "s");
        s.style.setProperty("--path", pick(PATHS));
        s.style.setProperty("--twinkle-duration", rand(4.5, 10.4).toFixed(1) + "s");
        s.style.setProperty("--twinkle-delay", rand(-8.8, 0).toFixed(1) + "s");
      }
      // ~1 in 12 stars burns brighter with a halo (see .bright).
      if (Math.random() < 0.08) s.classList.add("bright");
      field.appendChild(s);
    }
    bg.appendChild(field);

    document.body.insertBefore(bg, document.body.firstChild);
  }

  forceDarkMode();
  document.addEventListener("DOMContentLoaded", function () {
    forceDarkMode(); // re-assert after theme.js init (listener order)
    buildCosmos();
  });
})();
