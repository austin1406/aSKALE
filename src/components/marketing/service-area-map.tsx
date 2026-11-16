/**
 * Hand-drawn style map of the service area (approximate positions, north Dallas).
 * Places come from site.config.ts areaServed; this layout is specific to DFW.
 */
const places = [
  { name: "Plano", x: 301, y: 34 },
  { name: "Addison", x: 170, y: 89 },
  { name: "Carrollton", x: 108, y: 96 },
  { name: "Richardson", x: 270, y: 104, home: true },
  { name: "Garland", x: 352, y: 140 },
  { name: "Las Colinas", x: 62, y: 168 },
  { name: "Irving", x: 52, y: 236, home: true },
  { name: "Dallas", x: 205, y: 262 },
];

export function ServiceAreaMap() {
  return (
    <svg
      viewBox="0 0 420 300"
      role="img"
      aria-label="Map of the service area around Richardson and Irving, Texas"
      className="h-auto w-full"
    >
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="currentColor" opacity="0.14" />
        </pattern>
      </defs>
      <rect width="420" height="300" fill="url(#dots)" />

      {/* Rough lines for I-635 (east-west) and US-75 (north-south). */}
      <path d="M20 118 C 120 104, 220 98, 410 112" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M296 10 C 280 90, 250 180, 214 296" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <text x="392" y="106" fontSize="9" fontFamily="var(--font-geist-mono)" fill="currentColor" opacity="0.4">635</text>
      <text x="300" y="22" fontSize="9" fontFamily="var(--font-geist-mono)" fill="currentColor" opacity="0.4">75</text>

      {/* Service radius between the two home bases. */}
      <ellipse cx="160" cy="168" rx="190" ry="118" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />

      {places.map((p) =>
        p.home ? (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="14" fill="var(--accent)" fillOpacity="0.15" />
            <circle cx={p.x} cy={p.y} r="5" fill="var(--accent)" />
            <text x={p.x + 12} y={p.y - 10} fontSize="22" fontFamily="var(--font-caveat)" fill="var(--accent)">
              {p.name}
            </text>
          </g>
        ) : (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="3" fill="currentColor" opacity="0.45" />
            <text x={p.x + 8} y={p.y + 4} fontSize="11" fill="currentColor" opacity="0.55">
              {p.name}
            </text>
          </g>
        ),
      )}
    </svg>
  );
}
