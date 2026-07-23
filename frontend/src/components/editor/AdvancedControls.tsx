'use client';

// F3-3: controles del modo avanzado (PRD §5.1) — solo visible con
// config.mode === 'advanced'. Agrupados en secciones plegables propias.
import { useSkinStore } from '@/store/useSkinStore';
import type { BlurbBorderStyle } from '@/types/skin';
import { Section } from '@/components/ui/Section';
import { ImageIcon, SlidersIcon } from '@/components/ui/icons';
import { BackgroundImageControl } from './BackgroundImageControl';
import { ColorPicker } from './ColorPicker';
import { SizeSlider } from './SizeSlider';

// Etiquetas humanas para valores CSS — el usuario no debería tener que saber
// qué significa "dashed" (PRD §12).
const BLURB_BORDER_STYLES: { value: BlurbBorderStyle; label: string }[] = [
  { value: 'none', label: 'Sin borde' },
  { value: 'solid', label: 'Línea continua' },
  { value: 'dashed', label: 'Línea de guiones' },
  { value: 'dotted', label: 'Puntitos' },
];

const fieldClass =
  'rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm text-ink shadow-sm focus:border-wine focus:outline-none';

export function AdvancedControls() {
  const config = useSkinStore((state) => state.config);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  if (config.mode !== 'advanced') return null;

  return (
    <>
      <Section
        icon={<ImageIcon />}
        title="Imagen de fondo"
        hint="Pon una foto o textura detrás de todo"
      >
        <BackgroundImageControl />
      </Section>

      <Section
        icon={<SlidersIcon />}
        title="Ajustes finos"
        hint="Espaciado y bordes"
      >
        <SizeSlider
          label="Espacio entre líneas"
          value={config.lineHeight}
          onChange={(lineHeight) => updateConfig({ lineHeight })}
          min={1}
          max={2.5}
          step={0.1}
        />

        <SizeSlider
          label="Ancho del texto"
          value={config.maxWidth}
          onChange={(maxWidth) => updateConfig({ maxWidth })}
          min={40}
          max={120}
          unit="ch"
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <label htmlFor="blurb-border-style" className="font-medium">
            Borde de las tarjetas
          </label>
          <select
            id="blurb-border-style"
            value={config.blurbBorderStyle}
            onChange={(event) =>
              updateConfig({ blurbBorderStyle: event.target.value as BlurbBorderStyle })
            }
            className={fieldClass}
          >
            {BLURB_BORDER_STYLES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <ColorPicker
          label="Color del borde"
          value={config.blurbBorderColor}
          onChange={(blurbBorderColor) => updateConfig({ blurbBorderColor })}
        />

        <SizeSlider
          label="Grosor del borde"
          value={config.blurbBorderWidth}
          onChange={(blurbBorderWidth) => updateConfig({ blurbBorderWidth })}
          min={0}
          max={10}
          unit="px"
        />
      </Section>
    </>
  );
}
