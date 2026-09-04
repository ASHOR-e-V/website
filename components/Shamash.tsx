/**
 * Shamash — the sun disc at the centre of the Assyrian flag.
 *
 * Drawn from scratch rather than pulled from an icon set: a central disc,
 * four tapered star points on the cardinal axes, and four diagonal groups
 * of three wavy rays (the rivers of Mesopotamia). Every measurement is
 * derived from the 200×200 viewBox so the whole thing scales cleanly and
 * stays crisp at any size.
 *
 * It is the site's structural motif — used large and slowly rotating in the
 * hero, small as a section divider, and as a bullet in list contexts.
 */

type ShamashProps = {
  size?: number | string;
  /** Colour of the four cardinal star points and the central disc. */
  gold?: string;
  /** Colour of the wavy rays on the NE/SW diagonals. */
  lapis?: string;
  /** Colour of the wavy rays on the NW/SE diagonals. */
  clay?: string;
  /** Stroke weight of the wavy rays. */
  rayWidth?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Renders only the outline — used where a filled disc would be too heavy. */
  outline?: boolean;
  /**
   * Drops the wavy rays and keeps just the star and disc. Below roughly 56px
   * the three-stroke ray bundles collapse into an illegible smudge, so this
   * switches on automatically at small sizes; pass it explicitly to force
   * either form.
   */
  simple?: boolean;
};

// One wavy ray: starts just outside the disc and undulates outward.
// `q` sets the first curve, the `t` commands mirror it for a continuous wave.
const RAY = "M 30 0 q 7 -5.5 14 0 t 14 0 t 14 0 t 14 0";

// A tapered star point aimed straight up, with very slightly concave flanks
// so it reads as drawn rather than as a plain triangle.
const POINT = "M 100 10 Q 103.2 58 106 94 L 94 94 Q 96.8 58 100 10 Z";

export default function Shamash({
  size = 200,
  gold = "var(--gold-solid)",
  lapis = "var(--lapis)",
  clay = "var(--clay)",
  rayWidth = 2.1,
  opacity = 1,
  className,
  style,
  outline = false,
  simple,
}: ShamashProps) {
  const isSmall = typeof size === "number" && size < 56;
  const showRays = !(simple ?? isSmall);

  const diagonals = [
    { angle: 45, color: lapis },
    { angle: 135, color: clay },
    { angle: 225, color: lapis },
    { angle: 315, color: clay },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={{ opacity, overflow: "visible", ...style }}
      aria-hidden="true"
      focusable="false"
    >
      {/* Wavy rays on the diagonals — three per direction */}
      {showRays &&
        diagonals.map(({ angle, color }) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`} stroke={color} strokeWidth={rayWidth} strokeLinecap="round" fill="none">
            <path d={RAY} transform="translate(100 92)" />
            <path d={RAY} transform="translate(100 100)" />
            <path d={RAY} transform="translate(100 108)" />
          </g>
        ))}

      {/* Four cardinal star points */}
      {[0, 90, 180, 270].map((angle) => (
        <path
          key={angle}
          d={POINT}
          transform={`rotate(${angle} 100 100)`}
          fill={outline ? "none" : gold}
          stroke={gold}
          strokeWidth={outline ? 1.4 : 0}
          strokeLinejoin="round"
        />
      ))}

      {/* Central disc */}
      <circle cx="100" cy="100" r="17" fill={outline ? "none" : gold} stroke={gold} strokeWidth={outline ? 1.4 : 0} />
      <circle cx="100" cy="100" r="24.5" fill="none" stroke={gold} strokeWidth="1.1" opacity="0.55" />
    </svg>
  );
}

/**
 * A slim horizontal rule with the sun disc set into the middle of it —
 * used to separate major sections instead of a plain 1px border.
 */
export function ShamashDivider({ width = 26, maxWidth = 340 }: { width?: number; maxWidth?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.1rem",
        justifyContent: "center",
        maxWidth,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, var(--gold-line))" }} />
      <Shamash size={width} opacity={0.85} />
      <span style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, var(--gold-line))" }} />
    </div>
  );
}
