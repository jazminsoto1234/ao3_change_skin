'use client';

// B5-1: store Zustand con persistencia en localStorage (draft sin cuenta)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_SKIN_CONFIG, normalizeConfig, type Skin, type SkinConfig } from '@/types/skin';
import { DEFAULT_TEMPLATE_ID, type Template } from '@/lib/templates';

// De dónde salió el config actual: un template o un skin guardado. Se usa
// para marcar el preset activo y para que "Save" actualice en vez de duplicar.
export type SkinSource =
  | { kind: 'template'; id: string }
  | { kind: 'skin'; id: string; name: string }
  | null;

interface SkinStore {
  config: SkinConfig;
  // Último estado "limpio" (template aplicado o skin guardado); si config
  // difiere hay cambios sin guardar.
  baseline: SkinConfig;
  source: SkinSource;
  showSkin: boolean;
  setConfig: (config: SkinConfig) => void;
  updateConfig: (partial: Partial<SkinConfig>) => void;
  resetConfig: () => void;
  applyTemplate: (template: Template) => void;
  loadSavedSkin: (skin: Skin) => void;
  markSaved: (skin: Skin) => void;
  setShowSkin: (showSkin: boolean) => void;
}

const DEFAULT_SOURCE: SkinSource = { kind: 'template', id: DEFAULT_TEMPLATE_ID };

export const useSkinStore = create<SkinStore>()(
  persist(
    (set) => ({
      config: DEFAULT_SKIN_CONFIG,
      baseline: DEFAULT_SKIN_CONFIG,
      source: DEFAULT_SOURCE,
      showSkin: true,
      setConfig: (config) => set({ config }),
      updateConfig: (partial) =>
        set((state) => ({ config: { ...state.config, ...partial } })),
      resetConfig: () =>
        set({ config: DEFAULT_SKIN_CONFIG, baseline: DEFAULT_SKIN_CONFIG, source: DEFAULT_SOURCE }),
      applyTemplate: (template) =>
        set({
          config: template.config,
          baseline: template.config,
          source: { kind: 'template', id: template.id },
        }),
      loadSavedSkin: (skin) => {
        const config = normalizeConfig(skin.config);
        set({ config, baseline: config, source: { kind: 'skin', id: skin.id, name: skin.name } });
      },
      markSaved: (skin) =>
        set((state) => ({
          baseline: state.config,
          source: { kind: 'skin', id: skin.id, name: skin.name },
        })),
      setShowSkin: (showSkin) => set({ showSkin }),
    }),
    {
      name: 'ao3_skin_draft',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      version: 1,
      partialize: (state) => ({
        config: state.config,
        baseline: state.baseline,
        source: state.source,
      }),
      // v0 solo guardaba { config } con `mode` y sin zonas editables.
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<SkinStore>;
        if (version < 1 && state.config) {
          const config = normalizeConfig(state.config);
          return { config, baseline: config, source: null };
        }
        return state;
      },
    }
  )
);

export const isDirty = (state: Pick<SkinStore, 'config' | 'baseline'>): boolean =>
  JSON.stringify(state.config) !== JSON.stringify(state.baseline);
