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
export type SkinMode = 'basic' | 'advanced';

export interface SkinConfig {
  // Colores
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  linkVisitedColor: string;
  headerBgColor: string;
  headerTextColor: string;

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

  // Meta
  mode: SkinMode;
}

// Template Sepia
export const DEFAULT_SKIN_CONFIG: SkinConfig = {
  backgroundColor: '#f4ecd8',
  textColor: '#5b4636',
  linkColor: '#8b5e3c',
  linkVisitedColor: '#6e4b2a',
  headerBgColor: '#e8dcc0',
  headerTextColor: '#5b4636',

  fontFamily: 'Georgia, serif',
  fontSize: 16,
  lineHeight: 1.6,
  maxWidth: 80,

  backgroundImage: null,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundOverlayColor: '#f4ecd8',
  backgroundOverlayOpacity: 0,

  blurbBorderStyle: 'solid',
  blurbBorderColor: '#c9b896',
  blurbBorderWidth: 1,

  mode: 'basic',
};

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
