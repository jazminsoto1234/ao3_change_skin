'use client';

// F3-1: slider genérico reutilizable (fontSize, lineHeight, maxWidth, blurbBorderWidth, etc.)
import { useId } from 'react';

interface SizeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SizeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: SizeSliderProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1.5 text-[13px]">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
        <span className="rounded bg-canvas px-2 py-0.5 font-mono text-xs text-ink">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  );
}
