"use client";

import { motion, useReducedMotion } from "motion/react";
import { skills } from "@/lib/data";

export default function Skills() {
  const reduce = useReducedMotion();

  function spotlight(e: React.PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section id="skills" className="section" style={{ paddingTop: "clamp(60px,9vw,110px)" }}>
      <div className="section-head" style={{ marginBottom: "clamp(40px,6vw,70px)" }}>
        <h2 className="font-display">The stack I<br />work in.</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
        {skills.map((grp, i) => (
          <motion.div
            key={grp.title}
            onPointerMove={spotlight}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="skill-card"
          >
            <div className="font-mono skill-title">
              <span style={{ width: 20, height: 1, background: "var(--cherry-red)", display: "inline-block" }} />
              {grp.title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, position: "relative", zIndex: 1 }}>
              {grp.items.map((it) => (
                <span key={it} className="tag">{it}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .skill-card { position: relative; isolation: isolate; overflow: hidden; background: var(--surface-low); padding: 32px; min-height: 210px; }
        .skill-card::after { content: ""; position: absolute; inset: 0; z-index: 0; opacity: 0; transition: opacity 0.4s var(--ease); mix-blend-mode: screen; background: radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(163,2,2,0.18), transparent 68%); }
        .skill-card:hover::after { opacity: 1; }
        .skill-title { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--cherry-bright); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 26px; }
      `}</style>
    </section>
  );
}
