import { ImageResponse } from "next/og";

import { site } from "@/site.config";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card: wordmark, tagline and the ruler motif.
export default function OpengraphImage() {
  const ticks = Array.from({ length: 66 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#241c15",
          color: "#f7f1e6",
          padding: "72px 80px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* Ruler A mark */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#f7f1e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="72" height="72" viewBox="0 0 120 120">
              <path d="M60 16 L96 104 H79 L60 54 L41 104 H24 Z" fill="#241c15" />
              <rect x="30" y="68" width="60" height="13" rx="2.5" fill="#b9532a" />
            </svg>
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>{site.name.toLowerCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            Ask. Then scale.
          </div>
          <div style={{ fontSize: 30, opacity: 0.65, marginTop: 20 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 30 }}>
          {ticks.map((_, i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: i % 5 === 0 ? 30 : 14,
                background: i === 65 ? "#b9532a" : "#f7f1e6",
                opacity: i === 65 ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
