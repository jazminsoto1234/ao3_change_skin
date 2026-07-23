'use client';

// F3-1: primitivo de color — swatch + valor hex visible + popover con
// HexColorPicker/HexColorInput. Mostrar el hex junto al swatch da feedback
// inmediato de qué color está elegido sin abrir el popover.
import { useEffect, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={`Elegir color para ${label}`}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface py-1 pl-1 pr-2 shadow-sm transition-colors hover:border-wine/40"
        >
          <span
            aria-hidden
            className="h-6 w-6 rounded-md border border-black/10"
            style={{ backgroundColor: value }}
          />
          <span className="font-mono text-xs uppercase text-soft">{value}</span>
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-10 mt-2 flex flex-col gap-2 rounded-xl border border-line bg-surface p-3 shadow-lg">
          <HexColorPicker color={value} onChange={onChange} />
          <HexColorInput
            color={value}
            onChange={onChange}
            prefixed
            className="w-full rounded-lg border border-line bg-surface px-2 py-1 font-mono text-sm uppercase focus:border-wine focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
