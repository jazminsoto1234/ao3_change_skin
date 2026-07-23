'use client';

// F3-5: imagen de fondo (PRD §5.2) — URL con validación de carga + controles de
// repeat/size/position + overlay para legibilidad del texto sobre la imagen.
// Los valores CSS se muestran con etiquetas humanas (PRD §12).
import { useEffect, useState } from 'react';
import { useSkinStore } from '@/store/useSkinStore';
import type { BackgroundPosition, BackgroundRepeat, BackgroundSize } from '@/types/skin';
import { ColorPicker } from './ColorPicker';
import { SizeSlider } from './SizeSlider';

const REPEAT_OPTIONS: { value: BackgroundRepeat; label: string }[] = [
  { value: 'no-repeat', label: 'No repetir' },
  { value: 'repeat', label: 'Repetir (mosaico)' },
  { value: 'repeat-x', label: 'Repetir a lo ancho' },
  { value: 'repeat-y', label: 'Repetir a lo alto' },
];
const SIZE_OPTIONS: { value: BackgroundSize; label: string }[] = [
  { value: 'auto', label: 'Tamaño original' },
  { value: 'cover', label: 'Cubrir toda la pantalla' },
  { value: 'contain', label: 'Ajustar sin recortar' },
];
const POSITION_OPTIONS: { value: BackgroundPosition; label: string }[] = [
  { value: 'center', label: 'Centro' },
  { value: 'top', label: 'Arriba' },
  { value: 'bottom', label: 'Abajo' },
  { value: 'left', label: 'Izquierda' },
  { value: 'right', label: 'Derecha' },
  { value: 'top left', label: 'Arriba a la izquierda' },
  { value: 'top right', label: 'Arriba a la derecha' },
  { value: 'bottom left', label: 'Abajo a la izquierda' },
  { value: 'bottom right', label: 'Abajo a la derecha' },
];

const fieldClass =
  'rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm text-ink shadow-sm focus:border-wine focus:outline-none';

type ImageStatus = 'idle' | 'loading' | 'ok' | 'error';

export function BackgroundImageControl() {
  const config = useSkinStore((state) => state.config);
  const updateConfig = useSkinStore((state) => state.updateConfig);
  const [urlDraft, setUrlDraft] = useState(config.backgroundImage ?? '');
  const [loadedUrl, setLoadedUrl] = useState<string | null>(config.backgroundImage ?? null);
  const [erroredUrl, setErroredUrl] = useState<string | null>(null);

  const displayStatus: ImageStatus = !urlDraft
    ? 'idle'
    : urlDraft === loadedUrl
      ? 'ok'
      : urlDraft === erroredUrl
        ? 'error'
        : 'loading';

  useEffect(() => {
    if (!urlDraft) {
      updateConfig({ backgroundImage: null });
      return;
    }

    const img = new Image();
    img.onload = () => {
      setLoadedUrl(urlDraft);
      updateConfig({ backgroundImage: urlDraft });
    };
    img.onerror = () => {
      setErroredUrl(urlDraft);
      updateConfig({ backgroundImage: null });
    };
    img.src = urlDraft;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlDraft]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5 text-sm">
        <label htmlFor="background-image-url" className="font-medium">
          Link de la imagen
        </label>
        <input
          id="background-image-url"
          type="text"
          value={urlDraft}
          onChange={(event) => setUrlDraft(event.target.value.trim())}
          placeholder="https://i.imgur.com/ejemplo.jpg"
          className={`w-full ${fieldClass}`}
        />
        {displayStatus === 'error' && (
          <p className="rounded-lg bg-red-50 px-2.5 py-2 text-xs text-red-700">
            No se pudo cargar la imagen. Necesitas un link directo a la imagen (termina en
            .jpg/.png/.gif). En Imgur: abre la imagen en su propia pestaña, click derecho →
            &quot;Copiar dirección de imagen&quot;.
          </p>
        )}
        {displayStatus === 'ok' && (
          <p className="text-xs font-medium text-green-700">✓ Imagen cargada correctamente.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label htmlFor="background-repeat" className="font-medium">
          Repetición
        </label>
        <select
          id="background-repeat"
          value={config.backgroundRepeat}
          onChange={(event) =>
            updateConfig({ backgroundRepeat: event.target.value as BackgroundRepeat })
          }
          className={fieldClass}
        >
          {REPEAT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label htmlFor="background-size" className="font-medium">
          Tamaño
        </label>
        <select
          id="background-size"
          value={config.backgroundSize}
          onChange={(event) =>
            updateConfig({ backgroundSize: event.target.value as BackgroundSize })
          }
          className={fieldClass}
        >
          {SIZE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label htmlFor="background-position" className="font-medium">
          Posición
        </label>
        <select
          id="background-position"
          value={config.backgroundPosition}
          onChange={(event) =>
            updateConfig({ backgroundPosition: event.target.value as BackgroundPosition })
          }
          className={fieldClass}
        >
          {POSITION_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <ColorPicker
        label="Capa de color encima"
        value={config.backgroundOverlayColor}
        onChange={(backgroundOverlayColor) => updateConfig({ backgroundOverlayColor })}
      />

      <SizeSlider
        label="Intensidad de la capa"
        value={config.backgroundOverlayOpacity}
        onChange={(backgroundOverlayOpacity) => updateConfig({ backgroundOverlayOpacity })}
        min={0}
        max={1}
        step={0.05}
      />
      <p className="text-xs text-soft">
        La capa de color se pone entre la imagen y el texto para que se pueda leer bien.
      </p>
    </div>
  );
}
