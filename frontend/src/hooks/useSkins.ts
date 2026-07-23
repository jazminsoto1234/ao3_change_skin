'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase, SKINS_TABLE } from '@/lib/supabase';
import type { CreateSkinPayload, Skin, UpdateSkinPayload } from '@/types/skin';
import { useSkinStore } from '@/store/useSkinStore';
import { useAuth } from '@/hooks/useAuth';

// B4-1: listar skins del usuario autenticado (RLS filtra por user_id)
export async function fetchSkins(): Promise<Skin[]> {
  const { data, error } = await supabase
    .from(SKINS_TABLE)
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('fetchSkins error:', error);
    return [];
  }

  return data ?? [];
}

// B4-2: guardar skin nueva. Sin usuario autenticado no hay insert posible (RLS lo rechaza igual).
export async function createSkin(payload: CreateSkinPayload): Promise<Skin | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from(SKINS_TABLE)
    .insert({ ...payload, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error('createSkin error:', error);
    return null;
  }

  return data;
}

// B4-3: actualizar skin existente. RLS bloquea skins ajenas (error o 0 rows).
export async function updateSkin(id: string, payload: UpdateSkinPayload): Promise<Skin | null> {
  const { data, error } = await supabase
    .from(SKINS_TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateSkin error:', error);
    return null;
  }

  return data;
}

// B4-4: eliminar skin. RLS bloquea skins ajenas.
export async function deleteSkin(id: string): Promise<boolean> {
  const { error } = await supabase.from(SKINS_TABLE).delete().eq('id', id);

  if (error) {
    console.error('deleteSkin error:', error);
    return false;
  }

  return true;
}

// B4-5: cargar skin en el editor. Sin llamada a BD, solo aplica config al store.
export function loadSkin(skin: Skin): void {
  useSkinStore.getState().setConfig(skin.config);
}

// B6-1: hook que agrupa B4-1..B4-5 con estado y auto-fetch ligado a la sesión.
export function useSkins() {
  const { user } = useAuth();
  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSkins();
      setSkins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar skins');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        await refetch();
      } else {
        setSkins([]);
      }
    })();
  }, [user, refetch]);

  async function create(payload: CreateSkinPayload): Promise<Skin | null> {
    const skin = await createSkin(payload);
    if (skin) setSkins((prev) => [skin, ...prev]);
    return skin;
  }

  async function update(id: string, payload: UpdateSkinPayload): Promise<Skin | null> {
    const skin = await updateSkin(id, payload);
    if (skin) setSkins((prev) => prev.map((s) => (s.id === id ? skin : s)));
    return skin;
  }

  async function remove(id: string): Promise<boolean> {
    const ok = await deleteSkin(id);
    if (ok) setSkins((prev) => prev.filter((s) => s.id !== id));
    return ok;
  }

  return {
    skins,
    loading,
    error,
    refetch,
    createSkin: create,
    updateSkin: update,
    deleteSkin: remove,
    loadSkin,
  };
}
