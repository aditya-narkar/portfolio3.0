import { marqueeWords } from "@/lib/data";

export default function Marquee() {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <span aria-hidden={hidden} style={{ display: "inline-flex", alignItems: "center" }}>
      {marqueeWords.map((w, i) => (
        <span key={w} style={{ display: "inline-flex", alignItems: "center" }}>
          <span className={i % 2 === 1 ? "mq-ghost" : undefined} style={{ padding: "0 26px" }}>
            {w}
          </span>
          <i style={{ color: "var(--cherry-red)", fontStyle: "normal" }}>✦</i>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="marquee"
      style={{
        padding: "26px 0",
        background: "var(--surface-lowest)",
        boxShadow: "inset 0 1px 0 rgba(129,1,0,0.4), inset 0 -1px 0 rgba(129,1,0,0.4)",
      }}
    >
      <div
        className="marquee-track font-display"
        style={{
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
          letterSpacing: "-0.01em",
          color: "var(--cotton)",
          animation: "an-marquee 32s linear infinite",
        }}
      >
        <Row />
        <Row hidden />
      </div>
      <style>{`@keyframes an-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee:hover .marquee-track { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important } }`}</style>
    </div>
  );
}
