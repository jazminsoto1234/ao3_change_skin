'use client';

// F3-1: primitivo de tipografía — lista predefinida. AO3 filtra @import de
// web fonts, así que solo sirven fuentes del sistema o instaladas.
import { useId } from 'react';

interface FontOption {
  label: string;
  value: string;
}

const PREDEFINED_FONTS: FontOption[] = [
  { label: 'Inter (sans-serif)', value: 'Inter, "Helvetica Neue", Arial, sans-serif' },
  { label: 'Lora (serif)', value: 'Lora, Georgia, serif' },
  { label: 'Georgia (serif)', value: 'Georgia, serif' },
  { label: 'Georgia / Times (serif)', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Times New Roman (serif)', value: '"Times New Roman", Times, serif' },
  { label: 'Verdana (sans-serif)', value: 'Verdana, sans-serif' },
  { label: 'Arial (sans-serif)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Trebuchet MS (sans-serif)', value: '"Trebuchet MS", sans-serif' },
  { label: 'Courier New (monospace)', value: '"Courier New", Courier, monospace' },
  { label: 'OpenDyslexic (accessible)', value: '"OpenDyslexic", Verdana, sans-serif' },
  {
    label: 'Atkinson Hyperlegible (accessible)',
    value: '"Atkinson Hyperlegible", Verdana, sans-serif',
  },
];

interface FontSelectorProps {
  label?: string;
  value: string;
  onChange: (fontFamily: string) => void;
}

export function FontSelector({ label = 'Font', value, onChange }: FontSelectorProps) {
  const id = useId();
  // Fuentes de templates/skins viejos que no están en la lista se muestran igual.
  const options = PREDEFINED_FONTS.some((font) => font.value === value)
    ? PREDEFINED_FONTS
    : [...PREDEFINED_FONTS, { label: value.split(',')[0].replace(/"/g, ''), value }];

  return (
    <div className="flex flex-col gap-1.5 text-[13px]">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink focus:border-ink focus:outline-none"
      >
        {options.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}
