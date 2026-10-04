'use client';

// Banda roja de la página My Saved Skins: logo, título y sesión del usuario.
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Ao3Logo } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';

const displayName = (user: User): string =>
  (user.user_metadata?.username as string | undefined) ?? user.email?.split('@')[0] ?? 'reader';

const initials = (name: string): string => {
  const parts = name.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
};

interface AppBannerProps {
  user: User | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

export function AppBanner({ user, onSignOut, onSignIn }: AppBannerProps) {
  const name = user ? displayName(user) : '';

  return (
    <header className="bg-[#a30000] text-white">
      <div className="mx-auto flex h-[125px] max-w-[1366px] items-center justify-between gap-4 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md bg-white text-ao3">
            <Ao3Logo className="h-6 w-7" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl font-semibold leading-tight">
              Make your AO3 pretty
            </span>
            <span className="block truncate text-xs text-white/85">
              A focused skin &amp; CSS customizer for AO3
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-3 sm:mr-[50px]">
          {user ? (
            <>
              <span
                aria-hidden
                className="grid h-[30px] w-[30px] place-items-center rounded-full bg-ink text-[11px] font-bold"
              >
                {initials(name)}
              </span>
              <span className="hidden text-[13px] sm:inline">{name}</span>
              <Button variant="dark" onClick={onSignOut} className="ml-1 h-[38px]">
                Log Out
              </Button>
            </>
          ) : (
            <Button variant="dark" onClick={onSignIn} className="h-[38px]">
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
