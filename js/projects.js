/* Projects listing page: sticky hover preview (desktop) + numbered list,
   inline image cards on mobile. Mirrors the reference split layout. */
(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const d = portfolioData;
    const list = d.projectOrder
      .map((id) => d.projects.find((p) => p.id === id))
      .filter(Boolean);
    const host = document.getElementById("projects-split");
    if (!host) return;

    const rows = list
      .map((p, i) => {
        const tags = (p.detailTags || p.tags.slice(0, 2))
          .map((t) => '<span class="pill">' + esc(t) + "</span>")
          .join("");
        return (
          '<div class="prow rv" data-id="' +
          p.id +
          '" style="transition-delay:' +
          i * 0.05 +
          's">' +
          '<a href="project.html?slug=' +
          p.id +
          '"><span style="display:flex;align-items:baseline;gap:1rem;min-width:0;flex:1">' +
          '<span class="idx">' +
          String(i + 1).padStart(2, "0") +
          '</span><span class="pt">' +
          esc(p.title) +
          "</span></span>" +
          '<span class="meta">' +
          tags +
          '<span class="arr"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></span></a>' +
          '<div class="m-preview"><a href="project.html?slug=' +
          p.id +
          '"><img src="' +
          projectImage(p) +
          '" alt="' +
          esc(p.title) +
          '" loading="lazy"></a></div>' +
          "</div>"
        );
      })
      .join("");

    host.innerHTML =
      '<aside class="rv"><p class="page-kicker">' +
      esc(d.personal.fullName) +
      "</p>" +
      '<h1 class="page-title">Projects</h1><p class="mono muted mt2">' +
      list.length +
      " total</p>" +
      '<div class="preview"><img id="preview-img" src="' +
      projectImage(list[0]) +
      '" alt="Projects">' +
      '<div class="plabel" id="preview-label" style="display:none"></div></div></aside>' +
      '<div class="list-col"><div class="m-head"><h1 class="page-title">Projects <span class="mono muted" style="font-size:1.5rem">' +
      list.length +
      "</span></h1></div>" +
      '<div style="border-top:1px solid var(--border)">' +
      rows +
      "</div></div>";

    const img = document.getElementById("preview-img");
    const label = document.getElementById("preview-label");
    host.querySelectorAll(".prow").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const p = list.find((x) => x.id === row.dataset.id);
        if (!p) return;
        img.style.opacity = "0";
        clearTimeout(img._swap);
        img._swap = setTimeout(() => {
          img.src = projectImage(p);
          img.alt = p.title;
          img.style.opacity = "1";
        }, 120);
        label.style.display = "block";
        label.textContent = p.title;
      });
      row.addEventListener("mouseleave", () => {
        label.style.display = "none";
      });
    });

    window.FX.reveal();
  });
})();
