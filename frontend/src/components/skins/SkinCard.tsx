'use client';

// F6-3: una skin guardada. Edit la carga en el editor; Delete pide una
// segunda confirmación en el mismo botón; − / + pliegan o despliegan el
// detalle (colores y fuente) de la tarjeta.
import { useState } from 'react';
import type { Skin } from '@/types/skin';
import { ColorDots } from '@/components/ui/ColorDots';
import { Button } from '@/components/ui/Button';
import { lastUpdatedLabel, skinColors } from './skinMeta';

interface SkinCardProps {
  skin: Skin;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

export function SkinCard({ skin, selected, onSelect, onEdit, onDelete }: SkinCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const { config } = skin;

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setBusy(true);
    await onDelete();
  };

  const details = [
    { label: 'Background', color: config.backgroundColor },
    { label: 'Text', color: config.textColor },
    { label: 'Links', color: config.linkColor },
    { label: 'Borders', color: config.blurbBorderColor },
  ];

  return (
    <article
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border bg-surface px-6 pb-6 pt-6 shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-colors ${
        selected ? 'border-ink/40' : 'border-line hover:border-ink/25'
      }`}
    >
      <div className="flex items-center gap-4">
        <ColorDots colors={skinColors(config)} size={30} overlap ringClassName="border-white" />
        <div className="min-w-0">
          <h2 className="truncate font-serif text-lg font-semibold">{skin.name}</h2>
          <p className="truncate text-[13px] text-soft">{lastUpdatedLabel(skin)}</p>
        </div>
      </div>

      {expanded && (
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg bg-canvas px-4 py-3 text-[13px] sm:grid-cols-3">
          {details.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-4 w-4 rounded-full border border-black/15"
                style={{ backgroundColor: color }}
              />
              <dt className="text-soft">{label}</dt>
            </div>
          ))}
          <div className="col-span-2 flex gap-2 sm:col-span-3">
            <dt className="text-soft">Font:</dt>
            <dd className="truncate">{config.fontFamily.split(',')[0].replace(/"/g, '')}</dd>
          </div>
        </dl>
      )}

      <div className="mt-4 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
        <Button variant="outline" onClick={onEdit} disabled={busy} className="h-[38px] px-4">
          Edit
        </Button>
        <Button
          variant={confirming ? 'red' : 'outline'}
          onClick={() => void handleDelete()}
          onBlur={() => setConfirming(false)}
          disabled={busy}
          className="h-[38px] px-4"
        >
          {confirming ? 'Confirm delete' : 'Delete'}
        </Button>
        <Button
          variant="red"
          size="square"
          aria-label="Collapse"
          disabled={!expanded}
          onClick={() => setExpanded(false)}
        >
          −
        </Button>
        <Button
          variant="dark"
          size="square"
          aria-label="Expand"
          disabled={expanded}
          onClick={() => setExpanded(true)}
        >
          +
        </Button>
      </div>
    </article>
  );
}
