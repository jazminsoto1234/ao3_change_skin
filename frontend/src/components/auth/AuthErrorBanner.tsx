'use client';

// F6-2: mensaje humano cuando /auth/callback redirige con ?auth_error=1
// (ver app/auth/callback/route.ts). Dismissible, no bloquea el resto de la app.
import { useState } from 'react';

interface AuthErrorBannerProps {
  show: boolean;
}

export function AuthErrorBanner({ show }: AuthErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!show || dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-800">
      <span>
        No pudimos completar tu inicio de sesión. El enlace puede haber
        expirado o ya haberse usado — intenta enviarte uno nuevo.
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Cerrar aviso"
        className="shrink-0 text-red-800/60 hover:text-red-800"
      >
        ✕
      </button>
    </div>
  );
}
