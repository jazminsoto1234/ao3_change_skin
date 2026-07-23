// Sección plegable del panel de controles (patrón de divulgación progresiva):
// cada grupo de opciones vive en su propia tarjeta con ícono, título y pista,
// para que el usuario no técnico vea pocas cosas a la vez.
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Section({ icon, title, hint, defaultOpen = false, children }: SectionProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-line bg-surface shadow-sm"
    >
      {/* Sin overflow-hidden en el contenedor: los popovers absolutos de los
          ColorPicker hijos deben poder sobresalir de la tarjeta. */}
      <summary className="flex cursor-pointer select-none items-center gap-3 rounded-2xl px-4 py-3 transition-colors [&::-webkit-details-marker]:hidden hover:bg-blush/60 group-open:rounded-b-none list-none">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blush text-wine [&>svg]:h-[18px] [&>svg]:w-[18px]"
        >
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-semibold text-ink">{title}</span>
          {hint && <span className="text-xs text-soft">{hint}</span>}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0 text-soft transition-transform group-open:rotate-180"
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="flex flex-col gap-4 border-t border-line px-4 pb-4 pt-4">{children}</div>
    </details>
  );
}
