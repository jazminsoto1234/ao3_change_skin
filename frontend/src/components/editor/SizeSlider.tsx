'use client';

// F3-1: slider genérico reutilizable (fontSize, lineHeight, maxWidth, blurbBorderWidth, etc.)
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
  const inputId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
        <span className="rounded-md bg-blush px-2 py-0.5 font-mono text-xs text-wine">
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
