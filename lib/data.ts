export type Project = {
  num: string;
  kind: string;
  context: string; // where it was done: The Works / Bizdateup / Freelance
  title: string;
  desc: string;
  tags: string[];
  url?: string; // omitted for the private B2B platform
  urlLabel?: string;
  seed: string; // picsum seed for the hover preview; replace with a real screenshot in /public/work
};

export const projects: Project[] = [
  {
    num: "01",
    kind: "Full-stack · B2B e-commerce",
    context: "The Works",
    title: "Custom B2B Commerce Platform",
    desc: "A custom B2B commerce platform on Symfony with organization-based access control, a multi-step order approval workflow, ERP sales-order integration, and dual payment-gateway checkout with server-side verification.",
    tags: ["Symfony", "PHP", "REST APIs", "ERP", "Payments"],
    seed: "b2b-commerce-platform",
  },
  {
    num: "02",
    kind: "Fintech · Frontend",
    context: "Bizdateup",
    title: "Startup Investment Platform",
    desc: "A responsive frontend for a startup investment platform in React and Redux. Turned Figma designs into a dynamic, high-performance interface with real-time data over RESTful APIs.",
    tags: ["React.js", "Redux", "RESTful APIs", "Figma"],
    url: "https://bizdateup.com",
    urlLabel: "bizdateup.com",
    seed: "bizdateup-invest",
  },
  {
    num: "03",
    kind: "E-commerce · Shopify",
    context: "The Works",
    title: "The Bar Collective",
    desc: "A luxury Shopify build with refined UI animation and visual storytelling, a custom product-catalog generator, and 20% faster load times.",
    tags: ["Shopify", "Liquid", "Performance"],
    url: "https://thebarcollective.com",
    urlLabel: "thebarcollective.com",
    seed: "bar-collective-luxury",
  },
  {
    num: "04",
    kind: "E-commerce · Shopify",
    context: "The Works",
    title: "Lafit Lightings",
    desc: "A modern Shopify store rebuilt with interactive 3D product models, refined UI/UX, and a structure tuned for speed and stability.",
    tags: ["Shopify", "Liquid", "JavaScript", "3D Models"],
    url: "https://lafitlighting.com",
    urlLabel: "lafitlighting.com",
    seed: "lafit-lighting-3d",
  },
  {
    num: "05",
    kind: "Web · Next.js + CMS",
    context: "The Works",
    title: "DermaHouse CMS",
    desc: "A fast, SEO-friendly site on Next.js with a custom CMS admin panel, a secure backend, and a frontend tuned for reliability at scale.",
    tags: ["Next.js", "Node.js", "Custom CMS", "SEO"],
    url: "https://thedermahouse.com",
    urlLabel: "thedermahouse.com",
    seed: "dermahouse-cms",
  },
  {
    num: "06",
    kind: "E-commerce · Shopify",
    context: "Freelance",
    title: "Pehr",
    desc: "A custom Shopify storefront for a lifestyle brand, with responsive, conversion-focused theme sections in Liquid and on-page SEO tuning.",
    tags: ["Shopify", "Liquid"],
    url: "https://www.houseofpehr.com/",
    urlLabel: "houseofpehr.com",
    seed: "pehr-shopify-lifestyle",
  },
];

export const experience = [
  {
    dates: "SEP 2024 - PRESENT",
    role: "Web Developer",
    company: "The Works",
    location: "Mumbai, India",
    points: [
      "Build and maintain client web apps across React.js, Next.js, Node.js, PHP, and Shopify, keeping code clean and maintainable across diverse stacks.",
      "Develop responsive UIs and custom Shopify features in Liquid, plus backend services and REST/ERP integrations for e-commerce platforms.",
      "Optimize performance, stability, and SEO across Shopify and PHP platforms for measurable gains in load times and rankings.",
      "Partner with design and backend teams on debugging, feature delivery, and smooth, high-quality deployments.",
    ],
  },
  {
    dates: "FEB 2023 - AUG 2024",
    role: "Junior Developer",
    company: "Bizdateup Technologies",
    location: "Mumbai, India",
    points: [
      "Developed responsive web apps in React.js, JavaScript, and Redux, delivering intuitive interfaces that lifted user satisfaction.",
      "Translated Figma designs into dynamic React frontends for an investment platform, a 25% lift in engagement.",
      "Built and optimized RESTful APIs for real-time updates, improving data-handling efficiency by 30%.",
      "Used Git for version control and upheld code quality through testing, debugging, and best practices.",
    ],
  },
];

export const skills = [
  { title: "Frontend", items: ["React.js", "Next.js", "Redux", "Recoil", "TypeScript", "JavaScript", "Tailwind CSS", "React Native"] },
  { title: "Backend", items: ["Node.js", "Express.js", "PHP", "Symfony", "REST APIs", "MongoDB", "MySQL"] },
  { title: "E-Commerce", items: ["Shopify", "Liquid", "Razorpay", "HDFC", "ERP Integration"] },
  { title: "Tools", items: ["Git", "GitHub", "SEO"] },
];

export const stats = [
  { value: 2, suffix: "+", label: "Years experience", accent: true },
  { value: 6, suffix: "", label: "Products shipped" },
  { value: 30, suffix: "%", label: "Perf gains" },
  { value: 2, suffix: "", label: "Companies", accent: true },
];

export const marqueeWords = ["React", "Next.js", "TypeScript", "Node", "MongoDB", "PHP", "Symfony", "Shopify", "Liquid", "Redux", "Tailwind"];
