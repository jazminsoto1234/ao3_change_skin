'use client';

// F3-7: layout de dos columnas (PRD §10.1) — ControlPanel a la izquierda,
// Preview a la derecha. El header explica el flujo en 3 pasos para usuarios
// sin conocimientos de código (PRD §12: copy que invita, no intimida).
import { ControlPanel } from './ControlPanel';
import { Preview } from '../preview/Preview';
import { CSSOutput } from '../output/CSSOutput';

const STEPS = ['Personaliza tu skin', 'Copia el código', 'Pégalo en AO3'];

export function Editor() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Dale tu estilo a <span className="text-wine">Archive of Our Own</span>
        </h1>
        <p className="max-w-xl text-sm text-soft sm:text-base">
          Elige colores, letras y fondos, mira el resultado al instante y llévate el
          código listo para pegar. No hace falta saber programar.
        </p>
        <ol className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-wine/25 bg-blush text-xs font-bold text-wine">
                  {i + 1}
                </span>
                <span className="font-medium text-ink">{step}</span>
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="hidden h-px w-8 bg-line sm:block" />
              )}
            </li>
          ))}
        </ol>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full lg:w-[380px] lg:shrink-0">
          <ControlPanel />
        </aside>
        <section className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3 px-1">
              <h2 className="text-sm font-semibold text-ink">Vista previa en vivo</h2>
              <p className="text-xs text-soft">Así se verá AO3 con tu skin</p>
            </div>
            <Preview />
          </div>
          <CSSOutput />
        </section>
      </div>
    </div>
  );
}
