'use client';

// La "nube" de edición: aparece pegada a la zona clickeada del preview, con
// flecha hacia ella, y muestra solo los controles de esa zona.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { REGION_LABELS, type EditRegion } from '@/lib/editRegions';
import { useSkinStore } from '@/store/useSkinStore';
import type { SkinConfig } from '@/types/skin';
import { CloseIcon } from '@/components/ui/icons';
import { REGION_FIELDS, RegionControls } from '@/components/editor/RegionControls';

export interface AnchorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface EditPopoverProps {
  region: EditRegion;
  anchor: AnchorRect;
  onClose: () => void;
}

const WIDTH = 312;
const GAP = 12;
const MARGIN = 12;
const PREFERRED_HEIGHT = 360;

export function EditPopover({ region, anchor, onClose }: EditPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const baseline = useSkinStore((state) => state.baseline);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!viewport.width) return null;

  const spaceBelow = viewport.height - (anchor.top + anchor.height) - GAP - MARGIN;
  const spaceAbove = anchor.top - GAP - MARGIN;
  const placeBelow = spaceBelow >= PREFERRED_HEIGHT || spaceBelow >= spaceAbove;
  const maxHeight = Math.max(200, placeBelow ? spaceBelow : spaceAbove);

  const centerX = anchor.left + anchor.width / 2;
  const left = Math.min(
    Math.max(centerX - WIDTH / 2, MARGIN),
    Math.max(MARGIN, viewport.width - WIDTH - MARGIN)
  );
  const arrowLeft = Math.min(Math.max(centerX - left, 20), WIDTH - 20);

  const position = placeBelow
    ? { top: anchor.top + anchor.height + GAP }
    : { bottom: viewport.height - anchor.top + GAP };

  const reset = () => {
    const fields = REGION_FIELDS[region];
    updateConfig(
      Object.fromEntries(fields.map((field) => [field, baseline[field]])) as Partial<SkinConfig>
    );
  };

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={`Edit ${REGION_LABELS[region]}`}
      className="fixed z-50"
      style={{ left, width: WIDTH, ...position }}
    >
      <span
        aria-hidden
        className={`absolute h-3.5 w-3.5 rotate-45 border-line bg-surface ${
          placeBelow ? '-top-[7px] border-l border-t' : '-bottom-[7px] border-b border-r'
        }`}
        style={{ left: arrowLeft - 7 }}
      />
      <div
        className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)]"
        style={{ maxHeight }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-4 pb-3 pt-3.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-soft">Editing</p>
            <h3 className="font-serif text-lg font-semibold leading-tight">{REGION_LABELS[region]}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-7 w-7 place-items-center rounded-full text-soft hover:bg-canvas hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col gap-3.5 overflow-y-auto px-4 py-4">
          <RegionControls region={region} />
        </div>
        <div className="border-t border-line px-4 py-2.5">
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold text-ao3 hover:underline"
          >
            Reset this section
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
