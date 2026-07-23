'use client';

// F3-1: primitivo de tipografía — modo básico, lista predefinida.
// El modo avanzado (F3-3) añade búsqueda libre de Google Fonts.
interface FontOption {
  label: string;
  value: string;
}

const PREDEFINED_FONTS: FontOption[] = [
  { label: 'Georgia (serif)', value: 'Georgia, serif' },
  { label: 'Times New Roman (serif)', value: '"Times New Roman", Times, serif' },
  { label: 'Verdana (sans-serif)', value: 'Verdana, sans-serif' },
  { label: 'Arial (sans-serif)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Trebuchet MS (sans-serif)', value: '"Trebuchet MS", sans-serif' },
  { label: 'Courier New (monospace)', value: '"Courier New", Courier, monospace' },
  { label: 'OpenDyslexic (accesible)', value: '"OpenDyslexic", Verdana, sans-serif' },
  {
    label: 'Atkinson Hyperlegible (accesible)',
    value: '"Atkinson Hyperlegible", Verdana, sans-serif',
  },
];

interface FontSelectorProps {
  value: string;
  onChange: (fontFamily: string) => void;
}

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <label htmlFor="font-selector" className="font-medium">
        Tipo de letra
      </label>
      <select
        id="font-selector"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm text-ink shadow-sm focus:border-wine focus:outline-none"
      >
        {PREDEFINED_FONTS.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}
