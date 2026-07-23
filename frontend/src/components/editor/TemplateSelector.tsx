'use client';

// F2-2: Grid de templates prediseñados. Aplica config al store, con
// confirmación si el draft actual difiere del default (evita pisar trabajo
// sin guardar). Marca el template activo para dar feedback de selección.
import { TEMPLATES, type Template } from '@/lib/templates';
import { DEFAULT_SKIN_CONFIG } from '@/types/skin';
import { useSkinStore } from '@/store/useSkinStore';
import { CheckIcon } from '@/components/ui/icons';

export function TemplateSelector() {
  const config = useSkinStore((state) => state.config);
  const setConfig = useSkinStore((state) => state.setConfig);

  const configJson = JSON.stringify(config);
  const activeId = TEMPLATES.find((t) => JSON.stringify(t.config) === configJson)?.id;

  const hasUnsavedChanges = (): boolean =>
    configJson !== JSON.stringify(DEFAULT_SKIN_CONFIG);

  const handleSelect = (template: Template) => {
    if (template.id === activeId) return;
    if (hasUnsavedChanges()) {
      const confirmed = window.confirm(
        `Aplicar "${template.name}" reemplazará los cambios actuales del editor. ¿Continuar?`
      );
      if (!confirmed) return;
    }
    setConfig(template.config);
  };

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {TEMPLATES.map((template) => {
        const active = template.id === activeId;
        return (
          <button
            key={template.id}
            type="button"
            onClick={() => handleSelect(template)}
            title={template.description}
            aria-pressed={active}
            className={`relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition ${
              active
                ? 'border-wine bg-blush/60 shadow-sm ring-1 ring-wine'
                : 'border-line bg-surface hover:border-wine/40 hover:shadow-sm'
            }`}
          >
            {active && (
              <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-wine text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
            )}
            {/* Barra de muestra: los colores del template como franjas contiguas,
                estilo carta de pinturas — lee mejor que círculos superpuestos. */}
            <span className="flex h-3 w-full overflow-hidden rounded-full border border-black/10">
              {template.previewColors.map((color, i) => (
                <span key={i} className="flex-1" style={{ backgroundColor: color }} />
              ))}
            </span>
            <span className="text-sm font-semibold leading-tight">{template.name}</span>
            <span className="text-xs leading-snug text-soft">{template.description}</span>
          </button>
        );
      })}
    </div>
  );
}
