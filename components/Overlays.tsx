"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export default function Overlays() {
  const reduce = useReducedMotion();
  const glow = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return;
    const el = glow.current;
    const onMove = (e: PointerEvent) => {
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.style.opacity = "1";
    };
    const onLeave = () => { if (el) el.style.opacity = "0"; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <>
      <div id="grain" aria-hidden />
      <div id="cursor-glow" ref={glow} aria-hidden />
      <motion.div id="top-progress" style={{ scaleX }} aria-hidden />
    </>
  );
}
