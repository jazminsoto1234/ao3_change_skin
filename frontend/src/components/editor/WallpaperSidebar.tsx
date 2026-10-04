'use client';

// F2-2: presets agrupados por categoría en secciones plegables. El preset
// activo se pinta burdeos; aplicar uno pide confirmación si hay cambios sin
// guardar para no pisar trabajo.
import { useState } from 'react';
import { TEMPLATE_CATEGORIES, TEMPLATES, type Template, type TemplateCategory } from '@/lib/templates';
import { isDirty, useSkinStore } from '@/store/useSkinStore';
import { ColorDots } from '@/components/ui/ColorDots';

export function WallpaperSidebar() {
  const source = useSkinStore((state) => state.source);
  const dirty = useSkinStore(isDirty);
  const applyTemplate = useSkinStore((state) => state.applyTemplate);
  const [open, setOpen] = useState<Record<TemplateCategory, boolean>>({
    classics: true,
    accessibility: true,
    themed: false,
  });

  const activeId = source?.kind === 'template' ? source.id : null;

  const handleSelect = (template: Template) => {
    if (template.id === activeId && !dirty) return;
    if (
      dirty &&
      !window.confirm(`Applying "${template.name}" will replace your unsaved changes. Continue?`)
    ) {
      return;
    }
    applyTemplate(template);
  };

  return (
    <div className="rounded-xl border border-line bg-surface px-4 pb-6 pt-4 lg:sticky lg:top-4 lg:min-h-[calc(100vh-2rem)]">
      <h2 className="font-serif text-[19px] font-semibold leading-snug">
        Archive of Our Own Wallpapers
      </h2>

      {TEMPLATE_CATEGORIES.map((category) => {
        const isOpen = open[category.id];
        const templates = TEMPLATES.filter((t) => t.category === category.id);
        return (
          <section key={category.id} className="mt-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen((prev) => ({ ...prev, [category.id]: !prev[category.id] }))}
              className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wide"
            >
              {category.label}
              <span aria-hidden className="text-base leading-none">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="mt-3 flex flex-col gap-2">
                {templates.map((template) => {
                  const active = template.id === activeId;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => handleSelect(template)}
                      aria-pressed={active}
                      className={`flex flex-col items-start gap-1 rounded-lg border px-3 pb-3 pt-2.5 text-left transition-colors ${
                        active
                          ? 'border-burgundy bg-burgundy text-white'
                          : 'border-line bg-surface hover:border-ink/40'
                      }`}
                    >
                      <ColorDots
                        colors={template.previewColors}
                        ringClassName={active ? 'border-white' : 'border-black/15'}
                      />
                      <span className="mt-1.5 font-serif text-[15px] font-semibold">
                        {template.name}
                      </span>
                      <span className={`text-[11px] ${active ? 'text-white/90' : 'text-soft'}`}>
                        {template.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
