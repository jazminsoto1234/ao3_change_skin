'use client';

// F6-4: guardar desde el editor. Sin sesión abre AuthModal (el draft vive en
// localStorage, sobrevive al login). Si el config salió de un skin guardado
// lo actualiza; si no, pide un nombre y crea uno nuevo.
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSkins } from '@/hooks/useSkins';
import { useSkinStore } from '@/store/useSkinStore';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/Button';

type Feedback = 'idle' | 'saving' | 'saved' | 'error';

export function SaveSkinButton() {
  const { user } = useAuth();
  const { createSkin, updateSkin } = useSkins();
  const config = useSkinStore((state) => state.config);
  const source = useSkinStore((state) => state.source);
  const markSaved = useSkinStore((state) => state.markSaved);
  const [authOpen, setAuthOpen] = useState(false);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const finish = (ok: boolean) => {
    setFeedback(ok ? 'saved' : 'error');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback('idle'), 1500);
  };

  const handleClick = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    if (source?.kind === 'skin') {
      setFeedback('saving');
      const skin = await updateSkin(source.id, { config });
      if (skin) markSaved(skin);
      finish(!!skin);
      return;
    }
    setNaming(true);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setNaming(false);
    setFeedback('saving');
    const skin = await createSkin({ name: trimmed, config });
    if (skin) markSaved(skin);
    setName('');
    finish(!!skin);
  };

  const label = {
    idle: 'Save skin',
    saving: 'Saving…',
    saved: 'Saved!',
    error: 'Could not save',
  }[feedback];

  return (
    <>
      <Button
        variant="dark"
        size="sm"
        className="h-8 px-3 text-xs"
        onClick={() => void handleClick()}
        disabled={feedback === 'saving'}
      >
        {label}
      </Button>

      {naming && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setNaming(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-label="Name your skin"
            onSubmit={handleCreate}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-line bg-surface p-6 shadow-xl"
          >
            <h2 className="font-serif text-xl font-semibold">Name your skin</h2>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Burgundy Reading Room"
              className="h-10 rounded-md border border-line px-3 text-sm outline-none focus:border-ink"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNaming(false)}>
                Cancel
              </Button>
              <Button variant="red" type="submit" disabled={!name.trim()}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
