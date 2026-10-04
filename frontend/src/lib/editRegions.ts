// Zonas del preview que se pueden clickear para abrir la nube de edición.
// El mock marca cada zona con data-edit="<id>"; el click toma la más interna.
export type EditRegion =
  | 'page'
  | 'header'
  | 'nav'
  | 'heading'
  | 'blurb'
  | 'tag'
  | 'link'
  | 'filters'
  | 'button';

export const EDIT_ATTR = 'data-edit';

export const REGION_LABELS: Record<EditRegion, string> = {
  page: 'Page',
  header: 'Header',
  nav: 'Navigation bar',
  heading: 'Headings',
  blurb: 'Work cards',
  tag: 'Tags',
  link: 'Links',
  filters: 'Sort and Filter panel',
  button: 'Buttons',
};

// Colores con los que el mock pinta cada zona cuando el campo está en null
// (estilo nativo): es lo que muestra el selector de color antes de editar.
export const NATIVE_COLORS = {
  headerBgColor: '#f1f0f6',
  headerTextColor: '#990000',
  navBgColor: '#990000',
  navTextColor: '#ffffff',
  headingColor: '#111111',
  blurbBgColor: '#ffffff',
  tagBgColor: '#f6e6e8',
  tagTextColor: '#990000',
  buttonBgColor: '#990000',
  buttonTextColor: '#ffffff',
  filtersBgColor: '#efefef',
} as const;

export const NATIVE_HEADING_FONT = 'Georgia, serif';

export const isEditRegion = (value: string | null | undefined): value is EditRegion =>
  !!value && value in REGION_LABELS;
