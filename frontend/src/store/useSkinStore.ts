'use client';

// B5-1: store Zustand con persistencia en localStorage (draft sin cuenta)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_SKIN_CONFIG, type SkinConfig } from '@/types/skin';

interface SkinStore {
  config: SkinConfig;
  setConfig: (config: SkinConfig) => void;
  updateConfig: (partial: Partial<SkinConfig>) => void;
  resetConfig: () => void;
}

export const useSkinStore = create<SkinStore>()(
  persist(
    (set) => ({
      config: DEFAULT_SKIN_CONFIG,
      setConfig: (config) => set({ config }),
      updateConfig: (partial) =>
        set((state) => ({ config: { ...state.config, ...partial } })),
      resetConfig: () => set({ config: DEFAULT_SKIN_CONFIG }),
    }),
    {
      name: 'ao3_skin_draft',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
