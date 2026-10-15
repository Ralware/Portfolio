/* Shared effects: page loader, scroll reveal, glow-card pointer tracking,
   avatar tilt, contour-flow canvas, toast, footer. */
(function () {
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- page loader (logo + 80px progress bar, max ~1.5s) ---- */
  function loader() {
    if (
      !document.getElementById("loader") ||
      typeof portfolioData === "undefined"
    )
      return;
    document.querySelector("#loader .l-logo").textContent =
      portfolioData.site.logoText;
    const bar = document.querySelector("#loader .l-fill");
    const host = document.getElementById("loader");
    const t0 = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - t0;
      bar.style.width = Math.min(95, (elapsed / 300) * 80) + "%";
    }, 30);
    const finish = () => {
      clearInterval(tick);
      bar.style.width = "100%";
      setTimeout(() => host.classList.add("done"), 150);
    };
    if (document.readyState === "complete") setTimeout(finish, 250);
    else window.addEventListener("load", () => setTimeout(finish, 250));
    setTimeout(finish, 1500);
  }

  /* ---- scroll reveal ---- */
  function reveal() {
    const els = document.querySelectorAll(".rv, .rv-x-l, .rv-x-r, .rv-o");
    if (!els.length) return;
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((e) => {
      if (e._rvObserved) return;
      e._rvObserved = true;
      io.observe(e);
    });
  }

  /* ---- glow-card pointer tracking (sets --glow-x/--glow-y) ---- */
  function glow() {
    document.addEventListener("pointermove", (e) => {
      const t =
        e.target instanceof Element ? e.target.closest(".g-card") : null;
      if (!t) return;
      const b = t.getBoundingClientRect();
      t.style.setProperty("--glow-x", e.clientX - b.left + "px");
      t.style.setProperty("--glow-y", e.clientY - b.top + "px");
    });
  }

  /* ---- avatar 3D tilt ---- */
  function tilt() {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      if (el._tiltBound) return;
      el._tiltBound = true;
      let rect = null;
      el.addEventListener(
        "mouseenter",
        (e) => (rect = e.currentTarget.getBoundingClientRect()),
      );
      el.addEventListener("mouseleave", () => {
        rect = null;
        el.style.transform = "";
      });
      el.addEventListener("mousemove", (e) => {
        if (!rect || reduced()) return;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.transform =
          "rotateX(" +
          (0.5 - y) * 20 +
          "deg) rotateY(" +
          (x - 0.5) * 20 +
          "deg) scale(1.05)";
      });
    });
  }

  /* dot-grid removed — the space starfield (js/space.js) is the backdrop. */

  /* ---- contour-flow canvas: animated topographic rings ----
     Lightweight take on the reference (simplex + marching squares):
     concentric rings whose radii wobble with layered sine noise and drift
     over time. Theme-aware stroke colors. */
  function contour(canvas) {
    if (!canvas || canvas._fxBound || reduced()) return;
    canvas._fxBound = true;
    const ctx = canvas.getContext("2d");
    let w = 0,
      h = 0,
      t = Math.random() * 100;
    // Pure dark mode: always render light-on-dark rings.
    const dark = () => document.documentElement.dataset.theme === "dark";

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function noise(a, ring, k) {
      return (
        Math.sin(a * 3 + t * 0.4 + ring * 1.7 + k) * 0.5 +
        Math.sin(a * 5 - t * 0.25 + ring * 0.9 + k * 2.0) * 0.3 +
        Math.sin(a * 8 + t * 0.15 + ring * 2.3) * 0.2
      );
    }
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.72,
        cy = h * 0.32;
      const maxR = Math.hypot(w, h) * 0.75;
      const rings = 26;
      for (let i = 1; i <= rings; i++) {
        const base = (i / rings) * maxR;
        ctx.beginPath();
        for (let s = 0; s <= 120; s++) {
          const a = (s / 120) * Math.PI * 2;
          const r = base + noise(a, i, 1.3) * (14 + i * 1.6);
          const x = cx + Math.cos(a) * r,
            y = cy + Math.sin(a) * r * 0.72;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const alpha = dark()
          ? 0.1 + (i / rings) * 0.1
          : 0.08 + (i / rings) * 0.08;
        ctx.strokeStyle = dark()
          ? "rgba(255,255,255," + alpha + ")"
          : "rgba(0,0,0," + alpha + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (!document.hidden) requestAnimationFrame(frame);
      else setTimeout(() => requestAnimationFrame(frame), 500);
    }
    window.addEventListener("resize", resize);
    resize();
    frame();
  }

  /* ---- toast ---- */
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---- footer ---- */
  function footer() {
    const host = document.getElementById("site-footer");
    if (!host || typeof portfolioData === "undefined") return;
    host.innerHTML =
      '<div class="wrap"><span>© ' +
      new Date().getFullYear() +
      " " +
      portfolioData.personal.fullName +
      "</span>" +
      '<span><a href="projects.html">Projects</a> · <a href="resume.html">Resume</a></span></div>';
  }

  /* ---- smooth hash scroll (for same-page anchor links) ---- */
  function hashScroll() {
    if (!window.location.hash) return;
    setTimeout(() => {
      let el = null;
      try {
        el = document.querySelector(window.location.hash);
      } catch (e) {
        el = null;
      }
      if (el) el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
    }, 400);
  }

  window.FX = {
    reveal,
    glow,
    tilt,
    contour,
    toast,
    loader,
    footer,
    hashScroll,
  };

  document.addEventListener("DOMContentLoaded", () => {
    loader();
    document.body.classList.add("route-enter");
    glow();
    tilt();
    footer();
    hashScroll();
    // canvases present on specific pages opt in via data attributes
    document.querySelectorAll("canvas[data-contour]").forEach(contour);
    reveal();
  });
})();
