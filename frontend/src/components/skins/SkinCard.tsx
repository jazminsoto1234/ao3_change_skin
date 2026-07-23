'use client';

// F6-3: una skin guardada — cargar (aplica config al editor), renombrar,
// eliminar (destructivo, con confirmación).
import { useState } from 'react';
import type { Skin } from '@/types/skin';

interface SkinCardProps {
  skin: Skin;
  onLoad: () => void;
  onRename: (name: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function SkinCard({ skin, onLoad, onRename, onDelete }: SkinCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(skin.name);
  const [busy, setBusy] = useState(false);

  const commitRename = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === skin.name) {
      setName(skin.name);
      setRenaming(false);
      return;
    }
    setBusy(true);
    await onRename(trimmed);
    setBusy(false);
    setRenaming(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${skin.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    setBusy(true);
    await onDelete();
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2 transition-colors hover:border-wine/30">
      {renaming ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void commitRename();
          }}
          className="flex flex-1 items-center gap-2"
        >
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => void commitRename()}
            className="min-w-0 flex-1 rounded-lg border border-line px-2 py-1 text-sm outline-none focus:border-wine"
          />
        </form>
      ) : (
        <span className="min-w-0 flex-1 truncate text-sm">{skin.name}</span>
      )}

      <div className="flex shrink-0 items-center gap-1 text-xs">
        <button
          type="button"
          onClick={onLoad}
          disabled={busy}
          className="rounded-lg px-2 py-1 font-medium text-wine hover:bg-blush"
        >
          Cargar
        </button>
        {!renaming && (
          <button
            type="button"
            onClick={() => setRenaming(true)}
            disabled={busy}
            className="rounded-lg px-2 py-1 font-medium text-soft hover:bg-blush hover:text-ink"
          >
            Renombrar
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          className="rounded-lg px-2 py-1 font-medium text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
