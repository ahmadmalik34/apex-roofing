"use client";

import { useSiteConfig } from "./SiteConfigProvider";

export default function Watermark() {
  const { watermarkEnabled, watermarkText } = useSiteConfig();

  if (!watermarkEnabled) return null;

  // Build a grid of repeated text across the whole viewport
  const items = Array.from({ length: 120 });

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "60px 40px",
        padding: "40px",
        userSelect: "none",
      }}
    >
      {items.map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: "13px",
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
