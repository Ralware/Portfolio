/* Home page renderer: hero, about bento, experience, tech ribbons,
   featured projects (scattered desktop / stacked mobile). */
(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hero() {
    const p = portfolioData.personal;
    const tagline = p.bio || portfolioData.site.tagline || "";
    const social = portfolioData.social
      .map(
        (s) =>
          '<a href="' +
          s.href +
          '" aria-label="' +
          s.label +
          '">' +
          window.NavIcons.icon(s.icon) +
          '<span class="tip">' +
          esc(s.tooltip) +
          "</span></a>",
      )
      .join("");
    document.getElementById("hero").innerHTML =
      '<div class="hero-grid"><div class="rv rv-x-l">' +
      '<h1 class="hero-name">' +
      esc(p.firstName) +
      " " +
      esc(p.lastName) +
      "</h1>" +
      '<p class="hero-tag">' +
      esc(tagline) +
      "</p>" +
      '<div class="hero-socials">' +
      social +
      "</div></div>" +
      '<div class="rv rv-x-r rv-d1"><div class="avatar-tilt"><div class="avatar-frame" data-tilt>' +
      '<img src="' +
      p.avatar +
      '" alt="' +
      esc(p.fullName) +
      '" loading="eager" onerror="this.src=\'assets/placeholder.svg\'">' +
      "</div></div></div></div>";
  }

  /* **highlight** in text becomes a HighlightTag pill (mirrors reference). */
  function rich(s) {
    return esc(s).replace(/\*\*([^*]+)\*\*/g, '<span class="tag">$1</span>');
  }

  function about() {
    const p = portfolioData.personal;
    const act = portfolioData.githubActivity;
    const max = Math.max.apply(null, act.map((a) => a.value).concat([1]));
    const total = act.reduce((s, a) => s + a.value, 0);
    const journey = p.journey
      .map(
        (j, i) =>
          '<div class="t-item' +
          (i === 0 ? " first" : "") +
          '"><div><div class="t-dot"></div>' +
          (i < p.journey.length - 1 ? '<div class="t-line"></div>' : "") +
          '</div><div><p class="t-year">' +
          esc(j.year) +
          (j.suffix ? " " + esc(j.suffix) : "") +
          '</p><p class="t-text">' +
          esc(j.text) +
          "</p></div></div>",
      )
      .join("");
    const edu = p.education
      .map(
        (e) =>
          '<div class="edu-row"><p class="e-name">' +
          esc(e.institution) +
          '</p><div class="e-sub"><span>' +
          esc(e.detail) +
          "</span><span class='mono'>" +
          esc(e.years) +
          "</span></div></div>",
      )
      .join("");
    const bars = act
      .map(
        (a) =>
          '<div class="gh-col"><div class="gh-bar" style="height:' +
          Math.max(6, (a.value / max) * 100) +
          '%" title="' +
          a.value +
          ' commits"></div><span class="gh-lab">' +
          a.label +
          "</span></div>",
      )
      .join("");
    document.getElementById("about-body").innerHTML =
      '<div class="wrap"><div class="bento">' +
      '<div class="g-card s4 rv"><h3>About Me</h3>' +
      p.about.map((t) => '<p class="body">' + rich(t) + "</p>").join("") +
      "</div>" +
      '<div class="g-card s2 tall rv rv-d1"><p class="eyebrow">Journey</p><div class="timeline">' +
      journey +
      "</div></div>" +
      '<div class="g-card s2 rv"><p class="eyebrow">Education</p><div class="mt4">' +
      edu +
      "</div></div>" +
      '<div class="g-card s2 rv rv-d1"><p class="eyebrow">GitHub Commits</p><div class="mt4" style="display:flex;align-items:baseline;gap:.5rem"><span class="gh-total">' +
      total +
      '</span><span class="gh-sub">in the last 7 months</span></div><div class="gh-bars">' +
      bars +
      "</div></div>" +
      "</div></div>";
  }

  function experience() {
    const cards = portfolioData.experience
      .map((x) => {
        const logo = x.logo
          ? '<img src="' + x.logo + '" alt="">'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/></svg>';
        const poss = x.positions
          .map((pos, pi) => {
            const bullets = (pos.bullets || [])
              .map((b) => "<li>" + esc(b) + "</li>")
              .join("");
            const skills = (pos.skills || [])
              .map((s) => "<span>" + esc(s) + "</span>")
              .join("");
            return (
              '<div class="x-pos' +
              (pos.open ? " open" : "") +
              '">' +
              '<button class="x-pos-head" data-xpos><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;color:var(--muted-foreground)"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg><span><strong>' +
              esc(pos.title) +
              '</strong><br><span class="muted" style="font-size:.85rem">' +
              esc(pos.period) +
              (pos.type ? " · " + esc(pos.type) : "") +
              "</span></span>" +
              '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>' +
              '<div class="x-pos-body"><div><div class="x-pos-text"><ul>' +
              bullets +
              "</ul>" +
              (skills ? '<div class="x-skills">' + skills + "</div>" : "") +
              "</div></div></div></div>"
            );
          })
          .join("");
        return (
          '<div class="x-item"><div class="x-comp"><div class="x-logo">' +
          logo +
          "</div>" +
          "<h3>" +
          (x.website
            ? '<a href="' +
              x.website +
              '" style="text-decoration:none">' +
              esc(x.company) +
              "</a>"
            : esc(x.company)) +
          "</h3>" +
          (x.current ? '<span class="x-live" title="Current"></span>' : "") +
          "</div>" +
          poss +
          "</div>"
        );
      })
      .join("");
    document.getElementById("experience-body").innerHTML =
      '<div class="wrap"><div class="exp-head rv"><p>What I\'m up to</p><h2>Experience</h2></div><div class="rv">' +
      cards +
      "</div></div>";
    document
      .querySelectorAll("[data-xpos]")
      .forEach((b) =>
        b.addEventListener("click", () =>
          b.closest(".x-pos").classList.toggle("open"),
        ),
      );
  }

  function tech() {
    const row = (items) =>
      items
        .map(
          (t) =>
            '<span class="skill-badge" title="' +
            esc(t.name) +
            '"><span class="glyph">' +
            esc(t.glyph) +
            "</span></span>",
        )
        .join("");
    const fwd = portfolioData.skills,
      rev = portfolioData.skills.slice().reverse();
    document.getElementById("tech-body").innerHTML =
      '<div class="wrap"><h3 class="rv">Tech Stack</h3>' +
      '<div class="ribbon rv"><div class="ribbon-track">' +
      row(fwd) +
      row(fwd) +
      row(fwd) +
      "</div></div>" +
      '<div class="ribbon rev rv"><div class="ribbon-track">' +
      row(rev) +
      row(rev) +
      row(rev) +
      "</div></div></div>";
  }

  function featured() {
    const all = portfolioData.projects;
    const list = portfolioData.homeProjectIds
      .map((id) => all.find((p) => p.id === id))
      .filter(Boolean);
    const card = (p, i, cls) =>
      '<a class="' +
      cls +
      ' rv-o" style="transition-delay:' +
      i * 0.08 +
      's" href="project.html?slug=' +
      p.id +
      '" aria-label="View ' +
      esc(p.title) +
      ' project">' +
      '<div class="ph"><img src="' +
      projectImage(p) +
      '" alt="' +
      esc(p.title) +
      '" loading="lazy" draggable="false"></div>' +
      '<div class="pcap">' +
      esc(p.title) +
      "</div></a>";
    const cards = list.map((p, i) => card(p, i, "p-card")).join("");
    const stacked = list.map((p, i) => card(p, i, "p-card")).join("");
    document.getElementById("featured").innerHTML =
      '<div class="wrap"><div class="proj-head rv"><h2><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"/></svg>Projects</h2>' +
      '<a href="projects.html">View all <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></a></div></div>' +
      '<div class="wrap"><div class="rv"><div class="m-cards">' +
      stacked +
      "</div>" +
      '<div class="scatter">' +
      cards +
      "</div></div></div>";
  }

  document.addEventListener("DOMContentLoaded", () => {
    hero();
    about();
    experience();
    tech();
    featured();
    window.FX.reveal();
    window.FX.tilt();
  });
})();
