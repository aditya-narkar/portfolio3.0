export type Project = {
  num: string;
  kind: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  urlLabel: string;
  highlight?: string;
  seed: string; // picsum seed for the panel backdrop; replace with real screenshot in /public/work
  stats?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    num: "01",
    kind: "Fintech · Frontend",
    title: "Startup Investment Platform",
    desc: "A responsive frontend for a startup investment platform in React and Redux. Turned Figma designs into a dynamic, high-performance interface with real-time data over RESTful APIs.",
    tags: ["React.js", "Redux", "RESTful APIs", "Figma"],
    url: "https://bizdateup.com",
    urlLabel: "bizdateup.com",
    highlight: "Featured",
    seed: "bizdateup-invest",
    stats: [
      { value: "+25%", label: "User engagement" },
      { value: "+30%", label: "Data efficiency" },
    ],
  },
  {
    num: "02",
    kind: "E-commerce · Shopify",
    title: "Lafit Lightings",
    desc: "A modern Shopify store rebuilt with interactive 3D product models, refined UI/UX, and a structure optimized for speed and stability.",
    tags: ["Shopify", "Liquid", "JavaScript", "3D Models"],
    url: "https://lafitlighting.com",
    urlLabel: "lafitlighting.com",
    highlight: "3D product viewer",
    seed: "lafit-lighting-3d",
  },
  {
    num: "03",
    kind: "E-commerce · Shopify",
    title: "The Bar Collective",
    desc: "A luxury Shopify build with refined UI animation and visual storytelling, plus a custom product-catalog generator for personalized catalogs.",
    tags: ["Shopify", "Liquid", "Performance"],
    url: "https://thebarcollective.com",
    urlLabel: "thebarcollective.com",
    highlight: "20% faster loads",
    seed: "bar-collective-luxury",
  },
  {
    num: "04",
    kind: "Web · Next.js + CMS",
    title: "DermaHouse CMS",
    desc: "A fast, SEO-friendly site on Next.js with a custom CMS admin panel, a secure backend, and a frontend tuned for reliability at scale.",
    tags: ["Next.js", "Node.js", "Custom CMS", "SEO"],
    url: "https://thedermahouse.com",
    urlLabel: "thedermahouse.com",
    highlight: "Custom CMS · SEO-first",
    seed: "dermahouse-cms",
  },
];

export const experience = [
  {
    dates: "SEP 2024 - PRESENT",
    role: "Web Developer",
    company: "The Works",
    location: "Mumbai, India",
    points: [
      "Build and maintain client projects across React.js, Next.js, Node.js, PHP, and Shopify, keeping code clean and maintainable across diverse stacks.",
      "Ship responsive, high-performance interfaces and custom Shopify features in Liquid, improving engagement and streamlining e-commerce.",
      "Optimize performance, stability, and SEO across Shopify and PHP for measurable gains in load times and rankings.",
      "Partner with design and backend teams to resolve issues and ensure smooth, high-quality deployments.",
    ],
  },
  {
    dates: "FEB 2023 - AUG 2024",
    role: "Junior Developer",
    company: "Bizdateup Technologies",
    location: "Mumbai, India",
    points: [
      "Developed responsive web apps in React.js, JavaScript, and Redux, delivering interfaces that lifted user satisfaction.",
      "Translated Figma designs into dynamic React frontends for an investment platform, a 25% lift in engagement.",
      "Implemented and optimized RESTful APIs for real-time updates, raising data-handling efficiency by 30%.",
      "Used Git for version control and held code quality through testing, debugging, and best practices.",
    ],
  },
];

export const skills = [
  { title: "Frontend", items: ["React.js", "Next.js", "Redux", "Recoil", "TypeScript", "JavaScript", "Tailwind CSS", "React Native"] },
  { title: "Backend", items: ["Node.js", "Express.js", "RESTful APIs", "MongoDB", "PHP"] },
  { title: "Platforms", items: ["Shopify", "Liquid", "Git", "GitHub", "SEO"] },
];

export const stats = [
  { value: 2, suffix: "+", label: "Years experience", accent: true },
  { value: 4, suffix: "", label: "Products shipped" },
  { value: 30, suffix: "%", label: "Perf gains" },
  { value: 2, suffix: "", label: "Companies", accent: true },
];

export const marqueeWords = ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "Shopify", "Liquid", "Redux", "Tailwind"];
