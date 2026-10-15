/* Command palette: Ctrl/⌘+K toggle, search, ↑↓/Enter/Esc keyboard nav,
   sections Navigate / Projects. Pure dark mode (no theme action). */
(function () {
  let open = false;
  let activeIndex = 0;

  function items() {
    const d = portfolioData;
    const list = [
      {
        id: "home",
        label: "Home",
        section: "Navigate",
        key: "H",
        run: () => go("index.html"),
      },
      {
        id: "projects",
        label: "Projects",
        section: "Navigate",
        key: "P",
        run: () => go("projects.html"),
      },
      {
        id: "resume",
        label: "Resume",
        section: "Navigate",
        key: "R",
        run: () => go("resume.html"),
      },
    ];
    d.projects.forEach((p) =>
      list.push({
        id: "p-" + p.id,
        label: p.title,
        section: "Projects",
        run: () => go("project.html?slug=" + p.id),
      }),
    );
    return list;
  }

  function go(path) {
    close();
    window.location.href = path;
  }

  function ensure() {
    if (document.getElementById("pal")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML =
      '<div id="pal-back"></div>' +
      '<div id="pal" class="hidden" role="dialog" aria-modal="true" aria-label="Command palette">' +
      '<div class="pal-card">' +
      '<div class="pal-search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;color:var(--muted-foreground)"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<input id="pal-input" type="text" placeholder="Search projects, pages, actions…" autocomplete="off">' +
      "<kbd>ESC</kbd></div>" +
      '<div class="pal-list" id="pal-list"></div>' +
      '<div class="pal-foot"><span><kbd>↑↓</kbd> Navigate &nbsp; <kbd>↵</kbd> Open</span><span><kbd>⌘</kbd><kbd>K</kbd></span></div>' +
      "</div></div>" +
      '<button id="pal-fab" aria-label="Open command palette"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>';
    document.body.appendChild(wrap);
    document.getElementById("pal-back").addEventListener("click", close);
    document
      .getElementById("pal-input")
      .addEventListener("input", (e) => render(e.target.value));
    document
      .getElementById("pal-fab")
      .addEventListener("click", () => toggle(true));
  }

  function filtered(q) {
    const all = items();
    q = (q || "").trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.section.toLowerCase().includes(q),
    );
  }

  function render(q) {
    const list = filtered(q);
    activeIndex = Math.min(activeIndex, Math.max(0, list.length - 1));
    const box = document.getElementById("pal-list");
    if (!list.length) {
      box.innerHTML =
        '<p class="muted center" style="padding:2rem">No results found.</p>';
      return;
    }
    let html = "";
    let flat = -1;
    let lastSec = "";
    list.forEach((item) => {
      flat++;
      if (item.section !== lastSec) {
        html += '<p class="pal-sec">' + item.section + "</p>";
        lastSec = item.section;
      }
      html +=
        '<button class="pal-item' +
        (flat === activeIndex ? " active" : "") +
        '" data-flat="' +
        flat +
        '">' +
        "<span>" +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;color:var(--muted-foreground)"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
        "</span><span style='flex:1'>" +
        item.label +
        "</span>" +
        (item.key ? "<kbd>" + item.key + "</kbd>" : "") +
        "</button>";
    });
    box.innerHTML = html;
    box.querySelectorAll(".pal-item").forEach((b) => {
      const i = Number(b.dataset.flat);
      b.addEventListener("click", () => list[i].run());
      b.addEventListener("mouseenter", () => {
        activeIndex = i;
        box
          .querySelectorAll(".pal-item")
          .forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      });
    });
    const act = box.querySelector(".pal-item.active");
    if (act) act.scrollIntoView({ block: "nearest" });
    document.getElementById("pal").dataset.count = String(list.length);
  }

  function currentList() {
    return filtered(document.getElementById("pal-input").value);
  }

  function toggle(force) {
    ensure();
    open = typeof force === "boolean" ? force : !open;
    const pal = document.getElementById("pal");
    pal.classList.toggle("hidden", !open);
    requestAnimationFrame(() => pal.classList.toggle("open", open));
    document.getElementById("pal-back").classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      activeIndex = 0;
      document.getElementById("pal-input").value = "";
      render("");
      setTimeout(() => document.getElementById("pal-input").focus(), 50);
    }
  }

  function close() {
    if (open) toggle(false);
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggle();
      return;
    }
    if (!open) return;
    const list = currentList();
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, list.length - 1);
      render(document.getElementById("pal-input").value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      render(document.getElementById("pal-input").value);
    } else if (e.key === "Enter" && list[activeIndex]) {
      e.preventDefault();
      list[activeIndex].run();
    }
  });
  document.addEventListener("open-palette", () => toggle(true));
  document.addEventListener("DOMContentLoaded", ensure);
})();
