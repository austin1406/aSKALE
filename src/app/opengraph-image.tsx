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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Measuring A mark */}
          <svg width="104" height="104" viewBox="0 0 120 120">
            <rect x="38" y="76" width="44" height="12" fill="#f7f1e6"/><path d="M60 14 L60 56 L40 106 H22 Z" fill="#f7f1e6"/><path d="M60 14 L98 106 H80 L60 56 Z" fill="#b9532a"/><line x1="70.66" y1="41.91" x2="63.54" y2="44.84" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="73.24" y1="48.16" x2="69.36" y2="49.76" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="75.83" y1="54.42" x2="71.95" y2="56.02" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="78.41" y1="60.67" x2="71.30" y2="63.61" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="81.00" y1="66.93" x2="77.11" y2="68.53" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="83.58" y1="73.19" x2="79.70" y2="74.79" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="86.16" y1="79.44" x2="79.05" y2="82.38" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="88.75" y1="85.70" x2="84.87" y2="87.30" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="91.33" y1="91.95" x2="87.45" y2="93.56" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/><line x1="93.92" y1="98.21" x2="86.80" y2="101.15" stroke="#241c15" strokeWidth="2" strokeLinecap="round"/>
          </svg>
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
