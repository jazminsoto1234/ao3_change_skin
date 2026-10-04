import type { SkinConfig } from '../types/skin';
import { DEFAULT_SKIN_CONFIG, NATIVE_REGIONS } from '../types/skin';

export type TemplateCategory = 'classics' | 'accessibility' | 'themed';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  config: SkinConfig;
  previewColors: string[];
}

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; label: string }[] = [
  { id: 'classics', label: 'Classics' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'themed', label: 'Themed' },
];

// Base de los templates que no tocan zonas: parten del default y vuelven
// todas las zonas a su estilo nativo.
const preset = (partial: Partial<SkinConfig>): SkinConfig => ({
  ...DEFAULT_SKIN_CONFIG,
  ...NATIVE_REGIONS,
  ...partial,
});

export const TEMPLATES: Template[] = [
  {
    id: 'archive-classic',
    name: 'Archive Classic',
    description: 'The familiar red, white, and black.',
    category: 'classics',
    config: DEFAULT_SKIN_CONFIG,
    previewColors: ['#990000', '#ffffff', '#111111'],
  },
  {
    id: 'newsprint',
    name: 'Newsprint',
    description: 'Crisp serif type and quiet borders.',
    category: 'classics',
    config: preset({
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      linkColor: '#111111',
      linkVisitedColor: '#555555',
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 15,
      lineHeight: 1.6,
      blurbBorderColor: '#e6e6e6',
      backgroundOverlayColor: '#ffffff',
      headerBgColor: '#ffffff',
      headerTextColor: '#111111',
      navBgColor: '#111111',
      navTextColor: '#ffffff',
      headingColor: '#111111',
      headingFont: 'Georgia, "Times New Roman", serif',
      tagBgColor: '#f3e6ea',
      tagTextColor: '#111111',
      buttonBgColor: '#111111',
      buttonTextColor: '#ffffff',
      filtersBgColor: '#fafafa',
    }),
    previewColors: ['#111111', '#ffffff', '#f3e6ea'],
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Bold focus and larger reading type.',
    category: 'accessibility',
    config: preset({
      backgroundColor: '#ffffff',
      textColor: '#000000',
      linkColor: '#000000',
      linkVisitedColor: '#551a8b',
      fontFamily: 'Verdana, sans-serif',
      fontSize: 18,
      lineHeight: 1.8,
      maxWidth: 75,
      blurbBorderColor: '#000000',
      blurbBorderWidth: 2,
      backgroundOverlayColor: '#ffffff',
      headerBgColor: '#ffffff',
      headerTextColor: '#000000',
      navBgColor: '#000000',
      navTextColor: '#ffffff',
      headingColor: '#000000',
      tagBgColor: '#000000',
      tagTextColor: '#ffffff',
      buttonBgColor: '#000000',
      buttonTextColor: '#ffffff',
      filtersBgColor: '#ffffff',
    }),
    previewColors: ['#000000', '#ffffff'],
  },
  {
    id: 'dyslexia',
    name: 'Dyslexia Friendly',
    description: 'OpenDyslexic, warm beige and extra spacing.',
    category: 'accessibility',
    config: preset({
      backgroundColor: '#f5f0e6',
      textColor: '#333333',
      linkColor: '#cc6600',
      linkVisitedColor: '#994d00',
      fontFamily: '"OpenDyslexic", Verdana, sans-serif',
      fontSize: 18,
      lineHeight: 2.0,
      maxWidth: 70,
      backgroundOverlayColor: '#f5f0e6',
      blurbBorderColor: '#d1c7b7',
    }),
    previewColors: ['#f5f0e6', '#333333', '#cc6600'],
  },
  {
    id: 'sepia',
    name: 'Sepia',
    description: 'Aged paper for warm, cozy reading.',
    category: 'themed',
    config: preset({
      backgroundColor: '#f4ecd8',
      textColor: '#5b4636',
      linkColor: '#8b5e3c',
      linkVisitedColor: '#6e4b2a',
      fontFamily: 'Georgia, serif',
      fontSize: 16,
      lineHeight: 1.6,
      backgroundOverlayColor: '#f4ecd8',
      blurbBorderColor: '#c9b896',
    }),
    previewColors: ['#f4ecd8', '#5b4636', '#8b5e3c'],
  },
  {
    id: 'night',
    name: 'Midnight',
    description: 'Dark background, soft light text for late reading.',
    category: 'themed',
    config: preset({
      backgroundColor: '#1a1a2e',
      textColor: '#e0e0e0',
      linkColor: '#7aa2f7',
      linkVisitedColor: '#9d7cd8',
      fontFamily: 'Georgia, serif',
      fontSize: 16,
      lineHeight: 1.7,
      backgroundOverlayColor: '#1a1a2e',
      blurbBorderColor: '#3b3b52',
      headerBgColor: '#16162a',
      headerTextColor: '#c0caf5',
      navBgColor: '#24243e',
      navTextColor: '#c0caf5',
      headingColor: '#c0caf5',
      blurbBgColor: '#20203a',
      tagBgColor: '#2c2c4a',
      tagTextColor: '#7aa2f7',
      buttonBgColor: '#7aa2f7',
      buttonTextColor: '#1a1a2e',
      filtersBgColor: '#20203a',
    }),
    previewColors: ['#1a1a2e', '#e0e0e0', '#7aa2f7'],
  },
  {
    id: 'medieval',
    name: 'Medieval Manuscript',
    description: 'Old parchment texture and decorative type.',
    category: 'themed',
    config: preset({
      backgroundColor: '#e8d5b0',
      textColor: '#3b2f2f',
      linkColor: '#8b3a3a',
      linkVisitedColor: '#5c2626',
      fontFamily: '"Uncial Antiqua", "IM Fell English", Georgia, serif',
      fontSize: 17,
      lineHeight: 1.7,
      maxWidth: 75,
      backgroundImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Parchment.00.jpg/1280px-Parchment.00.jpg',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundOverlayColor: '#e8d5b0',
      backgroundOverlayOpacity: 0.85,
      blurbBorderStyle: 'dashed',
      blurbBorderColor: '#8b7355',
      blurbBorderWidth: 2,
    }),
    previewColors: ['#e8d5b0', '#3b2f2f', '#8b3a3a'],
  },
  {
    id: 'floral',
    name: 'Floral Vintage',
    description: 'Soft pink with a gentle vintage texture.',
    category: 'themed',
    config: preset({
      backgroundColor: '#fdf2f2',
      textColor: '#5a3e3e',
      linkColor: '#c75b7a',
      linkVisitedColor: '#9a4a5e',
      fontFamily: '"Lora", Georgia, serif',
      fontSize: 16,
      lineHeight: 1.6,
      backgroundImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Old_paper_texture.jpg/1280px-Old_paper_texture.jpg',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundOverlayColor: '#fce4ec',
      backgroundOverlayOpacity: 0.6,
      blurbBorderStyle: 'dotted',
      blurbBorderColor: '#e8b4b8',
    }),
    previewColors: ['#fdf2f2', '#5a3e3e', '#c75b7a'],
  },
];

export const DEFAULT_TEMPLATE_ID = 'archive-classic';
