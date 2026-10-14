"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 2);
      if (numRef.current) numRef.current.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "var(--noir-deep)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{
              width: 76,
              height: 76,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--gradient-cherry)",
              color: "var(--cotton)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            AN
          </motion.div>
          <div style={{ width: "min(280px, 72vw)", display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                color: "var(--cotton-faint)",
              }}
            >
              <span>LOADING</span>
              <span ref={numRef} style={{ color: "var(--cherry-bright)" }}>000</span>
            </div>
            <div style={{ height: 2, background: "var(--surface-high)", overflow: "hidden" }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: "100%", background: "var(--cherry-red)", transformOrigin: "left" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
