import type { CSSProperties } from "react";

type IconProps = { size?: number; style?: CSSProperties; className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HeartIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8.1 1.8 4.5 5.3 3.6c2.1-.5 4.2.4 5.4 2.1l1.3 1.8 1.3-1.8c1.2-1.7 3.3-2.6 5.4-2.1 3.5.9 4.9 4.5 3.3 7.6-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}

export function MoonIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z" />
    </svg>
  );
}

export function SunIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
    </svg>
  );
}

export function CheckIcon({ size = 22, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
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

export function DownloadIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="M12 3.5v11.2M7.6 10.6 12 15l4.4-4.4" />
      <path d="M4 16.5v2.2a1.8 1.8 0 0 0 1.8 1.8h12.4a1.8 1.8 0 0 0 1.8-1.8v-2.2" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="M4.5 12h14M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}

export function MailIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.2" />
      <path d="m3.4 7 8.6 6 8.6-6" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="M14.4 3.2v10.9a3.7 3.7 0 1 1-3.7-3.7c.32 0 .63.04.93.12" />
      <path d="M14.4 3.2a5.1 5.1 0 0 0 5.1 5.1" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 13, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <path d="m5.5 9 6.5 6.5L18.5 9" />
    </svg>
  );
}

export function UserPlusIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={style} className={className} aria-hidden="true">
      <circle cx="9.5" cy="8" r="3.8" />
      <path d="M2.8 20.2a6.9 6.9 0 0 1 13.4 0M18.6 7.4v5.2M21.2 10h-5.2" />
    </svg>
  );
}
