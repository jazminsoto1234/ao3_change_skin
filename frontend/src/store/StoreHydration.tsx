'use client';

// B5-2: dispara la rehidratación del draft (localStorage -> store) una sola
// vez al montar. Cubre tanto la carga normal como el regreso desde
// /auth/callback: el draft ya vive en localStorage (B5-1) y este efecto es
// el único punto que lo carga al store, sin pisarlo en ningún flujo.
import { useEffect } from 'react';
import { useSkinStore } from './useSkinStore';

export function StoreHydration() {
  useEffect(() => {
    useSkinStore.persist.rehydrate();
  }, []);

  return null;
}
