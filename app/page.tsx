"use client";

/* Prototype route — light editorial + playful direction (aditya-gupta inspired).
   Self-contained: own theme vars + styles, does not touch the live dark site. */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { projects, skills, experience, stats } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

// one marquee "half": the stack repeated enough that it always exceeds the viewport width (seamless loop)
const MARQUEE = "React · Next.js · TypeScript · Node · MongoDB · Shopify · Liquid · Redux · Tailwind · ".repeat(3);

const LINKS: [string, string][] = [["Work", "#work"], ["Experience", "#experience"], ["Contact", "#contact"]];

function reveal(reduce: boolean, delay = 0) {
  return reduce
    ? {}
    : { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.35 }, transition: { duration: 0.7, delay, ease: EASE } };
}

// above-the-fold: animate on mount, not on scroll-in (whileInView is unreliable for content already in view)
function enter(reduce: boolean, delay = 0) {
  return reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!ref.current) return;
    if (!inView || reduce) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1300);
      const e = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = `${Math.round(value * e)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function RotatingBadge() {
  const text = "OPEN TO WORK · FULL-STACK DEVELOPER · ";
  return (
    <div className="v3-badge" aria-hidden>
      <svg viewBox="0 0 120 120" className="v3-badge-svg">
        <defs>
          <path id="circ" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text fontSize="9.4" fill="currentColor">
          {/* textLength = circle circumference (2·π·42 ≈ 264) so one copy fills the ring exactly, no overlap/gap */}
          <textPath href="#circ" textLength="263" lengthAdjust="spacingAndGlyphs">{text}</textPath>
        </text>
      </svg>
      <span className="v3-badge-star">✺</span>
    </div>
  );
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button className="v3-toggle" onClick={onToggle} aria-label="Toggle theme" aria-pressed={dark}>
      <span className="v3-toggle-knob" data-dark={dark}>{dark ? "☾" : "☀"}</span>
    </button>
  );
}

export default function V3() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = !!useReducedMotion();

  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 });

  function onListMove(e: React.PointerEvent) {
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  return (
    <div className="v3" data-theme={dark ? "dark" : "light"}>
      <div className="v3-grid" aria-hidden />

      {/* nav */}
      <header className="v3-nav">
        <a href="#top" className="v3-word" onClick={() => setMenuOpen(false)}>Aditya<span>®</span></a>
        <div className="v3-nav-right">
          <nav className="v3-links">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
          <button
            className="v3-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
        {menuOpen && (
          <div className="v3-menu">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </div>
        )}
      </header>

      {/* hero */}
      <section className="v3-hero" id="top">
        <motion.p className="v3-eyebrow" {...enter(reduce, 0)}>
          <span className="v3-dot" /> Based in Mumbai, India
        </motion.p>
        <h1 className="v3-title">
          {[
            { t: "Full-stack" },
            { t: "developer" },
            { t: "&" },
            { t: "interface", cls: " v3-outline" },
            { t: "builder.", cls: " v3-accent" },
          ].map((w, i) => (
            <span key={w.t} className="v3-word-wrap">
              <motion.span className={`v3-line${w.cls ?? ""}`} {...enter(reduce, 0.05 + i * 0.07)}>{w.t}</motion.span>{" "}
            </span>
          ))}
        </h1>
        <div className="v3-hero-foot">
          <motion.p className="v3-lead" {...enter(reduce, 0.4)}>
            Two years turning Figma into fast, scalable products across e-commerce and SaaS. React, Next.js, the MERN stack, and deep Shopify work.
          </motion.p>
          <RotatingBadge />
        </div>
      </section>

      {/* marquee — two identical halves, each wider than any viewport, so translateX(-50%) loops seamlessly */}
      <div className="v3-marquee" aria-hidden>
        <div className="v3-marquee-track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      {/* work */}
      <section className="v3-sec v3-work" id="work">
        <div className="v3-sec-head">
          <motion.h2 {...reveal(reduce, 0)}>Selected work</motion.h2>
          <motion.span className="v3-count" {...reveal(reduce, 0.1)}>({projects.length})</motion.span>
        </div>
        <div className="v3-list" onPointerMove={onListMove} onPointerLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <a key={p.num} href={p.url} target="_blank" rel="noopener" className="v3-row" onPointerEnter={() => setHovered(i)}>
              <span className="v3-row-num">{p.num}</span>
              <span className="v3-row-title">{p.title}</span>
              <span className="v3-row-kind">{p.kind}</span>
              <span className="v3-row-arrow" aria-hidden>↗</span>
            </a>
          ))}
          <motion.div className="v3-preview" style={{ x: sx, y: sy, opacity: hovered !== null && !reduce ? 1 : 0 }} aria-hidden>
            {hovered !== null && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={`https://picsum.photos/seed/${projects[hovered].seed}/600/440`} alt="" />
            )}
          </motion.div>
        </div>
      </section>

      {/* capabilities */}
      <section className="v3-sec v3-skills" id="skills">
        <div className="v3-sec-head">
          <motion.h2 {...reveal(reduce, 0)}>What I work with</motion.h2>
        </div>
        <div>
          {skills.map((grp, i) => (
            <motion.div key={grp.title} className="v3-skill-row" {...reveal(reduce, i * 0.08)}>
              <span className="v3-skill-cat">{grp.title}</span>
              <div className="v3-chips">
                {grp.items.map((it) => (
                  <span key={it} className="v3-chip">{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* experience */}
      <section className="v3-sec v3-exp" id="experience">
        <div className="v3-sec-head">
          <motion.h2 {...reveal(reduce, 0)}>Experience</motion.h2>
        </div>
        <div>
          {experience.map((job, i) => (
            <motion.div key={job.company} className="v3-exp-row" {...reveal(reduce, i * 0.08)}>
              <div className="v3-exp-meta">
                <span className="v3-exp-dates">{job.dates}</span>
                <h3>{job.role}</h3>
                <span className="v3-exp-co">{job.company}</span>
                <span className="v3-exp-loc">{job.location}</span>
              </div>
              <ul className="v3-exp-points">
                {job.points.map((pt, j) => (
                  <li key={j}><span aria-hidden>↳</span><span>{pt}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* about + stats */}
      <section className="v3-sec v3-about" id="about">
        <motion.h2 {...reveal(reduce, 0)}>
          I build measurable, maintainable web apps, front to back, and I care how they feel.
        </motion.h2>
        <div className="v3-stats">
          {stats.map((s) => (
            <motion.div key={s.label} className="v3-stat" {...reveal(reduce, 0.05)}>
              <div className="v3-stat-num" data-accent={s.accent}><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="v3-stat-lbl">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="v3-edu">
          <span className="v3-edu-tag">Education</span>
          <div>
            <h3>B.Sc. in Computer Science</h3>
            <span>Ismail Yusuf College, Mumbai India</span>
          </div>
          <span className="v3-edu-date">2018 - 2021</span>
        </div>
      </section>

      {/* contact */}
      <section className="v3-sec v3-contact" id="contact">
        <motion.p className="v3-eyebrow" {...reveal(reduce, 0)}><span className="v3-dot" /> Available for work</motion.p>
        <motion.h2 className="v3-contact-h" {...reveal(reduce, 0.05)}>
          Let&rsquo;s build something <span className="v3-accent">together.</span>
        </motion.h2>
        <motion.a href="mailto:narkaraditya04@gmail.com" className="v3-email" {...reveal(reduce, 0.1)}>
          narkaraditya04@gmail.com
        </motion.a>
        <motion.div className="v3-cta" {...reveal(reduce, 0.15)}>
          <a className="v3-btn" href="mailto:narkaraditya04@gmail.com">Get in touch <span>↗</span></a>
          <div className="v3-social">
            <a href="https://www.linkedin.com/in/adityanarkar20/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/narkaraditya10" target="_blank" rel="noopener">GitHub</a>
            <a href="/Aditya-Narkar-Resume.docx" download>Resume</a>
          </div>
        </motion.div>
        <footer className="v3-foot">
          <span>© {new Date().getFullYear()} Aditya Narkar</span>
          <span>Mumbai, India · +91 86526 83750</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>

      <style>{`
        .v3 {
          --paper: #efe9dc; --ink: #15110f; --ink-dim: #6c6457; --accent: #cf2b1f;
          --line: rgba(21,17,15,0.09); --card: #e6dfd0;
          --ease: cubic-bezier(0.16,1,0.3,1);
          position: relative; min-height: 100dvh; background: var(--paper); color: var(--ink);
          font-family: var(--font-body); overflow-x: clip; transition: background .5s var(--ease), color .5s var(--ease);
        }
        .v3[data-theme="dark"] {
          --paper: #131110; --ink: #f0ebdf; --ink-dim: #938b7d; --accent: #e8493b;
          --line: rgba(240,235,223,0.08); --card: #1d1a18;
        }
        .v3 ::selection { background: var(--accent); color: var(--paper); }
        .v3 a { color: inherit; text-decoration: none; }
        .v3-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px; mask-image: radial-gradient(140% 120% at 50% 0%, #000 55%, transparent 100%);
        }
        .v3 > *:not(.v3-grid) { position: relative; z-index: 1; }
        .v3 header.v3-nav { z-index: 50; } /* beat the :not() rule (specificity 0,2,0) so the open menu sits over the hero */

        .v3-nav { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 22px clamp(20px,5vw,72px); backdrop-filter: blur(6px); z-index: 20; }
        .v3-word { font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; }
        .v3-word span { color: var(--accent); font-size: 12px; vertical-align: super; margin-left: 2px; }
        .v3-links { display: flex; align-items: center; gap: clamp(16px,2.4vw,30px); font-size: 14px; font-weight: 500; }
        .v3-links a { color: var(--ink-dim); transition: color .25s var(--ease); }
        .v3-links a:hover { color: var(--ink); }
        .v3-toggle { width: 54px; height: 28px; border-radius: 999px; border: 1px solid var(--line); background: var(--card); cursor: pointer; display: inline-flex; align-items: center; padding: 2px; }
        .v3-toggle-knob { width: 22px; height: 22px; border-radius: 999px; background: var(--accent); color: var(--paper); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; transition: transform .35s var(--ease); }
        .v3-toggle-knob[data-dark="true"] { transform: translateX(26px); }
        .v3-nav-right { display: flex; align-items: center; gap: clamp(14px,2.2vw,28px); }
        .v3-burger { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; flex-direction: column; gap: 5px; background: transparent; border: 0; cursor: pointer; padding: 0; }
        .v3-burger span { display: block; width: 22px; height: 2px; background: var(--ink); transition: transform .3s var(--ease); }
        .v3-burger[aria-expanded="true"] span:first-child { transform: translateY(3.5px) rotate(45deg); }
        .v3-burger[aria-expanded="true"] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
        .v3-menu { position: absolute; top: 100%; left: 0; right: 0; z-index: 25; background: #efe9dc; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); box-shadow: 0 24px 48px rgba(0,0,0,0.12); display: none; flex-direction: column; padding: 6px clamp(20px,5vw,72px) 18px; }
        .v3[data-theme="dark"] .v3-menu { background: #131110; box-shadow: 0 24px 48px rgba(0,0,0,0.5); }
        .v3-menu a { padding: 14px 0; font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.02em; border-bottom: 1px solid var(--line); color: var(--ink); }
        .v3-menu a:last-child { border-bottom: 0; }

        .v3-hero { padding: clamp(30px,5vw,70px) clamp(20px,5vw,72px) clamp(30px,5vw,60px); max-width: 1500px; margin: 0 auto; }
        .v3-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-dim); margin: 0 0 clamp(18px,3vw,30px); }
        .v3-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent); }
        .v3-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.8rem, 10vw, 8.5rem); line-height: 0.94; letter-spacing: -0.045em; margin: 0; text-wrap: balance; }
        .v3-line { display: inline-block; }
        .v3-outline { color: transparent; -webkit-text-stroke: 1.6px var(--ink); }
        .v3-accent { color: var(--accent); font-style: italic; }
        .v3-hero-foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-top: clamp(32px,5vw,56px); flex-wrap: wrap; }
        .v3-lead { max-width: 46ch; color: var(--ink-dim); font-size: clamp(1rem,1.3vw,1.15rem); line-height: 1.6; margin: 0; }
        .v3-badge { position: relative; width: 124px; height: 124px; flex-shrink: 0; color: var(--ink); animation: v3spin 14s linear infinite; }
        .v3-badge-svg { width: 100%; height: 100%; }
        .v3-badge-star { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 26px; animation: v3spin 14s linear infinite reverse; }
        @keyframes v3spin { to { transform: rotate(360deg); } }

        .v3-marquee { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 16px 0; margin-top: clamp(24px,4vw,48px); }
        .v3-marquee-track { display: inline-flex; white-space: nowrap; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.1rem,2vw,1.6rem); color: var(--ink-dim); animation: v3marq 26s linear infinite; }
        @keyframes v3marq { to { transform: translateX(-50%); } }

        .v3-sec { padding: clamp(44px,5.5vw,84px) clamp(20px,5vw,72px); max-width: 1500px; margin: 0 auto; }
        .v3-sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: clamp(28px,4vw,52px); }
        .v3-sec-head h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.8rem,4.6vw,3.4rem); letter-spacing: -0.025em; margin: 0; }
        .v3-count { font-family: var(--font-mono); color: var(--accent); font-size: 14px; }

        .v3-list { position: relative; }
        .v3-row { display: grid; grid-template-columns: 56px 1fr auto 40px; align-items: center; gap: 20px; padding: clamp(20px,2.6vw,34px) 8px; border-top: 1px solid var(--line); transition: padding-left .4s var(--ease); }
        .v3-row:last-of-type { border-bottom: 1px solid var(--line); }
        .v3-row-num { font-family: var(--font-mono); font-size: 13px; color: var(--ink-dim); }
        .v3-row-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.6rem,4vw,3.4rem); letter-spacing: -0.02em; line-height: 1; transition: color .3s var(--ease); }
        .v3-row-kind { font-family: var(--font-mono); font-size: 12px; color: var(--ink-dim); text-transform: uppercase; letter-spacing: 0.04em; }
        .v3-row-arrow { font-size: 20px; color: var(--ink-dim); transition: transform .4s var(--ease), color .3s var(--ease); justify-self: end; }
        @media (hover: hover) {
          .v3-row:hover { padding-left: 28px; }
          .v3-row:hover .v3-row-title { color: var(--accent); }
          .v3-row:hover .v3-row-arrow { transform: translate(5px,-5px); color: var(--accent); }
        }
        .v3-preview { position: fixed; top: 0; left: 0; z-index: 40; width: 300px; height: 220px; margin: -110px 0 0 -150px; pointer-events: none; overflow: hidden; border-radius: 6px; box-shadow: 0 30px 70px rgba(0,0,0,0.3); transition: opacity .35s var(--ease); }
        .v3-preview img { width: 100%; height: 100%; object-fit: cover; }
        @media (hover: none) { .v3-preview { display: none; } }

        .v3-skill-row { display: grid; grid-template-columns: minmax(0,0.5fr) minmax(0,2fr); gap: clamp(20px,4vw,60px); align-items: start; padding: clamp(24px,3vw,40px) 0; border-top: 1px solid var(--line); }
        .v3-skill-row:last-child { border-bottom: 1px solid var(--line); }
        .v3-skill-cat { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.3rem,2.4vw,2rem); letter-spacing: -0.02em; }
        .v3-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .v3-chip { padding: 9px 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--card); font-size: 14px; color: var(--ink-dim); transition: color .25s var(--ease), border-color .25s var(--ease); }
        .v3-chip:hover { color: var(--accent); border-color: var(--accent); }

        .v3-exp-row { display: grid; grid-template-columns: minmax(0,0.7fr) minmax(0,2fr); gap: clamp(24px,4vw,72px); padding: clamp(28px,4vw,52px) 0; border-top: 1px solid var(--line); }
        .v3-exp-row:last-child { border-bottom: 1px solid var(--line); }
        .v3-exp-meta { display: flex; flex-direction: column; gap: 6px; }
        .v3-exp-dates { font-family: var(--font-mono); font-size: 12px; color: var(--accent); letter-spacing: 0.04em; }
        .v3-exp-meta h3 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.4rem,2.6vw,2rem); letter-spacing: -0.02em; margin: 6px 0 2px; }
        .v3-exp-co { font-weight: 600; }
        .v3-exp-loc { color: var(--ink-dim); font-size: 14px; }
        .v3-exp-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 18px; }
        .v3-exp-points li { display: flex; gap: 14px; color: var(--ink-dim); line-height: 1.6; }
        .v3-exp-points li span:first-child { color: var(--accent); flex-shrink: 0; }

        .v3-about h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.9rem,4.6vw,3.6rem); letter-spacing: -0.025em; line-height: 1.08; margin: 0 0 clamp(40px,6vw,70px); max-width: 20ch; text-wrap: balance; }
        .v3-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(16px,3vw,40px); padding-bottom: clamp(40px,6vw,70px); border-bottom: 1px solid var(--line); }
        .v3-stat-num { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.4rem,6vw,4.4rem); line-height: 1; letter-spacing: -0.03em; }
        .v3-stat-num[data-accent="true"] { color: var(--accent); }
        .v3-stat-lbl { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-dim); margin-top: 12px; }
        .v3-edu { display: grid; grid-template-columns: auto 1fr auto; gap: clamp(20px,4vw,48px); align-items: center; padding-top: clamp(32px,4vw,48px); }
        .v3-edu-tag { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--ink-dim); }
        .v3-edu h3 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.2rem,2.2vw,1.6rem); margin: 0 0 4px; }
        .v3-edu > div span { color: var(--ink-dim); }
        .v3-edu-date { font-family: var(--font-mono); font-size: 13px; color: var(--accent); white-space: nowrap; }

        .v3-contact { text-align: left; padding-bottom: 0; }
        .v3-contact-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.6rem,9vw,7rem); letter-spacing: -0.04em; line-height: 0.96; margin: 16px 0 clamp(32px,5vw,48px); max-width: 14ch; }
        .v3-email { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.4rem,4.5vw,3rem); letter-spacing: -0.02em; display: inline-block; word-break: break-word; transition: color .3s var(--ease); }
        .v3-email:hover { color: var(--accent); }
        .v3-cta { display: flex; align-items: center; gap: clamp(24px,4vw,56px); flex-wrap: wrap; margin: clamp(36px,5vw,56px) 0 0; }
        .v3-btn { display: inline-flex; align-items: center; gap: 12px; background: var(--accent); color: var(--paper); padding: 18px 28px; border-radius: 999px; font-weight: 600; font-size: 15px; transition: filter .3s var(--ease); }
        .v3-btn span { transition: transform .3s var(--ease); }
        .v3-btn:hover { filter: brightness(1.08); }
        .v3-btn:hover span { transform: translate(3px,-3px); }
        .v3-social { display: flex; gap: 20px; font-family: var(--font-mono); font-size: 13px; color: var(--ink-dim); }
        .v3-social a { border-bottom: 1px solid transparent; transition: color .25s, border-color .25s; }
        .v3-social a:hover { color: var(--accent); border-bottom-color: var(--accent); }
        .v3-foot { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-top: clamp(60px,9vw,110px); padding: 28px 0; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 12px; color: var(--ink-dim); }

        @media (max-width: 860px) {
          .v3-skill-row, .v3-exp-row { grid-template-columns: 1fr; }
          .v3-stats { grid-template-columns: 1fr 1fr; gap: 28px; }
          .v3-edu { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .v3-row { grid-template-columns: 40px 1fr; }
          .v3-row-kind, .v3-row-arrow { display: none; }
        }
        @media (max-width: 640px) {
          .v3-links { display: none; }
          .v3-burger { display: flex; }
          .v3-menu { display: flex; }
          .v3-sec { padding-top: clamp(40px,9vw,60px); padding-bottom: clamp(40px,9vw,60px); }
          .v3-row { grid-template-columns: 30px 1fr; gap: 12px; }
          .v3-row-title { font-size: 1.45rem; overflow-wrap: anywhere; }
          .v3-email { font-size: 1.3rem; overflow-wrap: anywhere; }
          .v3-contact-h { font-size: clamp(2.3rem, 12vw, 3.2rem); }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-badge, .v3-badge-star, .v3-marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
