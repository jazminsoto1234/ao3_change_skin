import type { SkinConfig } from '../types/skin';
import { DEFAULT_SKIN_CONFIG } from '../types/skin';

export interface Template {
  id: string;
  name: string;
  description: string;
  config: SkinConfig;
  previewColors: string[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'sepia',
    name: 'Sepia',
    description: 'Papel envejecido, lectura cálida. Default del editor.',
    config: DEFAULT_SKIN_CONFIG,
    previewColors: ['#f4ecd8', '#5b4636', '#8b5e3c'],
  },
  {
    id: 'night',
    name: 'Modo nocturno',
    description: 'Fondo oscuro, texto claro. Ideal para lectura de noche.',
    config: {
      backgroundColor: '#1a1a2e',
      textColor: '#e0e0e0',
      linkColor: '#7aa2f7',
      linkVisitedColor: '#9d7cd8',
      headerBgColor: '#16162a',
      headerTextColor: '#c0caf5',

      fontFamily: 'Georgia, serif',
      fontSize: 16,
      lineHeight: 1.7,
      maxWidth: 80,

      backgroundImage: null,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundOverlayColor: '#1a1a2e',
      backgroundOverlayOpacity: 0,

      blurbBorderStyle: 'solid',
      blurbBorderColor: '#3b3b52',
      blurbBorderWidth: 1,

      mode: 'basic',
    },
    previewColors: ['#1a1a2e', '#e0e0e0', '#7aa2f7'],
  },
  {
    id: 'high-contrast',
    name: 'Alto contraste',
    description: 'Negro sobre blanco, bordes gruesos. Máxima legibilidad.',
    config: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      linkColor: '#0000ee',
      linkVisitedColor: '#551a8b',
      headerBgColor: '#eeeeee',
      headerTextColor: '#000000',

      fontFamily: 'Verdana, sans-serif',
      fontSize: 18,
      lineHeight: 1.8,
      maxWidth: 75,

      backgroundImage: null,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundOverlayColor: '#ffffff',
      backgroundOverlayOpacity: 0,

      blurbBorderStyle: 'solid',
      blurbBorderColor: '#000000',
      blurbBorderWidth: 2,

      mode: 'basic',
    },
    previewColors: ['#ffffff', '#000000', '#0000ee'],
  },
  {
    id: 'dyslexia',
    name: 'Modo dislexia',
    description: 'OpenDyslexic, fondo beige, espaciado extra. Lectura accesible.',
    config: {
      backgroundColor: '#f5f0e6',
      textColor: '#333333',
      linkColor: '#cc6600',
      linkVisitedColor: '#994d00',
      headerBgColor: '#ede8dc',
      headerTextColor: '#333333',

      fontFamily: '"OpenDyslexic", Verdana, sans-serif',
      fontSize: 18,
      lineHeight: 2.0,
      maxWidth: 70,

      backgroundImage: null,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundOverlayColor: '#f5f0e6',
      backgroundOverlayOpacity: 0,

      blurbBorderStyle: 'solid',
      blurbBorderColor: '#d1c7b7',
      blurbBorderWidth: 1,

      mode: 'basic',
    },
    previewColors: ['#f5f0e6', '#333333', '#cc6600'],
  },
  {
    id: 'medieval',
    name: 'Medieval / Manuscrito',
    description: 'Pergamino antiguo con textura de papel. Tipografía decorativa.',
    config: {
      backgroundColor: '#e8d5b0',
      textColor: '#3b2f2f',
      linkColor: '#8b3a3a',
      linkVisitedColor: '#5c2626',
      headerBgColor: '#d4c09a',
      headerTextColor: '#3b2f2f',

      fontFamily: '"Uncial Antiqua", "IM Fell English", Georgia, serif',
      fontSize: 17,
      lineHeight: 1.7,
      maxWidth: 75,

      backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Parchment.00.jpg/1280px-Parchment.00.jpg',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      backgroundOverlayColor: '#e8d5b0',
      backgroundOverlayOpacity: 0.85,

      blurbBorderStyle: 'dashed',
      blurbBorderColor: '#8b7355',
      blurbBorderWidth: 2,

      mode: 'advanced',
    },
    previewColors: ['#e8d5b0', '#3b2f2f', '#8b3a3a'],
  },
  {
    id: 'floral',
    name: 'Floral / Vintage',
    description: 'Rosa suave con patrón floral. Decorativo y femenino.',
    config: {
      backgroundColor: '#fdf2f2',
      textColor: '#5a3e3e',
      linkColor: '#c75b7a',
      linkVisitedColor: '#9a4a5e',
      headerBgColor: '#f7e4e8',
      headerTextColor: '#5a3e3e',

      fontFamily: '"Lora", Georgia, serif',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 80,

      backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Old_paper_texture.jpg/1280px-Old_paper_texture.jpg',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      backgroundOverlayColor: '#fce4ec',
      backgroundOverlayOpacity: 0.6,

      blurbBorderStyle: 'dotted',
      blurbBorderColor: '#e8b4b8',
      blurbBorderWidth: 1,

      mode: 'advanced',
    },
    previewColors: ['#fdf2f2', '#5a3e3e', '#c75b7a'],
  },
];