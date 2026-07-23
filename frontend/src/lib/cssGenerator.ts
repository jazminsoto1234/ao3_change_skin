import { SELECTORS } from './selectors';
import type { SkinConfig } from '../types/skin';

// El CSS nativo de AO3 (site_screen.css) pinta las regiones con selectores
// de un solo id (ej. "#footer { background: #900 url(...) }", especificidad
// 1,0,0), igual que nuestras reglas generadas. Con especificidad empatada
// gana quien esté después en la cascada, lo cual es frágil (depende de cómo
// AO3 inyecte el site skin del usuario respecto a su propio stylesheet).
// Prefijar "#outer " (el wrapper que envuelve #header/#main/#footer/etc. en
// el DOM real, ver selectors_vf.md) sube la especificidad a 2,0,0 de forma
// robusta usando sintaxis CSS estándar — a diferencia de duplicar el mismo
// id (ej. "#footer#footer"), que el parser CSS restringido de AO3 puede no
// reconocer. Selectores que ya empiezan con "#outer" o que están dentro de
// :not(...) se dejan intactos.
const REGION_IDS = ['#header', '#footer', '#main', '#dashboard', '#modal', '#small_login', '#inner', '#ui-datepicker-div'];

const boostSpecificity = (selector: string): string => {
  if (selector.startsWith('#outer')) return selector;
  const startsWithRegionId = REGION_IDS.some((id) => selector === id || selector.startsWith(id + ' ') || selector.startsWith(id + ':'));
  return startsWithRegionId ? `#outer ${selector}` : selector;
};

const formatSelectors = (selectors: readonly string[]): string =>
  selectors.map(boostSpecificity).join(',\n  ');

export function generateCSS(config: SkinConfig): string {
  const blocks: string[] = [];

  blocks.push(generateColors(config));
  blocks.push(generateTypography(config));
  if (config.backgroundImage) {
    blocks.push(generateBackgroundImage(config));
  }
  blocks.push(generateBorders(config));

  return blocks.filter(Boolean).join('\n\n');
}

function generateColors(config: SkinConfig): string {
  const lines: string[] = [];
  lines.push('/* ----------------- Colores principales ----------------- */');

  if (config.backgroundColor) {
    lines.push('');
    lines.push(formatSelectors(SELECTORS.BODY_BG_SELECTORS) + ' {');
    lines.push(`  background-color: ${config.backgroundColor};`);
    lines.push('}');

    // #header y #footer no definen background-color propio en AO3 nativo:
    // dejan ver detrás lo que pinte #outer. Como :not() no puede excluir
    // "ancestro de #header" (no hay descendiente que probar), restauramos
    // el fondo nativo explícitamente para que #outer no se filtre visualmente.
    lines.push('');
    lines.push(formatSelectors([SELECTORS.HEADER, SELECTORS.FOOTER]) + ' {');
    lines.push('  background-color: transparent;');
    lines.push('}');
  }

  lines.push('');
  lines.push(formatSelectors(SELECTORS.SECONDARY_BG_SELECTORS) + ' {');
  lines.push(`  background-color: ${config.backgroundColor};`);
  lines.push('}');

  // AO3 reusa .group/.secondary/.region/a también dentro de #footer y
  // #header; esos selectores genéricos ya excluyen ambos con :not(), así que
  // el footer y todo el header (logo, greeting, Post/Log Out, barra
  // .primary) se quedan con su apariencia nativa de AO3 (el skin no los
  // toca). headerBgColor/headerTextColor quedan sin uso en el CSS generado
  // por ahora.
  if (config.textColor) {
    lines.push('');
    lines.push(formatSelectors(SELECTORS.TEXT_COLOR_SELECTORS) + ' {');
    lines.push(`  color: ${config.textColor};`);
    lines.push('}');
  }

  if (config.linkColor) {
    lines.push('');
    lines.push(formatSelectors(SELECTORS.LINK_COLOR_SELECTORS) + ' {');
    lines.push(`  color: ${config.linkColor};`);
    lines.push('}');
  }

  if (config.linkVisitedColor) {
    lines.push('');
    lines.push(formatSelectors(SELECTORS.LINK_VISITED_COLOR_SELECTORS) + ' {');
    lines.push(`  color: ${config.linkVisitedColor};`);
    lines.push('}');
  }

  return lines.join('\n');
}

function generateTypography(config: SkinConfig): string {
  const lines: string[] = [];
  lines.push('/* ----------------- Tipografía ----------------- */');

  lines.push('');
  lines.push(formatSelectors(SELECTORS.TEXT_COLOR_SELECTORS) + ' {');
  lines.push(`  font-family: ${config.fontFamily};`);
  lines.push('}');

  lines.push('');
  lines.push(formatSelectors(SELECTORS.FONT_SIZE_SELECTORS) + ' {');
  lines.push(`  font-size: ${config.fontSize}px;`);
  lines.push(`  line-height: ${config.lineHeight};`);
  lines.push('}');

  if (config.maxWidth) {
    lines.push('');
    lines.push(formatSelectors(SELECTORS.READING_WIDTH_SELECTORS) + ' {');
    lines.push(`  max-width: ${config.maxWidth}ch;`);
    lines.push('  margin-left: auto;');
    lines.push('  margin-right: auto;');
    lines.push('}');
  }

  lines.push('');
  lines.push(formatSelectors([SELECTORS.A, SELECTORS.A_LINK, SELECTORS.A_VISITED, SELECTORS.A_HOVER, SELECTORS.A_FOCUS]) + ' {');
  lines.push('  text-decoration: underline;');
  lines.push('}');

  return lines.join('\n');
}

function generateBackgroundImage(config: SkinConfig): string {
  const lines: string[] = [];
  lines.push('/* ----------------- Imagen de fondo ----------------- */');

  lines.push('');
  lines.push(boostSpecificity(SELECTORS.BODY) + ' {');
  lines.push(`  background-image: url('${config.backgroundImage}');`);
  lines.push(`  background-repeat: ${config.backgroundRepeat};`);
  lines.push(`  background-size: ${config.backgroundSize};`);
  lines.push(`  background-position: ${config.backgroundPosition};`);
  lines.push('}');

  if (config.backgroundOverlayOpacity > 0) {
    lines.push('');
    lines.push(boostSpecificity(SELECTORS.OUTER) + ' {');
    const hex = config.backgroundOverlayColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    lines.push(`  background-color: rgba(${r}, ${g}, ${b}, ${config.backgroundOverlayOpacity.toFixed(2)});`);
    lines.push('}');
  }

  return lines.join('\n');
}

function generateBorders(config: SkinConfig): string {
  const lines: string[] = [];
  lines.push('/* ----------------- Bordes ----------------- */');

  if (config.blurbBorderStyle === 'none') {
    return lines.join('\n');
  }

  lines.push('');
  lines.push(formatSelectors(SELECTORS.BLURB_BORDER_SELECTORS) + ' {');
  lines.push(`  border: ${config.blurbBorderWidth}px ${config.blurbBorderStyle} ${config.blurbBorderColor};`);
  lines.push('}');

  lines.push('');
  lines.push(formatSelectors([SELECTORS.BLURB]) + ' {');
  lines.push(`  border: ${config.blurbBorderWidth}px ${config.blurbBorderStyle} ${config.blurbBorderColor};`);
  lines.push('}');

  lines.push('');
  lines.push(boostSpecificity(SELECTORS.A_CURRENT) + ' {');
  lines.push(`  border: ${config.blurbBorderWidth}px ${config.blurbBorderStyle} ${config.blurbBorderColor};`);
  lines.push(`  border-radius: 0.25em;`);
  lines.push('}');

  return lines.join('\n');
}