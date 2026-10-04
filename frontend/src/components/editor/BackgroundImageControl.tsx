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
  { value: 'no-repeat', label: 'No repeat' },
  { value: 'repeat', label: 'Tile' },
  { value: 'repeat-x', label: 'Repeat horizontally' },
  { value: 'repeat-y', label: 'Repeat vertically' },
];
const SIZE_OPTIONS: { value: BackgroundSize; label: string }[] = [
  { value: 'auto', label: 'Original size' },
  { value: 'cover', label: 'Cover the screen' },
  { value: 'contain', label: 'Fit without cropping' },
];
const POSITION_OPTIONS: { value: BackgroundPosition; label: string }[] = [
  { value: 'center', label: 'Center' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'top left', label: 'Top left' },
  { value: 'top right', label: 'Top right' },
  { value: 'bottom left', label: 'Bottom left' },
  { value: 'bottom right', label: 'Bottom right' },
];

const fieldClass =
  'rounded-md border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink focus:border-ink focus:outline-none';

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
      <div className="flex flex-col gap-1.5 text-[13px]">
        <label htmlFor="background-image-url" className="font-medium">
          Image link
        </label>
        <input
          id="background-image-url"
          type="text"
          value={urlDraft}
          onChange={(event) => setUrlDraft(event.target.value.trim())}
          placeholder="https://i.imgur.com/example.jpg"
          className={`w-full ${fieldClass}`}
        />
        {displayStatus === 'error' && (
          <p className="rounded-md bg-red-50 px-2.5 py-2 text-xs text-red-700">
            Couldn&apos;t load the image. You need a direct image link (ending in
            .jpg/.png/.gif). On Imgur: open the image in its own tab, right click →
            &quot;Copy image address&quot;.
          </p>
        )}
        {displayStatus === 'ok' && (
          <p className="text-xs font-medium text-green-700">✓ Image loaded.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 text-[13px]">
        <label htmlFor="background-repeat" className="font-medium">
          Repeat
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

      <div className="flex items-center justify-between gap-3 text-[13px]">
        <label htmlFor="background-size" className="font-medium">
          Size
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

      <div className="flex items-center justify-between gap-3 text-[13px]">
        <label htmlFor="background-position" className="font-medium">
          Position
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
        label="Color overlay"
        value={config.backgroundOverlayColor}
        onChange={(backgroundOverlayColor) => updateConfig({ backgroundOverlayColor })}
      />

      <SizeSlider
        label="Overlay strength"
        value={config.backgroundOverlayOpacity}
        onChange={(backgroundOverlayOpacity) => updateConfig({ backgroundOverlayOpacity })}
        min={0}
        max={1}
        step={0.05}
      />
      <p className="text-xs text-soft">
        The overlay sits between the image and the text so it stays readable.
      </p>
    </div>
  );
}
