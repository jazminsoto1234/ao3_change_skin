'use client';

// F3-2: controles del modo básico (PRD §5.1) — siempre visibles, en ambos modos.
// Divididos en dos grupos (colores / tipografía) para que el ControlPanel los
// muestre en secciones separadas.
import { useSkinStore } from '@/store/useSkinStore';
import { ColorPicker } from './ColorPicker';
import { FontSelector } from './FontSelector';
import { SizeSlider } from './SizeSlider';

export function ColorControls() {
  const config = useSkinStore((state) => state.config);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  return (
    <div className="flex flex-col gap-3">
      <ColorPicker
        label="Fondo de la página"
        value={config.backgroundColor}
        onChange={(backgroundColor) => updateConfig({ backgroundColor })}
      />
      <ColorPicker
        label="Texto"
        value={config.textColor}
        onChange={(textColor) => updateConfig({ textColor })}
      />
      <ColorPicker
        label="Enlaces"
        value={config.linkColor}
        onChange={(linkColor) => updateConfig({ linkColor })}
      />
      <ColorPicker
        label="Barra superior"
        value={config.headerBgColor}
        onChange={(headerBgColor) => updateConfig({ headerBgColor })}
      />
    </div>
  );
}

export function TypographyControls() {
  const config = useSkinStore((state) => state.config);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  return (
    <div className="flex flex-col gap-4">
      <FontSelector
        value={config.fontFamily}
        onChange={(fontFamily) => updateConfig({ fontFamily })}
      />
      <SizeSlider
        label="Tamaño de letra"
        value={config.fontSize}
        onChange={(fontSize) => updateConfig({ fontSize })}
        min={12}
        max={24}
        unit="px"
      />
    </div>
  );
}
