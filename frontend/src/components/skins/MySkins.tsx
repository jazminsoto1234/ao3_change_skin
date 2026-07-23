'use client';

// F6-3: lista de skins guardadas del usuario. Solo visible/accesible si hay
// sesión (useAuth().user no null) — el propio componente se oculta si no.
import { useAuth } from '@/hooks/useAuth';
import { useSkins } from '@/hooks/useSkins';
import { SkinCard } from './SkinCard';
import { HeartIcon } from '@/components/ui/icons';

export function MySkins() {
  const { user, signOut } = useAuth();
  const { skins, loading, error, updateSkin, deleteSkin, loadSkin } = useSkins();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blush text-wine"
          >
            <HeartIcon className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">Mis skins</h2>
            <p className="truncate text-xs text-soft">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="shrink-0 text-xs font-medium text-soft hover:text-ink"
        >
          Cerrar sesión
        </button>
      </div>

      {loading && <p className="text-sm text-soft">Cargando…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && skins.length === 0 && (
        <p className="rounded-xl bg-blush/60 px-3 py-2.5 text-sm text-soft">
          Todavía no guardaste ninguna skin. Cuando guardes una, aparecerá aquí.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {skins.map((skin) => (
          <SkinCard
            key={skin.id}
            skin={skin}
            onLoad={() => loadSkin(skin)}
            onRename={async (name) => {
              await updateSkin(skin.id, { name });
            }}
            onDelete={async () => {
              await deleteSkin(skin.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
