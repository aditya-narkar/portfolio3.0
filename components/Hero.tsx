"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import Magnetic from "./Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const dev = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el) return;

    let split: SplitType | null = null;
    const ctx = gsap.context(() => {
      if (!reduce && h1.current) {
        split = new SplitType(h1.current, { types: "lines,words" });
        el.querySelectorAll<HTMLElement>(".line").forEach((l) => (l.style.overflow = "hidden"));
        gsap.set(".hero-fade", { opacity: 0, y: 24 });
        const tl = gsap.timeline({ delay: 1.7 });
        tl.from(split.words, { yPercent: 118, duration: 0.9, ease: "power3.out", stagger: 0.025 })
          .to(".hero-fade", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12 }, "-=0.5");
      }

      // ghost "DEV" parallax to pointer (desktop only)
      if (!reduce && dev.current && window.matchMedia("(hover: hover)").matches) {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const mx = (e.clientX - r.left) / r.width - 0.5;
          const my = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(dev.current, { x: mx * -46, y: my * -26, duration: 0.6, ease: "power2.out" });
        };
        el.addEventListener("mousemove", onMove);
        return () => el.removeEventListener("mousemove", onMove);
      }
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(120px,15vh,160px) clamp(20px,5vw,96px) clamp(44px,7vh,72px)",
        maxWidth: 1480,
        margin: "0 auto",
        background: "radial-gradient(100% 60% at 50% 0%, #2a2424 0%, #161212 70%)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-12%",
          right: "-8%",
          width: "72vw",
          height: "72vw",
          maxWidth: 880,
          maxHeight: 880,
          background: "radial-gradient(circle at 60% 40%, rgba(129,1,0,0.42), rgba(129,1,0,0.12) 42%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <span
        ref={dev}
        className="ghost"
        aria-hidden
        style={{
          position: "absolute",
          top: "14%",
          right: "-2%",
          fontSize: "clamp(5rem, 18vw, 18rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.03em",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        DEV
      </span>

      <div style={{ position: "relative", zIndex: 2 }}>
        <p className="eyebrow hero-fade" style={{ marginBottom: 20 }}>
          Full-stack developer, Mumbai, India
        </p>
        <h1
          ref={h1}
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(2.1rem, 4.8vw, 4.2rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 32px",
            color: "var(--cotton)",
            maxWidth: "19ch",
          }}
        >
          I build fast, scalable web experiences, front to back.
        </h1>

        <div className="hero-fade" style={{ maxWidth: "52ch" }}>
          <p style={{ color: "var(--cotton-dim)", fontSize: "clamp(1rem,1.4vw,1.125rem)", lineHeight: 1.6, margin: "0 0 28px" }}>
            Two years crafting high-performance interfaces across e-commerce and SaaS with React, Next.js, and the MERN stack, plus deep Shopify work.
          </p>
        </div>

        <div className="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <Magnetic strength={0.35}>
            <a className="btn btn-primary" href="#work">
              View work <span className="btn-ic" aria-hidden>↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a className="btn btn-ghost" href="#contact">
              Get in touch <span className="btn-ic" aria-hidden>→</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
