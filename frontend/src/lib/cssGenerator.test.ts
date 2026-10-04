import { describe, it, expect } from 'vitest';
import { generateCSS } from './cssGenerator';
import { DEFAULT_SKIN_CONFIG, NATIVE_REGIONS, normalizeConfig } from '../types/skin';
import type { SkinConfig } from '../types/skin';

describe('generateCSS', () => {
  it('produce CSS válido con config default (Archive Classic)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    expect(css).toContain('/* ----------------- Colores principales ----------------- */');
    expect(css).toContain('background-color: #ffffff');
    expect(css).toContain('color: #2a2a2a');
    expect(css).toContain('/* ----------------- Tipografía ----------------- */');
    expect(css).toContain('font-family: Inter, "Helvetica Neue", Arial, sans-serif');
    expect(css).toContain('font-size: 14px');
    expect(css).toContain('line-height: 1.5');
    expect(css).toContain('max-width: 80ch');
    expect(css).toContain('/* ----------------- Bordes ----------------- */');
    expect(css).toContain('border: 1px solid #dddddd');
    expect(css).not.toContain('/* ----------------- Imagen de fondo ----------------- */');
  });

  it('max-width se aplica al contenido de lectura (.userstuff), nunca a #main/#outer (bug: rompía layout de sidebar en works index)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    expect(css).toContain('.userstuff {\n  max-width: 80ch;\n  margin-left: auto;\n  margin-right: auto;\n}');
    expect(css).not.toContain('#main,\n  #outer {');
    expect(css).not.toContain('#outer,\n  #main {');
  });

  it('no genera sección de imagen de fondo cuando backgroundImage es null', () => {
    const config: SkinConfig = { ...DEFAULT_SKIN_CONFIG, backgroundImage: null };
    const css = generateCSS(config);
    const bgSection = css.split('/* ----------------- Imagen de fondo ----------------- */')[1];
    if (bgSection) {
      const nextSection = bgSection.split('/* -----------------')[0];
      expect(nextSection.trim()).toBe('');
    }
  });

  it('genera reglas de background-image cuando hay URL', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      backgroundImage: 'https://example.com/bg.jpg',
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'top left',
    };
    const css = generateCSS(config);
    expect(css).toContain("background-image: url('https://example.com/bg.jpg')");
    expect(css).toContain('background-repeat: repeat');
    expect(css).toContain('background-size: cover');
    expect(css).toContain('background-position: top left');
  });

  it('no agrega capa de overlay cuando backgroundOverlayOpacity es 0', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      backgroundImage: 'https://example.com/bg.jpg',
      backgroundOverlayOpacity: 0,
    };
    const css = generateCSS(config);
    expect(css).not.toContain('rgba');
  });

  it('agrega rgba overlay cuando backgroundOverlayOpacity > 0', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      backgroundImage: 'https://example.com/bg.jpg',
      backgroundOverlayColor: '#ff0000',
      backgroundOverlayOpacity: 0.5,
    };
    const css = generateCSS(config);
    expect(css).toContain('rgba(255, 0, 0, 0.50)');
  });

  it('zonas en null no generan bloque de zonas personalizadas', () => {
    const css = generateCSS({ ...DEFAULT_SKIN_CONFIG, ...NATIVE_REGIONS });
    expect(css).not.toContain('Zonas personalizadas');
  });

  it('navBgColor quita la textura nativa de la barra y pinta el color', () => {
    const css = generateCSS({ ...DEFAULT_SKIN_CONFIG, navBgColor: '#123456' });
    expect(css).toContain('#outer #header ul.primary {\n  background-color: #123456;\n  background-image: none;\n}');
  });

  it('zonas de #main suben a 3 ids para ganarle a .group:not(#footer):not(#footer *):not(#header *)', () => {
    const css = generateCSS({ ...DEFAULT_SKIN_CONFIG, blurbBgColor: '#abcdef', filtersBgColor: '#fedcba' });
    expect(css).toContain('#outer #inner #main li.blurb {\n  background-color: #abcdef;\n}');
    expect(css).toContain('#outer #inner #main form.filters fieldset {\n  background-color: #fedcba;\n}');
  });

  it('tags con fondo se emiten como chips sin subrayado', () => {
    const css = generateCSS({ ...DEFAULT_SKIN_CONFIG, tagBgColor: '#eeeeee', tagTextColor: '#990000' });
    expect(css).toContain('  color: #990000;\n  background-color: #eeeeee;\n  text-decoration: none;');
  });

  it('botones quitan el degradado nativo', () => {
    const css = generateCSS({ ...DEFAULT_SKIN_CONFIG, buttonBgColor: '#000000', buttonTextColor: '#ffffff' });
    expect(css).toContain('#outer #inner #main input[type="submit"]');
    expect(css).toContain('  background-color: #000000;\n  background-image: none;\n  color: #ffffff;');
  });

  it('normalizeConfig completa skins viejos con zonas nativas y descarta mode', () => {
    const old = { ...DEFAULT_SKIN_CONFIG, headingColor: undefined, mode: 'basic' } as unknown as SkinConfig;
    const config = normalizeConfig(old);
    expect('mode' in config).toBe(false);
    expect(config.navBgColor).toBeNull();
  });

  it('nunca genera @import de Google Fonts, ni siquiera con fontFamily custom (bug: AO3 filtra @import de web fonts silenciosamente, el bloque generado antes no hacía nada en el sitio real)', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      fontFamily: 'OpenDyslexic, sans-serif',
    };
    const css = generateCSS(config);
    expect(css).not.toContain('@import');
    expect(css).not.toContain('fonts.googleapis.com');
    expect(css).toContain('font-family: OpenDyslexic, sans-serif');
  });

  it('font-size/line-height solo se aplican a body, nunca a fieldset/table/th/textarea/input/#modal/.ui-sortable li (bug: AO3 define su padding/alto nativo en em relativo a su propio font-size; forzarlo ahí rompía formularios/tablas/modales/tag wrangling en AO3 real)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    const fontSizeBlock = css
      .split('/* ----------------- Tipografía ----------------- */')[1]
      .split(`font-size: ${DEFAULT_SKIN_CONFIG.fontSize}px;`)[0];
    expect(fontSizeBlock.trim().endsWith('body {')).toBe(true);
    expect(css).not.toContain('fieldset {\n  font-size:');
    expect(css).not.toContain('table {\n  font-size:');
  });

  it('blurbBorderStyle none no genera reglas de borde', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      blurbBorderStyle: 'none',
    };
    const css = generateCSS(config);
    const borderSection = css.split('/* ----------------- Bordes ----------------- */')[1];
    if (borderSection) {
      const nextSection = borderSection.split('/* -----------------')[0];
      expect(nextSection.trim()).toBe('');
    }
  });

  it('genera bordes dashed con color y width custom', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      blurbBorderStyle: 'dashed',
      blurbBorderColor: '#00ff00',
      blurbBorderWidth: 3,
    };
    const css = generateCSS(config);
    expect(css).toContain('border: 3px dashed #00ff00');
  });

  it('el footer no queda pisado por el background de .group/.secondary (bug: columnas del footer reusan esas clases)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    // los selectores genéricos de fondo/texto/link/heading deben excluir el
    // footer: el skin no le fuerza color propio, se queda con su apariencia
    // nativa de AO3 (rojo con texto blanco)
    expect(css).toContain('.group:not(#footer):not(#footer *)');
    expect(css).toContain('.secondary:not(#footer *)');
    expect(css).toContain('a:not(#footer *)');
    expect(css).toContain('a:visited:not(#footer *)');
    expect(css).toContain('.heading:not(#footer *)');
  });

  it('el footer no hereda visualmente el background de #outer (bug: #header/#footer no definen background propio en AO3 nativo, dejaban ver #outer detrás)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    expect(css).toContain('#outer #header,\n  #outer #footer {\n  background-color: transparent;\n}');
  });

  it('el header no queda pisado por ningún color del skin (logo, greeting, Post/Log Out, barra .primary quedan nativos de AO3)', () => {
    const css = generateCSS(DEFAULT_SKIN_CONFIG);
    expect(css).toContain(':not(#header *)');
    expect(css).not.toContain('#outer #header .current');
    expect(css).not.toContain('#outer #header ul.primary');
  });

  it('usa selectors.ts para todos los selectores, nunca hardcodea', () => {
    const config: SkinConfig = {
      ...DEFAULT_SKIN_CONFIG,
      linkColor: '#ff00ff',
    };
    const css = generateCSS(config);
    expect(css).toContain('a:link');
    expect(css).toContain('#outer #dashboard a');
  });
});