'use client';

// F4-2: inyecta generateCSS(config) dentro de un iframe propio (about:blank,
// sandboxed) para que las reglas que targetean `body`, `#outer`, etc. (ver
// selectors.ts) matcheen contra un documento real sin filtrar el CSS del
// preview hacia el resto de la app. El markup (MockAO3Layout) se monta ahí
// mismo vía createPortal, así se re-renderiza en vivo con cada cambio del store.
// Click en una zona marcada con data-edit abre la nube de edición (EditPopover).
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSkinStore } from '@/store/useSkinStore';
import { generateCSS } from '@/lib/cssGenerator';
import { EDIT_ATTR, isEditRegion, type EditRegion } from '@/lib/editRegions';
import { MockAO3Layout } from './mockAO3Layout';
import { BASE_STYLES, EDIT_STYLES, FONTS_HREF } from './previewStyles';
import { EditPopover, type AnchorRect } from './EditPopover';

// AO3 es un sitio de escritorio: el mock se maqueta a este ancho y el iframe
// entero se escala con transform para caber en la columna. El alto del iframe
// sigue al contenido (sin scroll interno): la página scrollea completa.
const DESKTOP_WIDTH = 1044;
// Zonas más altas que esto (la página, una tarjeta larga) anclan la nube en
// el punto del click en vez de en el borde del elemento.
const MAX_ANCHOR_HEIGHT = 260;

interface Selection {
  region: EditRegion;
  el: HTMLElement;
  clickX: number;
  clickY: number;
}

export function Preview() {
  const config = useSkinStore((state) => state.config);
  const showSkin = useSkinStore((state) => state.showSkin);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(1200);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(
      `<!DOCTYPE html><html><head><link rel="stylesheet" href="${FONTS_HREF}"></head><body></body></html>`
    );
    doc.close();
    setIframeBody(doc.body);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / DESKTOP_WIDTH));
    update();
    window.addEventListener('resize', update);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(el);
    return () => {
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, []);

  // Alto del iframe = alto del contenido.
  useEffect(() => {
    if (!iframeBody) return;
    const update = () => setContentHeight(iframeBody.offsetHeight);
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(iframeBody);
    return () => observer?.disconnect();
  }, [iframeBody]);

  // Hover + click dentro del iframe.
  useEffect(() => {
    const doc = iframeBody?.ownerDocument;
    if (!doc) return;
    let hovered: Element | null = null;

    const regionAt = (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof doc.defaultView!.Element)) return null;
      return target.closest<HTMLElement>(`[${EDIT_ATTR}]`);
    };
    const setHovered = (el: Element | null) => {
      hovered?.removeAttribute('data-edit-hover');
      hovered = el;
      hovered?.setAttribute('data-edit-hover', '');
    };

    const onOver = (event: MouseEvent) => setHovered(regionAt(event.target));
    const onLeave = () => setHovered(null);
    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      const el = regionAt(event.target);
      const region = el?.getAttribute(EDIT_ATTR);
      if (!el || !isEditRegion(region)) return;
      setSelection({ region, el, clickX: event.clientX, clickY: event.clientY });
    };
    const onSubmit = (event: Event) => event.preventDefault();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelection(null);
    };

    doc.addEventListener('mouseover', onOver);
    doc.documentElement.addEventListener('mouseleave', onLeave);
    doc.addEventListener('click', onClick);
    doc.addEventListener('submit', onSubmit);
    doc.addEventListener('keydown', onKey);
    return () => {
      setHovered(null);
      doc.removeEventListener('mouseover', onOver);
      doc.documentElement.removeEventListener('mouseleave', onLeave);
      doc.removeEventListener('click', onClick);
      doc.removeEventListener('submit', onSubmit);
      doc.removeEventListener('keydown', onKey);
    };
  }, [iframeBody]);

  useEffect(() => {
    if (!selection) return;
    selection.el.setAttribute('data-edit-active', '');
    return () => selection.el.removeAttribute('data-edit-active');
  }, [selection]);

  // Posición de la zona en coordenadas de la ventana (iframe escalado).
  const measure = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !selection) return;
    const frame = iframe.getBoundingClientRect();
    const rect = selection.el.getBoundingClientRect();
    if (rect.height > MAX_ANCHOR_HEIGHT) {
      setAnchor({
        left: frame.left + selection.clickX * scale,
        top: frame.top + selection.clickY * scale,
        width: 0,
        height: 0,
      });
      return;
    }
    setAnchor({
      left: frame.left + rect.left * scale,
      top: frame.top + rect.top * scale,
      width: rect.width * scale,
      height: rect.height * scale,
    });
  }, [selection, scale]);

  useEffect(() => {
    if (!selection) return;
    const frame = requestAnimationFrame(measure);
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [selection, measure, config, showSkin, contentHeight]);

  const closePopover = useCallback(() => {
    setSelection(null);
    setAnchor(null);
  }, []);

  const css = generateCSS(config);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-ink bg-white"
      style={{ height: contentHeight * scale }}
    >
      <iframe
        ref={iframeRef}
        title="Skin preview"
        sandbox="allow-same-origin"
        className="absolute left-0 top-0 origin-top-left border-0 bg-white"
        style={{
          width: DESKTOP_WIDTH,
          height: contentHeight,
          transform: `scale(${scale})`,
        }}
      />
      {iframeBody &&
        createPortal(
          <>
            <style>{BASE_STYLES}</style>
            {showSkin && <style>{css}</style>}
            <style>{EDIT_STYLES}</style>
            <MockAO3Layout />
          </>,
          iframeBody
        )}
      {selection && anchor && (
        <EditPopover region={selection.region} anchor={anchor} onClose={closePopover} />
      )}
    </div>
  );
}
