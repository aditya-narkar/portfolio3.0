"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/lib/data";

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section">
      <span className="ghost" aria-hidden style={{ position: "absolute", top: "2%", right: "-1%", fontSize: "clamp(6rem,20vw,20rem)", zIndex: 0 }}>
        02
      </span>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: "clamp(48px,7vw,88px)" }}>
          <h2 className="font-display">Where I have<br />worked.</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,6vw,80px)" }}>
          {experience.map((job) => (
            <div
              key={job.company}
              className="exp-grid"
              style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,2fr)", gap: "clamp(24px,4vw,72px)" }}
            >
              <div
                className="exp-meta"
                style={{ position: "sticky", top: 110, alignSelf: "start", background: "var(--surface-low)", padding: 32 }}
              >
                <div className="font-mono" style={{ fontSize: 12, color: "var(--cherry-bright)", letterSpacing: "0.04em", marginBottom: 18 }}>
                  {job.dates}
                </div>
                <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.625rem", letterSpacing: "-0.01em", margin: "0 0 10px" }}>
                  {job.role}
                </h3>
                <div style={{ color: "var(--cotton-dim)", fontWeight: 600, fontSize: "0.9rem" }}>{job.company}</div>
                <div style={{ color: "var(--cotton-faint)", fontSize: "0.9rem", marginTop: 4 }}>{job.location}</div>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                {job.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", gap: 16, color: "var(--cotton-dim)", lineHeight: 1.6 }}
                  >
                    <span className="font-mono" style={{ color: "var(--cherry-bright)", flexShrink: 0, fontSize: 13, paddingTop: 5 }}>
                      →
                    </span>
                    <span>{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 760px){ .exp-grid{ grid-template-columns: 1fr !important } .exp-meta{ position: static !important } }`}</style>
    </section>
  );
}
