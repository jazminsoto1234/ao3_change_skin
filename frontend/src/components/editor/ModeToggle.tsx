'use client';

// F3-4: toggle básico/avanzado — solo cambia config.mode vía updateConfig (merge
// parcial), nunca resetea ni pierde el resto de los valores ya configurados
import { useSkinStore } from '@/store/useSkinStore';
import type { SkinMode } from '@/types/skin';

const MODES: { value: SkinMode; label: string }[] = [
  { value: 'basic', label: 'Básico' },
  { value: 'advanced', label: 'Avanzado' },
];

export function ModeToggle() {
  const mode = useSkinStore((state) => state.config.mode);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  return (
    <div
      role="tablist"
      aria-label="Modo del editor"
      className="inline-flex rounded-full border border-line bg-blush p-0.5"
    >
      {MODES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={mode === value}
          onClick={() => updateConfig({ mode: value })}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            mode === value
              ? 'bg-wine text-white shadow-sm'
              : 'text-soft hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
