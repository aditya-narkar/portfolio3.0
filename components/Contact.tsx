"use client";

import { motion, useReducedMotion } from "motion/react";
import Magnetic from "./Magnetic";

export default function Contact() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <>
      <section id="contact" className="section" style={{ paddingTop: "clamp(90px,13vw,170px)" }}>
        <span className="ghost" aria-hidden style={{ position: "absolute", top: 0, left: "-1%", fontSize: "clamp(6rem,22vw,22rem)", zIndex: 0 }}>
          03
        </span>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2.8rem,10vw,6.5rem)", letterSpacing: "-0.035em", lineHeight: 0.96, margin: "0 0 36px", maxWidth: "13ch" }}>
            Let&rsquo;s build something <span style={{ color: "var(--cherry-bright)" }}>together.</span>
          </h2>
          <p style={{ color: "var(--cotton-dim)", maxWidth: "48ch", margin: "0 0 44px", lineHeight: 1.6 }}>
            Open to full-time roles and freelance projects. Tell me what you&rsquo;re working on, I usually reply within a day.
          </p>

          <a href="mailto:narkaraditya04@gmail.com" className="big-email font-display" style={{ fontWeight: 700, letterSpacing: "-0.02em", color: "var(--cotton)", fontSize: "clamp(1.5rem,5vw,3.4rem)", display: "inline-block", wordBreak: "break-word" }}>
            narkaraditya04@gmail.com
          </a>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, margin: "44px 0 64px" }}>
            <Magnetic strength={0.3}>
              <a className="btn btn-premium" href="mailto:narkaraditya04@gmail.com">Get in touch <span className="btn-ic" aria-hidden>→</span></a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn-ghost" href="https://www.linkedin.com/in/adityanarkar20/" target="_blank" rel="noopener">LinkedIn <span className="btn-ic" aria-hidden>↗</span></a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn-ghost" href="https://github.com/narkaraditya10" target="_blank" rel="noopener">GitHub <span className="btn-ic" aria-hidden>↗</span></a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn-ghost" href="/Aditya-Narkar-Resume.docx" download>Resume <span className="btn-ic" aria-hidden>↓</span></a>
            </Magnetic>
          </div>

          <div className="font-mono" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,4vw,56px)", fontSize: 12, color: "var(--cotton-faint)", letterSpacing: "0.04em" }}>
            <span>BASED IN MUMBAI, INDIA</span>
            <span><span style={{ color: "var(--status-success)" }}>●</span> OPEN TO WORK</span>
            <span>+91 86526 83750</span>
          </div>
        </motion.div>

        <style>{`.big-email:hover{ color: var(--cherry-bright) !important }`}</style>
      </section>

      <footer style={{ padding: "40px clamp(20px,5vw,96px)", maxWidth: 1480, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", background: "var(--noir-deep)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="font-display" style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-cherry)", color: "var(--cotton)", fontWeight: 700, fontSize: 12, borderRadius: 6 }}>AN</span>
          <span className="font-mono" style={{ fontSize: 12, color: "var(--cotton-faint)" }}>© {year} Aditya Narkar</span>
        </div>
        <a href="#top" className="font-mono" style={{ fontSize: 12, color: "var(--cotton-dim)", letterSpacing: "0.05em" }}>BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
