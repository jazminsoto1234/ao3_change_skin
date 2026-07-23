'use client';

// F6-1: modal de magic link — sin passwords, sin OAuth social (PRD §5.6).
// Copy invita, no presiona (PRD §12): explica el beneficio de guardar skins,
// no bloquea el uso del editor sin cuenta.
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!open) return null;

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await signInWithMagicLink(email);
    if (error) {
      setStatus('error');
      setErrorMessage('No pudimos enviar el enlace. Intenta de nuevo en unos minutos.');
      return;
    }
    setStatus('sent');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Iniciar sesión"
        className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-xl bg-blush text-lg">
              💌
            </span>
            <h2 className="text-base font-bold">Guarda tus skins</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar"
            className="text-soft hover:text-ink"
          >
            ✕
          </button>
        </div>

        {status === 'sent' ? (
          <p className="rounded-xl bg-blush/60 px-3 py-2.5 text-sm text-ink">
            Revisa tu correo — te enviamos un enlace mágico a <strong>{email}</strong>.
            Ábrelo desde este mismo dispositivo para iniciar sesión.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-sm text-soft">
              Con una cuenta puedes guardar tus skins y volver a ellas cuando
              quieras. Sin contraseñas — te enviamos un enlace por correo.
            </p>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Correo electrónico
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="rounded-lg border border-line px-3 py-2 text-sm font-normal outline-none focus:border-wine"
              />
            </label>
            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-xl bg-wine px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-wine/20 transition-colors hover:bg-winedark disabled:opacity-50"
            >
              {status === 'sending' ? 'Enviando…' : '💌 Enviar enlace mágico'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
