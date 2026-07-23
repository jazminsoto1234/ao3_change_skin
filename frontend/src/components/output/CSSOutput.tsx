'use client';

// F5-1: área de código con el resultado de generateCSS(config) — el output
// final del producto (PRD §10.1: "editar → copiar → pegar en AO3"). Syntax
// highlighting básico hecho a mano línea por línea (sin dependencia externa).
import { useEffect, useRef, useState } from 'react';
import { useSkinStore } from '@/store/useSkinStore';
import { generateCSS } from '@/lib/cssGenerator';
import { CheckIcon, ChevronDownIcon, CopyIcon } from '@/components/ui/icons';

function highlightLine(line: string, key: number) {
  const trimmed = line.trim();

  if (trimmed.startsWith('/*')) {
    return (
      <div key={key}>
        <span className="text-emerald-400">{line}</span>
      </div>
    );
  }

  if (trimmed.startsWith('@import')) {
    return (
      <div key={key}>
        <span className="text-fuchsia-400">{line}</span>
      </div>
    );
  }

  if (trimmed === '}') {
    return (
      <div key={key}>
        <span className="text-slate-400">{line}</span>
      </div>
    );
  }

  if (trimmed.endsWith('{')) {
    const brace = line.lastIndexOf('{');
    return (
      <div key={key}>
        <span className="text-sky-300">{line.slice(0, brace)}</span>
        <span className="text-slate-400">{line.slice(brace)}</span>
      </div>
    );
  }

  const declaration = trimmed.match(/^([a-zA-Z-]+)(\s*:\s*)(.+?)(;?)$/);
  if (declaration) {
    const indent = line.slice(0, line.length - trimmed.length);
    const [, property, colon, value, semicolon] = declaration;
    return (
      <div key={key}>
        {indent}
        <span className="text-amber-300">{property}</span>
        <span className="text-slate-400">{colon}</span>
        <span className="text-lime-300">{value}</span>
        <span className="text-slate-400">{semicolon}</span>
      </div>
    );
  }

  return <div key={key}>{line || ' '}</div>;
}

export function CSSOutput() {
  const config = useSkinStore((state) => state.config);
  const css = generateCSS(config);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
    } catch {
      // Fallback para contextos sin permiso de clipboard (navegadores viejos,
      // iframes): textarea temporal + execCommand.
      const textarea = document.createElement('textarea');
      textarea.value = css;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold">Tu skin está listo</h2>
        <p className="text-sm text-soft">
          No necesitas entender el código: solo cópialo y pégalo en AO3.
        </p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors ${
          copied
            ? 'bg-green-600 shadow-green-600/20'
            : 'bg-wine shadow-wine/20 hover:bg-winedark'
        }`}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        {copied ? '¡Copiado! Ahora pégalo en AO3' : 'Copiar mi skin'}
      </button>

      <ol className="flex flex-col gap-2 rounded-xl bg-blush/60 p-4 text-sm">
        {[
          <>Copia el código con el botón de arriba.</>,
          <>
            En AO3, entra a{' '}
            <a
              href="https://archiveofourown.org/skins/new"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-wine underline"
            >
              My Skins → Create Site Skin
            </a>
            .
          </>,
          <>Ponle un nombre, pega el código en la casilla &quot;CSS&quot; y guarda. ¡Listo!</>,
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-wine text-[10px] font-bold text-white">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <details className="group">
        <summary className="flex cursor-pointer select-none items-center gap-1.5 text-xs font-medium text-soft transition-colors [&::-webkit-details-marker]:hidden hover:text-ink list-none">
          <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
          <span className="group-open:hidden">¿Curiosidad? Mira el código CSS</span>
          <span className="hidden group-open:inline">Ocultar el código CSS</span>
        </summary>
        <pre className="mt-2 max-h-[360px] overflow-auto rounded-xl bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-200">
          <code>{css.split('\n').map((line, i) => highlightLine(line, i))}</code>
        </pre>
      </details>
    </div>
  );
}
