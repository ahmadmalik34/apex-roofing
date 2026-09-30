"use client";

import { useSiteConfig } from "./SiteConfigProvider";

export default function Watermark() {
  const { watermarkEnabled, watermarkText } = useSiteConfig();

  if (!watermarkEnabled) return null;

  const items = Array.from({ length: 120 });

  return (
    <div
      aria-hidden="true"
      className="watermark-layer"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: "clamp(1.2rem, 4vw, 3.75rem) clamp(1rem, 2vw, 2.5rem)",
        padding: "clamp(1rem, 4vw, 2.5rem)",
        userSelect: "none",
      }}
    >
      {items.map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: "clamp(0.7rem, 1vw, 0.9rem)",
            fontWeight: 600,
            color: "rgba(0,0,0,0.07)",
            whiteSpace: "nowrap",
            transform: "rotate(-35deg)",
            transformOrigin: "center",
            letterSpacing: "0.04em",
          }}
        >
          {watermarkText}
        </span>
      ))}
    </div>
  );
}
