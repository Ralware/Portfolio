/* Navbar: fixed top bar, shrinks into a blurred pill on scroll (>8px),
   mobile fullscreen menu with staggered links, palette button.
   Pure dark mode — no theme toggle.
   Include on every page: <header id="site-nav"></header><div class="nav-spacer"></div> */
(function () {
  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><circle cx="4.983" cy="5.009" r="2.188"/><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"/></svg>',
    discord:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/></svg>',
    medium:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M13.34 12.11c0-1.15-.13-2.4-.38-3.72-.25-1.32-.61-2.66-1.08-4.01-.47-1.36-1.03-2.62-1.68-3.79-.65-1.16-1.37-2.12-2.15-2.87-.78-.75-1.63-1.13-2.55-1.13-.92 0-1.77.38-2.55 1.13-.78.75-1.5 1.71-2.15 2.87-.65 1.17-1.21 2.43-1.68 3.79-.47 1.35-.83 2.69-1.08 4.01-.25 1.32-.38 2.57-.38 3.72 0 1.15.13 2.4.38 3.72.25 1.32.61 2.66 1.08 4.01.47 1.36 1.03 2.62 1.68 3.79.65 1.16 1.37 2.12 2.15 2.87.78.75 1.63 1.13 2.55 1.13.92 0 1.77-.38 2.55-1.13.78-.75 1.5-1.71 2.15-2.87.65-1.17 1.21-2.43 1.68-3.79.47-1.35.83-2.69 1.08-4.01.25-1.32.38-2.57.38-3.72zM21.43 12c0 .51-.04 1.09-.13 1.74-.09.65-.22 1.3-.39 1.95-.17.65-.38 1.27-.63 1.86-.25.59-.54 1.08-.87 1.47-.33.39-.7.59-1.11.59-.41 0-.78-.2-1.11-.59-.33-.39-.62-.88-.87-1.47-.25-.59-.46-1.21-.63-1.86-.17-.65-.3-1.3-.39-1.95-.09-.65-.13-1.23-.13-1.74 0-.51.04-1.09.13-1.74.09-.65.22-1.3.39-1.95.17-.65.38-1.27.63-1.86.25-.59.54-1.08.87-1.47.33-.39.7-.59 1.11-.59.41 0 .78.2 1.11.59.33.39.62.88.87 1.47.25.59.46 1.21.63 1.86.17.65.3 1.3.39 1.95.09.65.13 1.23.13 1.74zM23.2 12c0 .44-.02.94-.06 1.5-.04.56-.1 1.11-.18 1.65-.08.54-.19 1.04-.32 1.5-.13.46-.28.84-.45 1.14-.17.3-.37.45-.59.45-.22 0-.42-.15-.59-.45-.17-.3-.32-.68-.45-1.14-.13-.46-.24-.96-.32-1.5-.08-.54-.14-1.09-.18-1.65-.04-.56-.06-1.06-.06-1.5 0-.44.02-.94.06-1.5.04-.56.1-1.11.18-1.65.08-.54.19-1.04.32-1.5.13-.46.28-.84.45-1.14.17-.3.37-.45.59-.45.22 0 .42.15.59.45.17.3.32.68.45 1.14.13.46.24.96.32 1.5.08.54.14 1.09.18 1.65.04.56.06 1.06.06 1.5z"/></svg>',
    spotify:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85zm1.2-2.75c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.94-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.14-.55 11.24 1.35.3.15.45.65.2 1zm.1-2.8C14.7 8.95 9.35 8.75 6.31 9.7a.94.94 0 0 1-1.15-.6.94.94 0 0 1 .6-1.15c3.55-1.05 9.39-.85 13.09 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25z"/></svg>',
    twitter:
      '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18h1.7L7 3.9H5.2L17.8 20z"/></svg>',
    website:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>',
  };

  function icon(name) {
    return ICONS[name] || ICONS.website;
  }

  function rollHtml(text) {
    // TextRoll: per-letter roll with 0.035s stagger, ease-in-out (pure CSS).
    // Duplicate absolute layer rolls up on hover, mirroring the reference.
    const letters = function (cls, base) {
      return text
        .split("")
        .map(function (ch, i) {
          const c = ch === " " ? "&nbsp;" : ch;
          return '<span class="' + cls + '" style="transition-delay:' + (i * 0.035).toFixed(3) + 's">' + c + "</span>";
        })
        .join("");
    };
    return '<span class="roll"><span class="roll-row">' + letters("rl", 0) + "</span>" + '<span class="roll-row roll-top">' + letters("rl", 0) + "</span></span>";
  }

  function render() {
    const host = document.getElementById("site-nav");
    if (!host || typeof portfolioData === "undefined") return;
    const d = portfolioData;
    const links = d.nav
      .map((n) => '<a href="' + n.href + '">' + rollHtml(n.label) + "</a>")
      .join("");
    const social = d.social
      .map(
        (s) =>
          '<a href="' +
          s.href +
          '" aria-label="' +
          s.label +
          '" title="' +
          s.label +
          '">' +
          icon(s.icon) +
          "</a>",
      )
      .join("");

    host.innerHTML =
      '<div class="nav-shell">' +
      '<nav class="nav-desktop" aria-label="Primary">' +
      '<a class="nav-logo" href="index.html">' +
      d.site.logoText +
      "</a>" +
      '<div class="nav-links">' +
      '<button class="nav-icon-btn" data-open-palette aria-label="Search (Ctrl+K)">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>' +
      links +
      "</div>" +
      "</nav>" +
      '<div class="nav-mobile" id="nav-mobile">' +
      '<div class="nav-m-head">' +
      '<a class="nav-logo" style="font-size:1.2rem" href="index.html">' +
      d.site.logoText +
      "</a>" +
      '<button class="menu-btn" id="menu-btn" aria-label="Toggle menu" aria-expanded="false">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path class="mb-l1" d="M4 7h16"/><path class="mb-l2" d="M4 12h16"/><path class="mb-l3" d="M4 17h16"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="nav-m-body">' +
      d.nav
        .map(
          (n, i) =>
            '<a class="m-link" style="transition-delay:' +
            (i * 0.05 + 0.15) +
            's" href="' +
            n.href +
            '">' +
            n.label +
            "</a>",
        )
        .join("") +
      '<button class="m-link m-act" data-open-palette><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Search...</span></button>' +
      '<div class="nav-m-foot">' +
      social +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    // scroll state (hysteresis: engage past 12px, release at 4px —
    // a single threshold flickers when scrolling settles near it)
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 12) host.classList.add("scrolled");
      else if (y <= 4) host.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // mobile menu
    const mobile = host.querySelector("#nav-mobile");
    const btn = host.querySelector("#menu-btn");
    const setOpen = (open) => {
      mobile.classList.toggle("open", open);
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    btn.addEventListener("click", () =>
      setOpen(!mobile.classList.contains("open")),
    );
    mobile
      .querySelectorAll("a.m-link")
      .forEach((a) => a.addEventListener("click", () => setOpen(false)));

    // palette buttons (mobile one closes the menu first, like reference)
    host.querySelectorAll("[data-open-palette]").forEach((b) =>
      b.addEventListener("click", () => {
        const inMenu = b.classList.contains("m-link");
        if (inMenu) setOpen(false);
        setTimeout(
          () => document.dispatchEvent(new Event("open-palette")),
          inMenu ? 100 : 0
        );
      })
    );
  }

  window.NavIcons = { icon };
  document.addEventListener("DOMContentLoaded", render);
})();
