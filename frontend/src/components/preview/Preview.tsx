'use client';

// F4-2: inyecta generateCSS(config) dentro de un iframe propio (about:blank,
// sandboxed) para que las reglas que targetean `body`, `#outer`, etc. (ver
// selectors.ts) matcheen contra un documento real sin filtrar el CSS del
// preview hacia el resto de la app. El markup (MockAO3Layout) se monta ahí
// mismo vía createPortal, así se re-renderiza en vivo con cada cambio del store.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSkinStore } from '@/store/useSkinStore';
import { generateCSS } from '@/lib/cssGenerator';
import { MockAO3Layout } from './mockAO3Layout';

// Aproximación al CSS nativo de AO3 (1_site_screen.css). No es exacto, pero
// reproduce el look & layout del sitio real (nav roja, 3 columnas, blurbs,
// badges, stats) para que el skin generado se vea sobre algo parecido a AO3.
// El skin (generateCSS) se inyecta DESPUÉS y pisa colores/bordes/tipografía.
const BASE_STYLES = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Helvetica, sans-serif;
    font-size: 87.5%;
    line-height: 1.5;
    color: #2a2a2a;
    background: #eae6de;
  }
  a { color: #111; text-decoration: none; cursor: pointer; }
  a:hover { text-decoration: underline; }
  ul, ol { list-style: none; margin: 0; padding: 0; }
  h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: normal; }

  #outer { padding: 0; }
  #inner { max-width: 1250px; margin: 0 auto; padding: 0; background: transparent; }

  /* ---- Header: logo arriba-izq, saludo arriba-der, nav roja full-width ---- */
  #header { position: relative; padding: 0; }
  #header .heading { display: inline-block; font-size: 1.9em; font-weight: bold; margin: 0.35em 0 0.35em 0.6em; }
  #header .heading a { color: #900; }
  #header ul.user {
    position: absolute; top: 1.2em; right: 1em;
    display: flex; gap: 1.1em; align-items: center;
  }
  #header ul.user a { color: #333; }
  #header #greeting { display: flex; align-items: center; gap: 0.4em; }
  #header #greeting img { border-radius: 2px; }
  #header ul.primary {
    clear: both; display: flex; align-items: stretch; gap: 0;
    background: #900; background: linear-gradient(#7a0000, #a30000); margin: 0; padding: 0;
  }
  #header ul.primary > li > a { display: block; color: #fff; padding: 0.6em 1em; }
  #header ul.primary > li.dropdown > a:hover { background: rgba(0,0,0,0.25); }
  #header ul.primary > li.search { margin-left: auto; display: flex; align-items: center; padding: 0 0.6em; }
  #header ul.primary #search { display: flex; gap: 0.35em; }
  #header ul.primary #search input[type="text"] { padding: 0.3em 0.5em; border: 1px solid #ccc; border-radius: 3px; min-width: 11em; }
  #header ul.primary #search input[type="submit"] { padding: 0.3em 0.7em; border: 1px solid #888; border-radius: 3px; background: #eee; cursor: pointer; }

  /* ---- Main: 3 columnas (dashboard | works | filters) ---- */
  #main { position: relative; padding: 1.4em 1em; overflow: hidden; }
  #main::after { content: ''; display: block; clear: both; }
  #dashboard { float: left; width: 15%; text-align: right; }
  #dashboard ul { margin: 0 0 1em; padding: 0.5em 0; border-top: 1px dashed #bbb; }
  #dashboard ul:first-child { border-top: none; }
  #dashboard li { padding: 0.35em 0.7em; }
  #dashboard a { color: #767676; }
  #dashboard .current { background: #ddd; }
  #dashboard .current a { color: #111; font-weight: bold; }
  .filters { float: right; width: 21%; }
  .filters > form > fieldset { border: 1px solid #ccc; border-radius: 4px; padding: 0.8em; background: #f7f5f1; }
  .filters .heading { font-size: 1.15em; color: #900; margin-bottom: 0.6em; display: block; }
  .filters .actions { margin-bottom: 0.8em; }
  .filters label { display: block; font-size: 0.9em; margin-bottom: 0.2em; }
  .filters select { width: 100%; padding: 0.3em; border: 1px solid #bbb; border-radius: 3px; }
  .filters .listbox { margin-top: 0.4em; }
  .filters .listbox .heading { font-weight: bold; color: #900; font-size: 1em; display: block; margin-bottom: 0.3em; }
  .filters .options li { padding: 0.25em 0; color: #555; cursor: pointer; }
  .filters .submit input {
    margin-top: 0.8em; padding: 0.45em 0.9em; border: 1px solid #999;
    border-radius: 4px; background: #eee; cursor: pointer;
  }

  /* Columna central (entre las dos barras flotadas) */
  #main > h2.heading { margin: 0 23% 0.5em 17%; font-size: 1.6em; color: #900; }
  #main > ol.pagination { margin: 0 23% 0.8em 17%; display: flex; justify-content: center; gap: 0.4em; }
  #main > ol.pagination li span, #main > ol.pagination li a {
    display: block; padding: 0.25em 0.7em; border: 1px solid #ccc; border-radius: 3px; background: #f2f0eb;
  }
  #main > ol.pagination .current { background: #ddd; font-weight: bold; }
  ol.work.index { margin: 0 23% 0 17%; }

  /* ---- Blurb (tarjeta de work) ---- */
  li.blurb {
    background: #fff; border: 1px solid #ccc; border-radius: 4px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15); padding: 0.8em 1em; margin-bottom: 1.2em;
  }
  li.blurb .header { position: relative; padding-bottom: 0.5em; margin-bottom: 0.6em; border-bottom: 1px solid #ddd; }
  /* Badges 2x2 flotados a la izquierda; el título fluye a su derecha */
  li.blurb .required-tags {
    float: left; width: 3.3em; display: flex; flex-wrap: wrap; gap: 2px; margin: 0 0.6em 0.2em 0;
  }
  li.blurb .required-tags li { width: 1.55em; height: 1.55em; margin: 0; padding: 0; }
  li.blurb .required-tags span {
    display: block; width: 100%; height: 100%; line-height: 1.55em;
    text-align: center; font-size: 0.8em; border-radius: 2px; background: #e6e3dd; color: #555;
  }
  li.blurb .required-tags .rating { background: #6c9a3f; color: #fff; font-weight: bold; }
  li.blurb .required-tags .complete { background: #3a9a3a; color: #fff; }
  li.blurb .header .heading { font-size: 1.2em; padding-right: 8em; }
  li.blurb .header .heading a { color: #900; }
  li.blurb .datetime { position: absolute; top: 0; right: 0; width: 7em; text-align: right; color: #595959; font-size: 0.95em; }
  li.blurb h5.fandoms { margin-top: 0.2em; }
  li.blurb h5.fandoms .landmark { font-weight: bold; }
  h6.landmark { margin-top: 0.6em; font-size: 0.85em; color: #777; }
  ul.tags.commas { display: inline; }
  ul.tags.commas li { display: inline; }
  ul.tags.commas li a.tag { color: #900; }
  ul.tags.commas li:not(:last-child) a::after { content: ','; color: #444; }
  blockquote.userstuff { margin: 0.5em 0; padding-left: 0.9em; border-left: 3px solid #ddd; }
  dl.stats { display: flex; flex-wrap: wrap; gap: 0.15em 0.6em; margin: 0.6em 0 0; font-size: 0.9em; color: #595959; }
  dl.stats dt { font-weight: bold; }
  dl.stats dd { margin: 0; }

  /* ---- Footer ---- */
  #footer { clear: both; padding: 1.2em; background: #900; color: #fff; margin-top: 1em; }
  #footer .menu { display: flex; gap: 1.2em; flex-wrap: wrap; margin-bottom: 0.5em; }
  #footer a { color: #fff; text-decoration: underline; }
`;

// AO3 es un sitio de escritorio: el mock está maquetado para ~1100px (columnas
// flotadas al 15%/21%). Renderizamos el iframe siempre a ese ancho y lo
// escalamos con transform para que quepa en la columna sin descuadrarse.
const DESKTOP_WIDTH = 1100;
const VISIBLE_HEIGHT = 600;

export function Preview() {
  const config = useSkinStore((state) => state.config);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const [scale, setScale] = useState(1);
  const [showSkin, setShowSkin] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
    doc.close();
    setIframeBody(doc.body);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Medición inicial explícita + listener de resize: algunos entornos no
    // entregan la entrada inicial del ResizeObserver.
    const update = () => setScale(Math.min(1, el.clientWidth / DESKTOP_WIDTH));
    update();
    window.addEventListener('resize', update);
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(el);
    return () => {
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, []);

  const css = generateCSS(config);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="truncate rounded-md bg-blush/60 px-2 py-0.5 font-mono text-xs text-soft">
            archiveofourown.org
          </span>
        </div>
        <div
          role="tablist"
          aria-label="Comparar preview"
          className="inline-flex shrink-0 rounded-full border border-line bg-blush p-0.5"
        >
          {[
            { value: false, label: 'AO3 original' },
            { value: true, label: 'Con mi skin' },
          ].map(({ value, label }) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={showSkin === value}
              onClick={() => setShowSkin(value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                showSkin === value ? 'bg-wine text-white shadow-sm' : 'text-soft hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full bg-white"
        style={{ height: VISIBLE_HEIGHT }}
      >
        <iframe
          ref={iframeRef}
          title="Vista previa del skin"
          sandbox="allow-same-origin"
          className="h-full w-full bg-white"
        />
        {iframeBody &&
          createPortal(
            <>
              <style>{BASE_STYLES}</style>
              {/* La escala vive dentro del documento (no en el elemento iframe):
                  el body se maqueta a ancho desktop y se reduce con zoom.
                  zoom (y no transform: scale) porque sí recalcula el layout:
                  la altura de scroll coincide con lo visible y no queda un
                  bloque en blanco después del footer. */}
              <style>{`
                html { overflow-x: hidden; }
                body { width: ${DESKTOP_WIDTH}px; zoom: ${scale}; }
              `}</style>
              {showSkin && <style>{css}</style>}
              <MockAO3Layout />
            </>,
            iframeBody
          )}
      </div>
    </div>
  );
}
