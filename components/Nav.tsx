"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["work", "experience", "skills", "about", "contact"];
    const map: Record<string, string> = { work: "work", experience: "experience", skills: "experience", about: "contact", contact: "contact" };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(map[e.target.id] ?? "");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 150,
        display: "flex",
        alignItems: "center",
        gap: "clamp(14px, 2.4vw, 26px)",
        padding: "10px 12px 10px 18px",
        borderRadius: 9999,
        background: "var(--glass-bg)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "inset 0 1px 0 rgba(237,235,221,0.08), 0 10px 40px rgba(0,0,0,0.4)",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <a href="#top" aria-label="Home" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 30,
            height: 30,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--gradient-cherry)",
            color: "var(--cotton)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 7,
          }}
        >
          AN
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 22px)", fontSize: 13, fontWeight: 500 }}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            style={{
              color: active === l.id ? "var(--cotton)" : "var(--cotton-dim)",
              transition: "color 0.3s var(--ease)",
              position: "relative",
            }}
          >
            {l.label}
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -5,
                width: "100%",
                height: 1,
                background: "var(--cherry-red)",
                transform: active === l.id ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s var(--ease)",
              }}
            />
          </a>
        ))}
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "6px 12px",
          borderRadius: 9999,
          background: "rgba(92,122,75,0.14)",
          color: "var(--cotton-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--status-success)", boxShadow: "0 0 10px var(--status-success)" }} />
        AVAILABLE
      </span>
    </nav>
  );
}
