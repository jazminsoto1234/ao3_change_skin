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
      setErrorMessage("We couldn't send the link. Please try again in a few minutes.");
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
        aria-label="Log in"
        className="w-full max-w-sm rounded-xl border border-line bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-serif text-xl font-semibold">Log in to save your skins</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-soft hover:text-ink"
          >
            ✕
          </button>
        </div>

        {status === 'sent' ? (
          <p className="rounded-md bg-canvas px-3 py-2.5 text-sm text-ink">
            Check your inbox — we sent a magic link to <strong>{email}</strong>.
            Open it on this same device to log in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-sm text-soft">
              With an account you can keep your skins and come back to them
              anytime. No passwords — we email you a link.
            </p>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-10 rounded-md border border-line px-3 text-sm font-normal outline-none focus:border-ink"
              />
            </label>
            {status === 'error' && (
              <p className="text-sm text-red-700">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="h-10 rounded-md bg-ao3 px-3 text-sm font-semibold text-white transition-colors hover:bg-ao3dark disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Email me a magic link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
