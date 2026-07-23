// Set de íconos de línea propio del editor: trazo uniforme (1.7, puntas
// redondeadas) y currentColor, para reemplazar los emojis del sistema y que
// todas las secciones compartan el mismo lenguaje visual.
interface IconProps {
  className?: string;
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M12 21a9 9 0 1 1 9-9c0 1.9-1.3 3.1-3.1 3.1h-2.1a2.3 2.3 0 0 0-1.7 3.9c.8.9.2 2-2.1 2Z" />
      <circle cx="8" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="16" cy="10.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function TypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M5 7V4.5h14V7" />
      <path d="M12 4.5v15" />
      <path d="M9 19.5h6" />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M7.5 4.5h9A2.5 2.5 0 0 1 19 7v.5" />
      <rect x="4" y="7.5" width="14" height="12" rx="2.2" />
      <path d="M4 12.5h14" />
    </svg>
  );
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.4" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M4.5 17.5 9 13l3 3 3.5-3.5 4 4" />
    </svg>
  );
}

export function SlidersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M4 7h9M17 7h3" />
      <circle cx="15" cy="7" r="2" />
      <path d="M4 12h3M11 12h9" />
      <circle cx="9" cy="12" r="2" />
      <path d="M4 17h11M19 17h1" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function BookmarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M7 4h10a1.5 1.5 0 0 1 1.5 1.5V20L12 15.8 5.5 20V5.5A1.5 1.5 0 0 1 7 4Z" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M12 20.2S4.8 15.6 3.3 11A4.9 4.9 0 0 1 12 7.4 4.9 4.9 0 0 1 20.7 11c-1.5 4.6-8.7 9.2-8.7 9.2Z" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}
