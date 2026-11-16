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
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <div style={{ width: 22, height: 34, background: "#f7f1e6", opacity: 0.35, borderRadius: 4 }} />
          <div style={{ width: 22, height: 54, background: "#f7f1e6", opacity: 0.7, borderRadius: 4 }} />
          <div style={{ width: 22, height: 78, background: "#b9532a", borderRadius: 4 }} />
          <div style={{ fontSize: 64, fontWeight: 700, marginLeft: 18, letterSpacing: -2 }}>
            {site.name.toLowerCase()}
          </div>
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
