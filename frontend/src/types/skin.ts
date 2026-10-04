// B0-1: SkinConfig — configuración visual de un skin de AO3
export type BackgroundRepeat = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
export type BackgroundSize = 'auto' | 'cover' | 'contain';
export type BackgroundPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';
export type BlurbBorderStyle = 'none' | 'solid' | 'dashed' | 'dotted';

export interface SkinConfig {
  // Colores
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  linkVisitedColor: string;

  // Tipografía
  fontFamily: string;
  fontSize: number; // px
  lineHeight: number;
  maxWidth: number; // ch

  // Imagen de fondo
  backgroundImage: string | null; // URL
  backgroundRepeat: BackgroundRepeat;
  backgroundSize: BackgroundSize;
  backgroundPosition: BackgroundPosition;
  backgroundOverlayColor: string; // hex
  backgroundOverlayOpacity: number; // 0-1

  // Bordes
  blurbBorderStyle: BlurbBorderStyle;
  blurbBorderColor: string;
  blurbBorderWidth: number; // px

  // Zonas editables desde el preview. null = se deja el estilo nativo de AO3
  // (no se genera regla), así un skin solo toca lo que el usuario cambió.
  headerBgColor: string | null;
  headerTextColor: string | null;
  navBgColor: string | null;
  navTextColor: string | null;
  headingColor: string | null;
  headingFont: string | null;
  blurbBgColor: string | null;
  tagBgColor: string | null;
  tagTextColor: string | null;
  buttonBgColor: string | null;
  buttonTextColor: string | null;
  filtersBgColor: string | null;
}

export type RegionField =
  | 'headerBgColor'
  | 'headerTextColor'
  | 'navBgColor'
  | 'navTextColor'
  | 'headingColor'
  | 'headingFont'
  | 'blurbBgColor'
  | 'tagBgColor'
  | 'tagTextColor'
  | 'buttonBgColor'
  | 'buttonTextColor'
  | 'filtersBgColor';

export const NATIVE_REGIONS: Pick<SkinConfig, RegionField> = {
  headerBgColor: null,
  headerTextColor: null,
  navBgColor: null,
  navTextColor: null,
  headingColor: null,
  headingFont: null,
  blurbBgColor: null,
  tagBgColor: null,
  tagTextColor: null,
  buttonBgColor: null,
  buttonTextColor: null,
  filtersBgColor: null,
};

// Template Archive Classic
export const DEFAULT_SKIN_CONFIG: SkinConfig = {
  backgroundColor: '#ffffff',
  textColor: '#2a2a2a',
  linkColor: '#990000',
  linkVisitedColor: '#6b0000',

  fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1.5,
  maxWidth: 80,

  backgroundImage: null,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundOverlayColor: '#ffffff',
  backgroundOverlayOpacity: 0,

  blurbBorderStyle: 'solid',
  blurbBorderColor: '#dddddd',
  blurbBorderWidth: 1,

  ...NATIVE_REGIONS,
  headingColor: '#111111',
  headingFont: 'Lora, Georgia, serif',
};

// Skins guardados antes de las zonas editables (o drafts viejos en
// localStorage) no traen los campos nuevos y sí traen `mode`: se completan
// con null (estilo nativo) para no cambiarles el look.
export function normalizeConfig(raw: Partial<SkinConfig> & { mode?: unknown }): SkinConfig {
  const rest = { ...raw };
  delete rest.mode;
  return { ...DEFAULT_SKIN_CONFIG, ...NATIVE_REGIONS, ...rest };
}

// B0-2: Skin — fila de BD
export interface Skin {
  id: string; // UUID
  user_id: string;
  name: string;
  config: SkinConfig;
  is_public: boolean;
  created_at: string; // ISO
  updated_at: string; // ISO
}

export type CreateSkinPayload = Pick<Skin, 'name' | 'config'>;
export type UpdateSkinPayload = Partial<CreateSkinPayload>;
