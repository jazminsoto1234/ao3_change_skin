'use client';

// Controles que muestra la nube de edición según la zona clickeada.
import { useSkinStore } from '@/store/useSkinStore';
import type { BlurbBorderStyle, RegionField, SkinConfig } from '@/types/skin';
import { NATIVE_COLORS, NATIVE_HEADING_FONT, type EditRegion } from '@/lib/editRegions';
import { BackgroundImageControl } from './BackgroundImageControl';
import { ColorPicker } from './ColorPicker';
import { FontSelector } from './FontSelector';
import { SizeSlider } from './SizeSlider';

// Campos que toca cada zona: "Reset this section" los vuelve al baseline.
export const REGION_FIELDS: Record<EditRegion, (keyof SkinConfig)[]> = {
  page: [
    'backgroundColor',
    'textColor',
    'fontFamily',
    'fontSize',
    'lineHeight',
    'maxWidth',
    'backgroundImage',
    'backgroundRepeat',
    'backgroundSize',
    'backgroundPosition',
    'backgroundOverlayColor',
    'backgroundOverlayOpacity',
  ],
  header: ['headerBgColor', 'headerTextColor'],
  nav: ['navBgColor', 'navTextColor'],
  heading: ['headingColor', 'headingFont'],
  blurb: ['blurbBgColor', 'blurbBorderStyle', 'blurbBorderColor', 'blurbBorderWidth'],
  tag: ['tagBgColor', 'tagTextColor'],
  link: ['linkColor', 'linkVisitedColor'],
  filters: ['filtersBgColor'],
  button: ['buttonBgColor', 'buttonTextColor'],
};

const BORDER_STYLES: { value: BlurbBorderStyle; label: string }[] = [
  { value: 'none', label: 'No border' },
  { value: 'solid', label: 'Solid line' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
];

type ColorField = Exclude<RegionField, 'headingFont'>;

function RegionColor({ field, label }: { field: ColorField; label: string }) {
  const value = useSkinStore((state) => state.config[field]);
  const updateConfig = useSkinStore((state) => state.updateConfig);
  return (
    <ColorPicker
      label={label}
      value={value ?? NATIVE_COLORS[field]}
      onChange={(hex) => updateConfig({ [field]: hex })}
    />
  );
}

export function RegionControls({ region }: { region: EditRegion }) {
  const config = useSkinStore((state) => state.config);
  const updateConfig = useSkinStore((state) => state.updateConfig);

  switch (region) {
    case 'page':
      return (
        <>
          <ColorPicker
            label="Background"
            value={config.backgroundColor}
            onChange={(backgroundColor) => updateConfig({ backgroundColor })}
          />
          <ColorPicker
            label="Text"
            value={config.textColor}
            onChange={(textColor) => updateConfig({ textColor })}
          />
          <FontSelector
            label="Reading font"
            value={config.fontFamily}
            onChange={(fontFamily) => updateConfig({ fontFamily })}
          />
          <SizeSlider
            label="Font size"
            value={config.fontSize}
            onChange={(fontSize) => updateConfig({ fontSize })}
            min={12}
            max={24}
            unit="px"
          />
          <SizeSlider
            label="Line spacing"
            value={config.lineHeight}
            onChange={(lineHeight) => updateConfig({ lineHeight })}
            min={1}
            max={2.5}
            step={0.1}
          />
          <SizeSlider
            label="Reading width"
            value={config.maxWidth}
            onChange={(maxWidth) => updateConfig({ maxWidth })}
            min={40}
            max={120}
            unit="ch"
          />
          <details className="group rounded-lg border border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-[13px] font-semibold [&::-webkit-details-marker]:hidden">
              Background image
              <span aria-hidden className="text-soft group-open:hidden">
                +
              </span>
              <span aria-hidden className="hidden text-soft group-open:inline">
                −
              </span>
            </summary>
            <div className="border-t border-line p-3">
              <BackgroundImageControl />
            </div>
          </details>
        </>
      );
    case 'header':
      return (
        <>
          <RegionColor field="headerBgColor" label="Background" />
          <RegionColor field="headerTextColor" label="Title & links" />
        </>
      );
    case 'nav':
      return (
        <>
          <RegionColor field="navBgColor" label="Background" />
          <RegionColor field="navTextColor" label="Text" />
        </>
      );
    case 'heading':
      return (
        <>
          <RegionColor field="headingColor" label="Color" />
          <FontSelector
            label="Heading font"
            value={config.headingFont ?? NATIVE_HEADING_FONT}
            onChange={(headingFont) => updateConfig({ headingFont })}
          />
        </>
      );
    case 'blurb':
      return (
        <>
          <RegionColor field="blurbBgColor" label="Background" />
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <label htmlFor="blurb-border-style" className="font-medium">
              Border
            </label>
            <select
              id="blurb-border-style"
              value={config.blurbBorderStyle}
              onChange={(event) =>
                updateConfig({ blurbBorderStyle: event.target.value as BlurbBorderStyle })
              }
              className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[13px] focus:border-ink focus:outline-none"
            >
              {BORDER_STYLES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {config.blurbBorderStyle !== 'none' && (
            <>
              <ColorPicker
                label="Border color"
                value={config.blurbBorderColor}
                onChange={(blurbBorderColor) => updateConfig({ blurbBorderColor })}
              />
              <SizeSlider
                label="Border width"
                value={config.blurbBorderWidth}
                onChange={(blurbBorderWidth) => updateConfig({ blurbBorderWidth })}
                min={0}
                max={10}
                unit="px"
              />
            </>
          )}
        </>
      );
    case 'tag':
      return (
        <>
          <RegionColor field="tagBgColor" label="Background" />
          <RegionColor field="tagTextColor" label="Text" />
        </>
      );
    case 'link':
      return (
        <>
          <ColorPicker
            label="Links"
            value={config.linkColor}
            onChange={(linkColor) => updateConfig({ linkColor })}
          />
          <ColorPicker
            label="Visited links"
            value={config.linkVisitedColor}
            onChange={(linkVisitedColor) => updateConfig({ linkVisitedColor })}
          />
        </>
      );
    case 'filters':
      return <RegionColor field="filtersBgColor" label="Background" />;
    case 'button':
      return (
        <>
          <RegionColor field="buttonBgColor" label="Background" />
          <RegionColor field="buttonTextColor" label="Text" />
        </>
      );
  }
}
