// F0-2: Selectores de AO3 centralizados.
// Única fuente de verdad para selectores CSS de AO3.
// Consumido por cssGenerator.ts y mockAO3Layout.tsx.
// Verificado contra: DevTools 2026-07-15, skin comunitaria modo nocturno.
// Documentación completa: frontend/selectors_vf.md

export const SELECTORS = {
  // === Globales ===
  BODY: 'body',
  OUTER: '#outer',
  INNER: '#inner',
  MAIN: '#main',
  MAIN_WORKS_INDEX: '#main .works-index',

  // Contenedor de ancho de lectura (config.maxWidth). No usar #main/#outer:
  // esos son contenedores estructurales que en páginas con sidebar de
  // filtros (works index, etc.) sostienen un layout de columnas en float;
  // limitarles el ancho rompe ese layout. .userstuff a secas también matchea
  // blockquote.userstuff.summary dentro de cada .blurb del listado (ver
  // selectors_vf.md líneas 64/277), así que un ".userstuff" genérico centra
  // el summary de las tarjetas del listado, no solo el capítulo. Se acota a
  // ".chapter .userstuff" (texto del capítulo dentro de la página del work,
  // ver selectors_vf.md línea 291-297) para dejar el summary del listado con
  // su ancho nativo de AO3.
  READING_WIDTH_SELECTORS: ['.chapter .userstuff'],

  // Selector para font-size/line-height (config.fontSize/lineHeight).
  // Deliberadamente solo 'body': la herencia normal de CSS basta para que
  // llegue al texto de lectura. NO reusar TEXT_COLOR_SELECTORS acá — ese
  // grupo incluye fieldset/table/th/textarea/input/#modal/.ui-sortable li,
  // y el CSS nativo de AO3 define el padding/alto de esos elementos en `em`
  // relativo a su propio font-size. Forzar un font-size fijo ahí con
  // !important reescala ese padding/alto y rompe formularios, tablas,
  // modales y la lista drag-and-drop de tag wrangling en el sitio real
  // (bug reportado 2026-07-18: layout roto en AO3 real, invisible en el
  // preview local porque el mock no replica ese CSS nativo).
  FONT_SIZE_SELECTORS: ['body'],

  // === Header ===
  HEADER: '#header',
  HEADER_HEADING_A: '#header .heading a',
  HEADER_HEADING_A_VISITED: '#header .heading a:visited',
  HEADER_PRIMARY: '#header ul.primary',
  HEADER_PRIMARY_DROPDOWN_HOVER_A: '#header .primary .dropdown:hover a',
  HEADER_PRIMARY_DROPDOWN_A_FOCUS: '#header .primary .dropdown a:focus',
  HEADER_PRIMARY_OPEN_A: '#header .primary .open a',
  HEADER_DROPDOWN_MENU: '#header .dropdown .menu',
  HEADER_DROPDOWN_MENU_A_HOVER: '#header .dropdown .menu a:hover',
  HEADER_DROPDOWN_MENU_A_FOCUS: '#header .dropdown .menu a:focus',
  HEADER_ACTIONS: '#header .actions',
  HEADER_ACTIONS_A: '#header .actions a',
  HEADER_ACTIONS_A_HOVER: '#header .actions a:hover',
  HEADER_ACTIONS_CURRENT: '#header .actions .current',
  HEADER_GREETING: '#header #greeting',
  HEADER_GREETING_IMG: '#header #greeting img',
  HEADER_SEARCH_INPUT_FOCUS: '#header #search input:focus',
  HEADER_SEARCH_INPUT_HOVER: '#header #search input:hover',
  HEADER_USER_A_HOVER: '#header .user a:hover',
  HEADER_USER_CURRENT: '#header .user .current',
  HEADER_A: '#header a',
  HEADER_A_VISITED: '#header a:visited',
  HEADER_CURRENT: '#header .current',
  SMALL_LOGIN: '#small_login',

  // === Footer ===
  FOOTER: '#footer',
  FOOTER_A_HOVER: '#footer a:hover',
  FOOTER_OUTER: '#outer #footer',

  // === Links (globales) ===
  A: 'a',
  A_LINK: 'a:link',
  A_VISITED: 'a:visited',
  A_HOVER: 'a:hover',
  A_FOCUS: 'a:focus',
  A_ACTIVE: 'a:active',
  A_TAG: 'a.tag',
  A_TAG_HOVER: 'a.tag:hover',

  // === Works / Blurbs ===
  WORK: '.work',
  WORK_INDEX_GROUP: 'ol.work.index.group',
  BLURB: '#main li.blurb',
  BLURB_GENERIC: '.blurb',
  BLURB_HEADER_MODULE: '.blurb .header.module',
  BLURB_H4_HEADING: '.blurb h4.heading',
  BLURB_H4_HEADING_A: '.blurb h4.heading a',
  BLURB_H4_HEADING_A_LINK: '.blurb h4.heading a:link',
  BLURB_FANDOMS_HEADING: '.blurb h5.fandoms.heading',
  BLURB_REQUIRED_TAGS: '.blurb .required-tags',
  BLURB_REQUIRED_TAGS_GLOBAL: 'ul.required-tags',
  BLURB_DATETIME: '.blurb .datetime',
  BLURB_TAGS_COMMAS: '.blurb .tags.commas',
  BLURB_TAG: '.blurb .tag',
  BLURB_STATS: '.blurb .stats',
  BLURB_STATS_LANGUAGE_DT: '.blurb .stats dt.language',
  BLURB_STATS_LANGUAGE_DD: '.blurb .stats dd.language',
  BLURB_STATS_WORDS_DT: '.blurb .stats dt.words',
  BLURB_STATS_WORDS_DD: '.blurb .stats dd.words',
  BLURB_STATS_CHAPTERS_DT: '.blurb .stats dt.chapters',
  BLURB_STATS_CHAPTERS_DD: '.blurb .stats dd.chapters',
  BLURB_STATS_KUDOS_DT: '.blurb .stats dt.kudos',
  BLURB_STATS_KUDOS_DD: '.blurb .stats dd.kudos',
  BLURB_STATS_HITS_DT: '.blurb .stats dt.hits',
  BLURB_STATS_HITS_DD: '.blurb .stats dd.hits',

  // === Capítulos y texto ===
  CHAPTER: '.chapter',
  USERSTUFF: '.userstuff',
  USERSTUFF_BLOCKQUOTE: 'blockquote.userstuff',
  USERSTUFF_SUMMARY: '.blurb .summary',
  USERSTUFF_P: '.userstuff p',
  USERSTUFF_H2: '.userstuff h2',
  USERSTUFF_HEADING: '.userstuff .heading',

  // === Headings y landmarks ===
  HEADING: '.heading',
  HEADING_H2: 'h2.heading',
  HEADING_H3: 'h3.heading',
  LANDMARK: '.landmark',
  LANDMARK_HEADING: '.landmark.heading',

  // === Formularios y botones ===
  INPUT: 'input',
  TEXTAREA: 'textarea',
  INPUT_FOCUS: 'input:focus',
  TEXTAREA_FOCUS: 'textarea:focus',
  INPUT_SUBMIT: 'input[type="submit"]',
  BUTTON: 'button',
  ACTIONS_A: '.actions a',
  ACTIONS_A_LINK: '.actions a:link',
  ACTIONS_A_VISITED: '.actions a:visited',
  ACTIONS_A_HOVER: '.actions a:hover',
  ACTIONS_A_FOCUS: '.actions a:focus',
  ACTIONS_A_ACTIVE: '.actions a:active',
  ACTIONS_INPUT: '.actions input',
  ACTIONS_INPUT_HOVER: '.actions input:hover',
  DELETE_A: '.delete a',
  CURRENT: '.current',
  A_CURRENT: 'a.current',
  CURRENT_A_VISITED: '.current a:visited',

  // === Sistema: notices, flash, modals ===
  NOTICE: '.notice',
  FLASH: '.flash',
  ERROR: '.error',
  COMMENT_ERROR: '.comment_error',
  REQUIRED: '.required',
  MODAL: '#modal',
  SYMBOL_QUESTION: '.symbol .question',
  SYMBOL_QUESTION_HOVER: '.symbol .question:hover',

  // === Dashboard ===
  DASHBOARD: '#dashboard',
  DASHBOARD_A: '#dashboard a',
  DASHBOARD_A_HOVER: '#dashboard a:hover',
  DASHBOARD_CURRENT: '#dashboard .current',
  DASHBOARD_SECONDARY: '#dashboard .secondary',
  DASHBOARD_UL: '#dashboard ul',

  // === Comentarios ===
  COMMENT: '.comment',
  COMMENT_DIV: 'div.comment',
  COMMENT_LI: 'li.comment',
  COMMENT_THREAD: '.thread .comment',
  COMMENT_THREAD_EVEN: '.thread .even',
  COMMENT_OWN: '.own',

  // === Tags (lista expandida) ===
  TAGS_UL: 'ul.tags',
  TAGS_LI_WARNINGS: 'ul.tags li.warnings',
  TAGS_LI_RELATIONSHIPS: 'ul.tags li.relationships',
  TAGS_LI_CHARACTERS: 'ul.tags li.characters',
  TAGS_LI_FREEFORMS: 'ul.tags li.freeforms',

  // === Misceláneos ===
  GROUP: '.group',
  SECONDARY: '.secondary',
  REGION: '.region',
  LISTBOX: '.group.listbox',
  LISTBOX_INDEX: '.listbox .index',
  LISTBOX_HEADING: '.listbox .heading',
  FIELD_SET: 'fieldset',
  FIELD_SET_FIELDSET: 'fieldset fieldset',
  FIELD_SET_LISTBOX: 'fieldset fieldset.listbox',
  FIELD_SET_LISTBOX_HEADING: 'fieldset.listbox .heading',
  DL_META: 'dl.meta',
  BOOKMARK_STATUS_SPAN: '.bookmark .status span',
  SERIES: '.blurb .series',
  SERIES_UL: 'ul.series',
  SERIES_SPAN_DIVIDER: 'span.series .divider',
  BLURB_BLURB: '.blurb .blurb',
  BLURB_ICON: '.blurb .icon',
  BLURB_RELATIONSHIPS: '.blurb .relationships',

  // === Announcements ===
  ANNOUNCEMENT_USERSTUFF_A: '.announcement .userstuff a',
  ANNOUNCEMENT_USERSTUFF_A_LINK: '.announcement .userstuff a:link',
  ANNOUNCEMENT_USERSTUFF_A_VISITED: '.announcement .userstuff a:visited',
  ANNOUNCEMENT_USERSTUFF_A_VISITED_HOVER: '.announcement .userstuff a:visited:hover',
  ANNOUNCEMENT_USERSTUFF_A_HOVER: '.announcement .userstuff a:hover',

  // === Composición de selectores para reglas generadas por SkinConfig ===
  // Estos agrupan selectores que comparten la misma propiedad según SkinConfig.

  // background-color del fondo general
  // Nota: .group/.region/.flash/etc. no están scopeados por AO3 y el sitio
  // reutiliza esas mismas clases dentro de #footer (columnas del footer) y
  // dentro de #header (barra .primary, botones .actions, input de #search).
  // :not(#footer *):not(#header *) evita que estas reglas pisen esas zonas:
  // el skin no las toca, quedan con su apariencia nativa de AO3.
  BODY_BG_SELECTORS: [
    'body',
    '#outer',
    '.group:not(#footer):not(#footer *):not(#header *)',
    '.group .group:not(#footer *):not(#header *)',
    '.region:not(#footer *):not(#header *)',
    '.flash:not(#footer *):not(#header *)',
    'fieldset',
    'fieldset fieldset ul',
    '#main .verbose legend',
    '.verbose fieldset',
    'input:not(#header *)',
    'textarea',
    'table',
    'th',
    '#modal',
    '#ui-datepicker-div',
    '.ui-datepicker table',
  ],

  // background-color para blurb/listbox/secondary
  SECONDARY_BG_SELECTORS: [
    '.group.listbox',
    'fieldset fieldset.listbox',
    'form blockquote.userstuff',
    '#dashboard .secondary',
    '.secondary:not(#footer *)',
    '.thread .even',
  ],

  // color del texto general
  // #header queda afuera a propósito (ver nota de BODY_BG_SELECTORS): toda
  // la franja del header (logo, greeting, Post/Log Out, buscador, barra
  // .primary) se queda con su apariencia nativa de AO3, el skin no la toca.
  TEXT_COLOR_SELECTORS: [
    'body',
    '.group:not(#footer *):not(#header *)',
    '.group .group:not(#footer *):not(#header *)',
    '.region:not(#footer *):not(#header *)',
    '.flash:not(#footer *):not(#header *)',
    'fieldset',
    'fieldset fieldset ul',
    'form dl',
    'textarea',
    '#main .verbose legend',
    '.verbose fieldset',
    '.notice',
    'ul.notes',
    'input:not(#header *)',
    'textarea',
    'table',
    'th',
    '#modal',
    '.ui-sortable li',
    '.system .intro',
    '.comment_error',
  ],

  // color de links
  // Nota: '#header a' queda afuera a propósito — todo el header (logo,
  // greeting, Post/Log Out, barra .primary) se deja con su apariencia nativa
  // de AO3, el skin no lo toca.
  LINK_COLOR_SELECTORS: [
    'a:not(#footer *):not(#header *)',
    'a:link:not(#footer *):not(#header *)',
    'a.tag',
    '#dashboard a',
    '#dashboard .current',
    '.heading:not(#footer *):not(#header *)',
    '.group .heading:not(#footer *):not(#header *)',
  ],

  // color de links visitados
  LINK_VISITED_COLOR_SELECTORS: [
    'a:visited:not(#footer *):not(#header *)',
    '.actions a:visited:not(#header *)',
    '.action a:link:not(#header *)',
    '.action a:visited:not(#header *)',
    '.listbox .heading a:visited',
    'span.series .divider',
  ],

  // border-color de blurbs y listas
  BLURB_BORDER_SELECTORS: [
    '#footer',
    '#dashboard ul',
    'dl.meta',
    '.group.listbox',
    'fieldset fieldset.listbox',
    '#main li.blurb',
    'form blockquote.userstuff',
    'div.comment',
    'li.comment',
    '#inner .module .heading',
    '.bookmark .status span',
  ],
} as const;

export type SelectorKey = keyof typeof SELECTORS;