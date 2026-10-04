'use client';

// F6-3: página My Saved Skins — lista de skins a la izquierda y el CSS del
// skin seleccionado a la derecha, listo para copiar a AO3.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSkins } from '@/hooks/useSkins';
import { useSkinStore } from '@/store/useSkinStore';
import { generateCSS } from '@/lib/cssGenerator';
import { AppBanner } from '@/components/layout/AppBanner';
import { AuthModal } from '@/components/auth/AuthModal';
import { CodePanel } from '@/components/output/CodePanel';
import { Button } from '@/components/ui/Button';
import { SkinCard } from './SkinCard';
import { lastUpdatedLabel, skinColors } from './skinMeta';

export function SavedSkinsPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { skins, loading, error, deleteSkin, loadSkin } = useSkins();
  const resetConfig = useSkinStore((state) => state.resetConfig);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const selected = skins.find((s) => s.id === selectedId) ?? skins[0] ?? null;

  const handleCreate = () => {
    resetConfig();
    router.push('/');
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppBanner
        user={user}
        onSignOut={() => void signOut()}
        onSignIn={() => setAuthOpen(true)}
      />

      <main className="w-full px-4 pb-16 pt-12 lg:pl-[126px] lg:pr-6">
        <Link
          href="/"
          className="inline-flex h-[38px] items-center rounded-md border border-ink bg-surface px-4 text-[13px] font-semibold hover:bg-canvas"
        >
          ← Back to editor
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 lg:pr-[23px]">
          <h1 className="font-serif text-[34px] font-semibold">My Saved Skins</h1>
          <Button variant="red" onClick={handleCreate} className="h-[38px]">
            Create new skin
          </Button>
        </div>

        {!authLoading && !user && (
          <div className="mt-6 max-w-xl rounded-2xl border border-line bg-surface p-6">
            <p className="text-sm text-soft">
              Log in to keep your skins and come back to them anytime. No passwords — we email you
              a magic link.
            </p>
            <Button variant="dark" className="mt-4" onClick={() => setAuthOpen(true)}>
              Log In
            </Button>
          </div>
        )}

        {user && (
          <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,582px)]">
            <div className="flex flex-col gap-4">
              {loading && <p className="text-sm text-soft">Loading…</p>}
              {error && <p className="text-sm text-red-700">{error}</p>}
              {!loading && !error && skins.length === 0 && (
                <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-soft">
                  You haven&apos;t saved any skins yet. Style one in the editor and hit
                  &quot;Save skin&quot;.
                </p>
              )}
              {skins.map((skin) => (
                <SkinCard
                  key={skin.id}
                  skin={skin}
                  selected={skin.id === selected?.id}
                  onSelect={() => setSelectedId(skin.id)}
                  onEdit={() => {
                    loadSkin(skin);
                    router.push('/');
                  }}
                  onDelete={async () => {
                    await deleteSkin(skin.id);
                  }}
                />
              ))}
            </div>

            {selected && (
              <div className="lg:sticky lg:top-6">
                <CodePanel
                  name={selected.name}
                  updatedLabel={lastUpdatedLabel(selected)}
                  colors={skinColors(selected.config)}
                  css={generateCSS(selected.config)}
                  expanded={codeExpanded}
                  onToggle={setCodeExpanded}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
