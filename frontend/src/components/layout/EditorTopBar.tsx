'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { Ao3Logo } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';

export function EditorTopBar() {
  const { user, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="flex items-center justify-between gap-4 bg-surface px-4 pb-3 pt-3 sm:px-4">
      <Link href="/" className="flex min-w-0 items-center gap-3 text-ao3">
        <Ao3Logo className="h-12 w-[84px] shrink-0" />
        <span className="truncate text-2xl font-bold tracking-tight sm:text-[34px]">
          Make your AO3 pretty
        </span>
      </Link>
      <nav className="flex shrink-0 items-center gap-3">
        <Link
          href="/skins"
          className="inline-flex h-10 items-center rounded-md border border-ink bg-ink px-4 text-[13px] font-semibold text-white transition-colors hover:bg-black"
        >
          My Saved Skins
        </Link>
        {user ? (
          <Button variant="outline" onClick={() => void signOut()}>
            Log Out
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setAuthOpen(true)}>
            Log In
          </Button>
        )}
      </nav>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
