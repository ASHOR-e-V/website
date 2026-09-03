import type { CSSProperties } from "react";

type IconProps = { size?: number; style?: CSSProperties; className?: string };

export function HeartIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8.1 1.8 4.5 5.3 3.6c2.1-.5 4.2.4 5.4 2.1l1.3 1.8 1.3-1.8c1.2-1.7 3.3-2.6 5.4-2.1 3.5.9 4.9 4.5 3.3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}

export function MoonIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z" />
    </svg>
  );
}

export function SunIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
    </svg>
  );
}

export function CheckIcon({ size = 22, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 12.3l2.6 2.6 5.4-5.6" />
    </svg>
  );
}

export function DotIcon({ size = 5, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="currentColor" style={style} className={className} aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
