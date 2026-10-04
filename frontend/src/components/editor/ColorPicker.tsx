'use client';

// F3-1: primitivo de color — swatch + hex visible; al abrirlo el picker se
// despliega en línea (no flotante) para convivir con el scroll de la nube.
import { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="font-medium">{label}</span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Pick a color for ${label}`}
          className="flex items-center gap-2 rounded-md border border-line bg-surface py-1 pl-1 pr-2 transition-colors hover:border-ink/40"
        >
          <span
            aria-hidden
            className="h-6 w-6 rounded border border-black/10"
            style={{ backgroundColor: value }}
          />
          <span className="font-mono text-xs uppercase text-soft">{value}</span>
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 rounded-lg border border-line bg-canvas p-2.5 [&_.react-colorful]:w-full">
          <HexColorPicker color={value} onChange={onChange} />
          <HexColorInput
            color={value}
            onChange={onChange}
            prefixed
            className="w-full rounded-md border border-line bg-surface px-2 py-1 font-mono text-sm uppercase focus:border-ink focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
