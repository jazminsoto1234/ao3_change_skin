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

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...strokeProps}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

// Logo de la app: trazo libre rojo en el espíritu del logo de AO3 (figura con
// brazos abiertos sobre las letras). No es el logo oficial.
export function Ao3Logo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 52C14 30 26 14 40 6c-6 14-8 30-6 46" strokeWidth="4" />
      <path d="M12 40c10-3 20-3 30 0" strokeWidth="4" />
      <circle cx="58" cy="20" r="11" strokeWidth="4" />
      <path d="M40 30c14 6 30 6 48-10" strokeWidth="4" />
      <path d="M62 40c6-3 12 0 10 5-1 3-5 4-7 4 4 0 8 2 7 6-1 5-8 6-12 3" strokeWidth="3.5" />
      <path d="M26 54c16-6 34-20 50-40" strokeWidth="3" />
    </svg>
  );
}
