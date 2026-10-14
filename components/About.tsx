"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { stats } from "@/lib/data";

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
    const dur = 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = `${Math.round(value * e)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="section" style={{ paddingTop: "clamp(60px,9vw,110px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(32px,6vw,88px)", alignItems: "start" }}>
        <div>
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,4vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 28px", maxWidth: "16ch" }}>
            A frontend-leaning full-stack developer.
          </h2>
          <span style={{ display: "block", height: 3, width: 90, background: "var(--cherry-red)", marginBottom: 28 }} />
          <p style={{ color: "var(--cotton-dim)", lineHeight: 1.65, marginBottom: 18 }}>
            I build responsive web applications end to end, from React and Next.js interfaces to Node and Express APIs. Most of my work lives where e-commerce and SaaS meet, where performance and clean UX decide whether a product succeeds.
          </p>
          <p style={{ color: "var(--cotton-dim)", lineHeight: 1.65 }}>
            I care about measurable outcomes: faster load times, higher engagement, maintainable code. I turn Figma into pixel-accurate frontends, customize Shopify with Liquid, and optimize for SEO and stability across stacks.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--surface-highest)" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "var(--surface-lowest)", padding: "clamp(24px,3vw,40px)" }}>
              <div className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2.2rem,5vw,3.2rem)", color: s.accent ? "var(--cherry-bright)" : "var(--cotton)", lineHeight: 1 }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: "var(--cotton-faint)", marginTop: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* education */}
      <div style={{ marginTop: "clamp(40px,6vw,80px)", display: "grid", gridTemplateColumns: "minmax(0,0.6fr) minmax(0,2fr)", gap: "clamp(20px,4vw,64px)", alignItems: "center", background: "var(--surface-low)", padding: "clamp(28px,4vw,44px)" }} className="edu-grid">
        <span className="font-mono" style={{ fontSize: 11, color: "var(--cotton-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Education</span>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.5rem", margin: "0 0 6px" }}>B.Sc. in Computer Science</h3>
            <div style={{ color: "var(--cotton-dim)" }}>Ismail Yusuf College, Mumbai India</div>
          </div>
          <span className="font-mono" style={{ fontSize: 12, color: "var(--cherry-bright)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>AUG 2018 - MAY 2021</span>
        </div>
      </div>

      <style>{`@media (max-width:640px){ .edu-grid{ grid-template-columns: 1fr !important } }`}</style>
    </section>
  );
}
