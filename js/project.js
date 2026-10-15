/* Project detail page (?slug=): themed hero variants, tags, about,
   features, tech stack, TOC minimap, prev/next + arrow-key navigation. */
(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function slug() {
    return new URLSearchParams(window.location.search).get("slug");
  }

  function heroBlock(p) {
    const img = projectImage(p);
    const links =
      '<div class="detail-links">' +
      (p.live && p.live !== "#"
        ? '<a class="btn accent" style="background:' +
          p.accent +
          '" href="' +
          p.live +
          '"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg> Live Demo</a>'
        : "") +
      (p.github && p.github !== "#"
        ? '<a class="btn" href="' + p.github + '">GitHub</a>'
        : "") +
      "</div>";
    const tags = p.tags
      .map((t) => '<span class="pill">' + esc(t) + "</span>")
      .join("");
    const imgHtml =
      '<div class="detail-hero"><img src="' +
      img +
      '" alt="' +
      esc(p.title) +
      ' preview" loading="eager"></div>';

    if (p.template === "tv") {
      const words = p.title.split(" ");
      return (
        '<div class="tv"><h1><span style="color:#999">' +
        esc(words[0]) +
        '</span> <span style="color:' +
        p.accent +
        '">' +
        esc(words.slice(1).join(" ") || "") +
        "</span></h1>" +
        '<p class="muted mono mt4" style="letter-spacing:.35em;font-size:.75rem">FEATURED PROJECT</p></div>' +
        '<div class="mt8"><p style="font-size:1.1rem;line-height:1.7" class="muted">' +
        esc(p.description) +
        "</p>" +
        links +
        '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
        tags +
        "</div>" +
        imgHtml +
        "</div>"
      );
    }
    if (p.template === "newspaper") {
      return (
        '<div class="paper"><p class="mono" style="font-size:.65rem;letter-spacing:.4em">VOL. 01 — PROJECT REPORT</p>' +
        "<h1>" +
        esc(p.title) +
        "</h1>" +
        '<p class="mt4" style="font-family:\'Droid Serif\',serif;font-style:italic">' +
        esc(p.description) +
        "</p>" +
        links +
        "</div>" +
        imgHtml +
        '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
        tags +
        "</div>"
      );
    }
    if (p.template === "spotlight") {
      return (
        '<div class="spot"><p class="mono" style="font-size:.7rem;letter-spacing:.2em;color:' +
        p.accent +
        '"><span class="feat-dot"></span> FEATURED</p>' +
        '<h1 style="font-size:clamp(2.5rem,7vw,4.5rem);font-weight:700">' +
        esc(p.title) +
        "</h1>" +
        '<p class="mt4 muted" style="font-size:1.1rem">' +
        esc(p.description) +
        "</p>" +
        links +
        "</div>" +
        imgHtml +
        '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
        tags +
        "</div>"
      );
    }
    if (p.template === "contour") {
      // Live procedural-topography canvas behind a clean layout,
      // mirroring the reference contour detail page.
      return (
        '<div class="contour-stage"><canvas data-contour></canvas>' +
        '<div class="contour-inner"><h1 class="detail-title">' +
        esc(p.title) +
        "</h1>" +
        '<p class="mt4 muted" style="font-size:1.125rem;max-width:36rem;line-height:1.7">' +
        esc(p.description) +
        "</p>" +
        links +
        "</div></div>" +
        imgHtml +
        '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
        tags +
        "</div>"
      );
    }
    return (
      '<h1 class="detail-title">' +
      esc(p.title) +
      "</h1>" +
      '<p class="mt4 muted" style="font-size:1rem;max-width:42rem;line-height:1.7">' +
      esc(p.description) +
      "</p>" +
      links +
      imgHtml +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
      tags +
      "</div>"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const d = portfolioData;
    const order = d.projectOrder;
    const current = d.projects.find((p) => p.id === slug()) || d.projects[0];
    if (!current) {
      window.location.href = "projects.html";
      return;
    }
    document.title = current.title + " | " + d.personal.fullName;

    const idx = order.indexOf(current.id);
    const prev =
      idx > 0 ? d.projects.find((p) => p.id === order[idx - 1]) : null;
    const next =
      idx >= 0 && idx < order.length - 1
        ? d.projects.find((p) => p.id === order[idx + 1])
        : null;

    const feats = (current.features || [])
      .map(
        (f, i) =>
          '<div class="d-card rv" id="sec-feat-' +
          i +
          '"><h3>' +
          esc(f.title) +
          "</h3><p>" +
          esc(f.desc) +
          "</p></div>",
      )
      .join("");
    const tech = (current.tech || [])
      .map(
        (t) =>
          '<div class="d-card"><p class="mono" style="font-size:.68rem;text-transform:uppercase;letter-spacing:.1em">' +
          esc(t.l) +
          '</p><p style="color:var(--foreground);font-weight:500">' +
          esc(t.v) +
          "</p></div>",
      )
      .join("");

    document.getElementById("detail").innerHTML =
      '<a class="back-link rv" href="projects.html"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> All Projects</a>' +
      '<div class="rv">' +
      heroBlock(current) +
      "</div>" +
      '<h2 class="sec-label rv" id="sec-about">About</h2><div class="d-card rv"><p style="line-height:1.75">' +
      esc(current.longDescription || current.description) +
      "</p></div>" +
      (feats
        ? '<h2 class="sec-label rv" id="sec-features">Key Features</h2><div class="detail-grid c2">' +
          feats +
          "</div>"
        : "") +
      (tech
        ? '<h2 class="sec-label rv" id="sec-tech">Tech Stack</h2><div class="detail-grid c3">' +
          tech +
          "</div>"
        : "") +
      '<div class="prevnext">' +
      (prev
        ? '<a href="project.html?slug=' +
          prev.id +
          '"><span class="k"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg> Previous</span><span class="t">' +
          esc(prev.title) +
          "</span></a>"
        : "<span></span>") +
      (next
        ? '<a class="next" href="project.html?slug=' +
          next.id +
          '"><span class="k">Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span><span class="t">' +
          esc(next.title) +
          "</span></a>"
        : "<span></span>") +
      "</div>";

    // side chevrons
    const nav = document.getElementById("sidenav");
    if (nav) {
      nav.innerHTML =
        (prev
          ? '<a class="sidenav prev" href="project.html?slug=' +
            prev.id +
            '" aria-label="Previous project"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></a>'
          : "") +
        (next
          ? '<a class="sidenav next" href="project.html?slug=' +
            next.id +
            '" aria-label="Next project"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a>'
          : "");
    }

    // arrow-key navigation (mirrors reference)
    document.addEventListener("keydown", (e) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowLeft" && prev)
        window.location.href = "project.html?slug=" + prev.id;
      if (e.key === "ArrowRight" && next)
        window.location.href = "project.html?slug=" + next.id;
    });

    // TOC minimap (depth-scaled dashes like the reference)
    const toc = document.getElementById("toc");
    if (toc) {
      const secs = [
        { id: "sec-about", title: "About", depth: 2 },
        { id: "sec-features", title: "Features", depth: 2 },
        { id: "sec-tech", title: "Tech", depth: 3 },
      ].filter((s) => document.getElementById(s.id));
      toc.innerHTML = secs
        .map(
          (s) =>
            '<a href="#' +
            s.id +
            '" data-sec="' +
            s.id +
            '" aria-label="' +
            s.title +
            '"><span class="tt">' +
            s.title +
            '</span><span class="dash" style="width:' +
            (s.depth === 2 ? 22 : 14) +
            'px"></span></a>',
        )
        .join("");
      const links = toc.querySelectorAll("a");
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              links.forEach((l) =>
                l.classList.toggle("active", l.dataset.sec === en.target.id),
              );
            }
          }),
        { rootMargin: "-30% 0px -55% 0px" },
      );
      secs.forEach((s) => io.observe(document.getElementById(s.id)));
    }

    window.FX.reveal();
    document
      .querySelectorAll("#detail canvas[data-contour]")
      .forEach(window.FX.contour);
  });
})();
