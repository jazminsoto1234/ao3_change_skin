'use client';

// F3-6: panel izquierdo del layout de dos columnas (PRD §10.1). Los controles
// se agrupan en secciones plegables (divulgación progresiva) para no abrumar
// a usuarios sin conocimientos técnicos.
import { AdvancedControls } from './AdvancedControls';
import { ColorControls, TypographyControls } from './BasicControls';
import { ModeToggle } from './ModeToggle';
import { TemplateSelector } from './TemplateSelector';
import { SaveSkinButton } from './SaveSkinButton';
import { MySkins } from '@/components/skins/MySkins';
import { Section } from '@/components/ui/Section';
import { LayersIcon, PaletteIcon, TypeIcon } from '@/components/ui/icons';

export function ControlPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Editor de skin</h2>
          <ModeToggle />
        </div>
        <p className="text-xs text-soft">
          El modo <strong>Avanzado</strong> agrega imagen de fondo, bordes y más
          opciones de letra.
        </p>
      </div>

      <Section
        icon={<LayersIcon />}
        title="Estilos listos para usar"
        hint="Elige una base y ajústala a tu gusto"
        defaultOpen
      >
        <TemplateSelector />
      </Section>

      <Section
        icon={<PaletteIcon />}
        title="Colores"
        hint="Fondo, texto y enlaces"
        defaultOpen
      >
        <ColorControls />
      </Section>

      <Section icon={<TypeIcon />} title="Texto y letra" hint="Tipo y tamaño de letra">
        <TypographyControls />
      </Section>

      <AdvancedControls />

      <SaveSkinButton />
      <MySkins />
    </div>
  );
}
