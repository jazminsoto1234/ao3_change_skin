'use client';

// F6-4: botón "Guardar" del editor. Sin sesión abre AuthModal primero; con
// sesión pide nombre y llama a createSkin. El draft se preserva durante el
// login porque ya vive en localStorage (B5-2 en task.md) — nada extra que hacer.
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSkins } from '@/hooks/useSkins';
import { useSkinStore } from '@/store/useSkinStore';
import { AuthModal } from '@/components/auth/AuthModal';
import { BookmarkIcon, CheckIcon } from '@/components/ui/icons';

type Feedback = 'idle' | 'saving' | 'saved' | 'error';

export function SaveSkinButton() {
  const { user } = useAuth();
  const { createSkin } = useSkins();
  const config = useSkinStore((state) => state.config);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSave = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const name = window.prompt('Nombre para tu skin:')?.trim();
    if (!name) return;

    setFeedback('saving');
    const skin = await createSkin({ name, config });
    setFeedback(skin ? 'saved' : 'error');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback('idle'), 1500);
  };

  const label = {
    idle: 'Guardar mi skin',
    saving: 'Guardando…',
    saved: '¡Guardado!',
    error: 'No se pudo guardar',
  }[feedback];

  return (
    <>
      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={feedback === 'saving'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-wine/30 bg-surface px-3 py-3 text-sm font-semibold text-wine shadow-sm transition-colors hover:bg-blush disabled:opacity-50"
      >
        {feedback === 'saved' ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <BookmarkIcon className="h-4 w-4" />
        )}
        {label}
      </button>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
