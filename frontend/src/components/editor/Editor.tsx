'use client';

// F3-7: pantalla del editor — presets a la izquierda, preview interactivo a
// la derecha (click en cualquier zona abre la nube de edición).
import { generateCSS } from '@/lib/cssGenerator';
import { isDirty, useSkinStore } from '@/store/useSkinStore';
import { useCopy } from '@/hooks/useCopy';
import { EditorTopBar } from '@/components/layout/EditorTopBar';
import { Preview } from '@/components/preview/Preview';
import { SegmentedToggle } from '@/components/ui/SegmentedToggle';
import { Button } from '@/components/ui/Button';
import { WallpaperSidebar } from './WallpaperSidebar';
import { SaveSkinButton } from './SaveSkinButton';

function PreviewToolbar() {
  const dirty = useSkinStore(isDirty);
  const source = useSkinStore((state) => state.source);
  const config = useSkinStore((state) => state.config);
  const { copied, copy } = useCopy();

  const status = dirty ? 'Unsaved changes' : source?.kind === 'skin' ? `Saved · ${source.name}` : '';

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pb-2">
      <p className="text-xs font-semibold uppercase tracking-wide">
        Live preview · Click any element to edit
      </p>
      <div className="flex items-center gap-2">
        {status && <span className="mr-1 text-xs text-soft">{status}</span>}
        <Button
          variant={copied ? 'red' : 'outline'}
          size="sm"
          className="h-8 px-3 text-xs"
          onClick={() => void copy(generateCSS(config))}
        >
          {copied ? 'Copied!' : 'Copy CSS'}
        </Button>
        <SaveSkinButton />
      </div>
    </div>
  );
}

export function Editor() {
  const showSkin = useSkinStore((state) => state.showSkin);
  const setShowSkin = useSkinStore((state) => state.setShowSkin);

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-line bg-surface">
        <EditorTopBar />
        <div className="flex flex-wrap items-end justify-between gap-3 px-4 pb-3">
          <div>
            <h1 className="font-serif text-[26px] font-bold leading-tight">Skin editor</h1>
            <p className="text-[13px] text-soft">
              Choose a preset, then click anything in the preview to style it.
            </p>
          </div>
          <SegmentedToggle
            label="Compare preview"
            value={showSkin}
            onChange={setShowSkin}
            options={[
              { value: false, label: 'Original AO3' },
              { value: true, label: 'With my skin' },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="w-full lg:w-[275px] lg:shrink-0">
          <WallpaperSidebar />
        </aside>
        <section className="min-w-0 flex-1">
          <PreviewToolbar />
          <Preview />
        </section>
      </div>
    </div>
  );
}
