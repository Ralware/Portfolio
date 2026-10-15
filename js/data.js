/* ==========================================================================
   portfolioData - CENTRAL CONTENT CONFIGURATION
   --------------------------------------------------------------------------
   Edit THIS file to personalize the template. You should not need to hunt
   through HTML/CSS/JS files: every page renders from the data below.

   Replace every "Your ..." placeholder with your own information.
   ========================================================================== */

const portfolioData = {
  site: {
    logoText: "yourname.", // navbar logo + loader text
    name: "Your Name",
    tagline:
      "Developer & creative problem-solver. Building thoughtful digital experiences with code.",
    url: "https://your-domain.com",
    description:
      "Portfolio of Your Name - developer & creative problem-solver.",
  },

  personal: {
    firstName: "Your",
    lastName: "Name",
    fullName: "Your Name",
    role: "Your Role",
    bio: "Your short bio goes here. One or two sentences shown under your name in the hero section.",
    location: "Your Location",
    locationShort: "LOC",
    email: "your@email.com",
    avatar: "assets/avatar.jpg", // replace with your photo
    resumeFile: "assets/resume.pdf",
    githubUsername: "your-username", // used for profile links; chart below uses static demo data
    about: [
      "Your first about paragraph. Who you are and what you care about - for example **coding and problem-solving**.",
      "Your second about paragraph. How you work and what you value - for example **honest**, **supportive**, and **reliable** teamwork.",
      "Your third about paragraph. Anything else you'd like visitors to know."
    ],
    journey: [
      { year: "2026", suffix: "- Present", text: "What you are doing now." },
      { year: "2024", text: "An earlier milestone." },
      { year: "2022", text: "Where you started." },
    ],
    education: [
      {
        institution: "Your University",
        detail: "Your Degree",
        years: "2022 - 2026",
      },
      {
        institution: "Your School",
        detail: "High School",
        years: "2020 - 2022",
      },
    ],
  },

  /* Social / contact links. Remove entries you don't use.
     `icon` must match one of the built-in icons: github, linkedin, email,
     discord, medium, spotify, twitter, website. */
  social: [
    {
      label: "GitHub",
      value: "your-username",
      href: "https://github.com/your-username",
      tooltip: "your-username",
      icon: "github",
    },
    {
      label: "LinkedIn",
      value: "your-name",
      href: "https://linkedin.com/in/your-name",
      tooltip: "Your Name",
      icon: "linkedin",
    },
    {
      label: "Email",
      value: "your@email.com",
      href: "mailto:your@email.com",
      tooltip: "your@email.com",
      icon: "email",
    },
    {
      label: "Discord",
      value: "@yourhandle",
      href: "#",
      tooltip: "@yourhandle",
      icon: "discord",
    },
  ],

  /* Tech-stack carousel (two counter-scrolling ribbons).
     Each entry renders a monogram badge; keep `glyph` to 2 characters. */
  skills: [
    { name: "JavaScript", glyph: "JS" },
    { name: "TypeScript", glyph: "TS" },
    { name: "Python", glyph: "Py" },
    { name: "Java", glyph: "Jv" },
    { name: "HTML", glyph: "H5" },
    { name: "CSS", glyph: "C3" },
    { name: "React", glyph: "Re" },
    { name: "Node.js", glyph: "No" },
    { name: "Git", glyph: "Gt" },
    { name: "Figma", glyph: "Fg" },
    { name: "SQL", glyph: "SQ" },
    { name: "Docker", glyph: "Dk" },
  ],

  /* Experience timeline. `logo` may be an image path or "" (dot fallback). */
  experience: [
    {
      id: "company-one",
      company: "Your Company",
      logo: "",
      website: "https://example.com",
      current: true,
      positions: [
        {
          title: "Your Role",
          period: "Jan 2024 - Present",
          type: "Full-time",
          open: true,
          bullets: [
            "What you built, owned, or shipped in this role.",
            "Tools you used and impact you had.",
          ],
          skills: ["Skill One", "Skill Two", "Skill Three"],
        },
      ],
    },
    {
      id: "company-two",
      company: "Previous Company",
      logo: "",
      website: "",
      current: false,
      positions: [
        {
          title: "Earlier Role",
          period: "Jun 2022 - Dec 2023",
          type: "Internship",
          open: true,
          bullets: ["What you worked on here."],
          skills: ["Skill One", "Skill Two"],
        },
      ],
    },
  ],

  /* Projects. `image` falls back to assets/placeholder.svg when empty.
     `accent` + `font` theme the detail page; `template` picks the detail
     layout variant: "default" | "spotlight" | "newspaper" | "tv" | "contour". */
  projects: [
    {
      id: "project-one",
      title: "Project One",
      description: "One-line card description of your first project.",
      longDescription:
        "Longer description shown on the project detail page. What it does, who it serves, and what you built.",
      image: "",
      tags: ["JavaScript", "CSS", "HTML"],
      detailTags: ["Web", "UI"],
      live: "#",
      github: "#",
      accent: "#ED7C31",
      font: "Inter",
      template: "spotlight",
      features: [
        { title: "Feature One", desc: "What this feature does." },
        { title: "Feature Two", desc: "What this feature does." },
      ],
      tech: [
        { l: "Frontend", v: "HTML, CSS, JavaScript" },
        { l: "Tools", v: "Git, Vite" },
      ],
    },
    {
      id: "project-two",
      title: "Project Two",
      description: "One-line card description of your second project.",
      longDescription: "Longer description shown on the project detail page.",
      image: "",
      tags: ["Python", "AI"],
      live: "#",
      github: "#",
      accent: "#4CAF7D",
      font: "Inter",
      template: "default",
      features: [{ title: "Feature One", desc: "What this feature does." }],
      tech: [{ l: "Stack", v: "Python" }],
    },
    {
      id: "project-three",
      title: "Project Three",
      description: "One-line card description of your third project.",
      longDescription: "Longer description shown on the project detail page.",
      image: "",
      tags: ["React", "API"],
      live: "#",
      github: "#",
      accent: "#FA8638",
      font: "Playfair Display",
      template: "newspaper",
      features: [{ title: "Feature One", desc: "What this feature does." }],
      tech: [{ l: "Stack", v: "React" }],
    },
    {
      id: "project-four",
      title: "Project Four",
      description: "One-line card description of your fourth project.",
      longDescription: "Longer description shown on the project detail page.",
      image: "",
      tags: ["Node.js", "Database"],
      live: "#",
      github: "#",
      accent: "#7C6CF0",
      font: "Space Grotesk",
      template: "tv",
      features: [{ title: "Feature One", desc: "What this feature does." }],
      tech: [{ l: "Stack", v: "Node.js" }],
    },
    {
      id: "project-five",
      title: "Project Five",
      description: "One-line card description of your fifth project.",
      longDescription: "Longer description shown on the project detail page.",
      image: "",
      tags: ["Design", "CSS"],
      live: "#",
      github: "#",
      accent: "#E5486F",
      font: "Inter",
      template: "default",
      features: [{ title: "Feature One", desc: "What this feature does." }],
      tech: [{ l: "Stack", v: "Figma, CSS" }],
    },
    {
      id: "project-six",
      title: "Project Six",
      description: "One-line card description of your sixth project.",
      longDescription: "Longer description shown on the project detail page.",
      image: "",
      tags: ["Canvas", "Generative"],
      live: "#",
      github: "#",
      accent: "#2E9BC6",
      font: "Space Grotesk",
      template: "contour",
      features: [{ title: "Feature One", desc: "What this feature does." }],
      tech: [{ l: "Stack", v: "Canvas, JavaScript" }],
    },
  ],

  /* Homepage shows these 6 (scattered overlapping layout on desktop). */
  homeProjectIds: [
    "project-one",
    "project-two",
    "project-three",
    "project-four",
    "project-five",
    "project-six",
  ],

  /* Projects page order + prev/next navigation order. */
  projectOrder: [
    "project-one",
    "project-two",
    "project-three",
    "project-four",
    "project-five",
    "project-six",
  ],

  /* Static demo commit data for the GitHub activity chart (last 7 months).
     Wire this to the GitHub API yourself if you want live data. */
  githubActivity: [
    { label: "Mar", value: 24 },
    { label: "Apr", value: 41 },
    { label: "May", value: 18 },
    { label: "Jun", value: 52 },
    { label: "Jul", value: 33 },
    { label: "Aug", value: 47 },
    { label: "Sep", value: 29 },
  ],

  nav: [
    { label: "Home", href: "index.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Resume", href: "resume.html" },
  ],
};

/* Placeholder image used whenever a project/personal image is empty. */
const PLACEHOLDER_IMG = "assets/placeholder.svg";
const projectImage = (p) => (p && p.image ? p.image : PLACEHOLDER_IMG);
