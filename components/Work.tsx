"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 1024 || !wrap.current || !track.current) return;

    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="work" ref={wrap} className="work-pan" aria-label="Selected work">
      <div ref={track} className="work-track">
        {/* Intro slide */}
        <div className="work-intro">
          <span className="ghost" aria-hidden style={{ fontSize: "clamp(8rem,20vw,20rem)", position: "absolute", top: "6%", left: "-2%", zIndex: 0 }}>
            01
          </span>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2.6rem,6vw,5.2rem)", letterSpacing: "-0.03em", lineHeight: 0.98, margin: 0 }}>
              Things I built<br />and shipped.
            </h2>
            <p style={{ color: "var(--cotton-dim)", marginTop: 24, maxWidth: "34ch", fontSize: "1.0625rem", lineHeight: 1.6 }}>
              Four production builds across fintech, e-commerce, and content platforms. Keep scrolling to move through them.
            </p>
            <span className="font-mono" style={{ display: "inline-block", marginTop: 28, fontSize: 12, color: "var(--cotton-faint)", letterSpacing: "0.1em" }}>
              2023 to present
            </span>
          </div>
        </div>

        {/* Project panels */}
        {projects.map((p) => (
          <a key={p.num} href={p.url} target="_blank" rel="noopener" className="work-panel group">
            <div className="work-media">
              {/* TODO: replace with real screenshot at /public/work/${p.seed}.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://picsum.photos/seed/${p.seed}/1100/760`} alt={`${p.title} preview`} loading="lazy" />
              <span className="work-scrim" aria-hidden />
              <span className="work-num font-display" aria-hidden>{p.num}</span>
            </div>
            <div className="work-body">
              <span className="font-mono" style={{ fontSize: 11, color: "var(--cherry-bright)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {p.kind}{p.highlight ? ` · ${p.highlight}` : ""}
              </span>
              <h3 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(1.6rem,2.6vw,2.4rem)", letterSpacing: "-0.02em", margin: "14px 0 14px" }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--cotton-dim)", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 20px", maxWidth: "46ch" }}>{p.desc}</p>
              {p.stats && (
                <div style={{ display: "flex", gap: 36, marginBottom: 20 }}>
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display" style={{ fontWeight: 700, fontSize: "2rem", color: "var(--cotton)", lineHeight: 1 }}>{s.value}</div>
                      <div className="font-mono" style={{ fontSize: 10.5, color: "var(--cotton-faint)", textTransform: "uppercase", marginTop: 6, letterSpacing: "0.04em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <span className="font-mono work-visit" style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--cotton-dim)" }}>
                {p.urlLabel} <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .work-pan { position: relative; background: var(--noir-soft); overflow: hidden; }
        .work-track { display: flex; align-items: stretch; height: 100dvh; gap: clamp(20px,3vw,40px); padding: 0 clamp(20px,5vw,96px); }
        .work-intro { position: relative; flex: 0 0 auto; width: min(80vw, 640px); display: flex; flex-direction: column; justify-content: center; }
        .work-panel { position: relative; flex: 0 0 auto; width: min(86vw, 980px); display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: clamp(20px,2.5vw,44px); align-self: center; background: var(--surface-low); }
        .work-media { position: relative; height: 72vh; max-height: 620px; overflow: hidden; }
        .work-media img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.3) contrast(1.05); transition: transform 0.8s var(--ease); }
        .work-panel:hover .work-media img { transform: scale(1.06); }
        .work-scrim { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(129,1,0,0.28), rgba(11,8,8,0.72)); }
        .work-num { position: absolute; left: 22px; bottom: 10px; font-weight: 700; font-size: clamp(3rem,6vw,5.5rem); color: transparent; -webkit-text-stroke: 1.4px rgba(237,235,221,0.5); line-height: 0.8; }
        .work-body { padding: clamp(20px,2.4vw,40px) clamp(20px,2.4vw,40px) clamp(20px,2.4vw,40px) 0; }
        .work-panel:hover .work-visit { color: var(--cherry-bright); }

        @media (max-width: 1023px) {
          .work-pan { overflow: visible; }
          .work-track { flex-direction: column; height: auto; gap: 48px; padding: clamp(60px,10vw,110px) clamp(20px,5vw,60px); }
          .work-intro { width: 100%; }
          .work-panel { width: 100%; grid-template-columns: 1fr; }
          .work-media { height: 48vh; }
          .work-body { padding: 24px; }
        }
      `}</style>
    </section>
  );
}
