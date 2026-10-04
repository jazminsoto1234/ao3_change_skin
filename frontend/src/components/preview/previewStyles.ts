// Aproximación al CSS nativo de AO3 para el mock del preview ("Original AO3").
// Reproduce el layout del diseño (header claro, barra roja, listado + panel
// Sort and Filter, tags en chips). El skin (generateCSS) se inyecta DESPUÉS y
// pisa colores/bordes/tipografía.
// Ojo con la especificidad: generateCSS usa selectores con varios ids
// (#outer #inner #main ...) y genéricos como input:not(#header *). Los
// fondos de header/footer/botones van como background-image (igual que las
// texturas reales de AO3) para que el "background-color: transparent" del
// skin no los borre.
export const BASE_STYLES = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #2a2a2a;
    background: #ffffff;
  }
  a { color: #990000; text-decoration: none; cursor: pointer; }
  ul, ol { list-style: none; margin: 0; padding: 0; }
  h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: normal; }
  p, dl, dd, blockquote { margin: 0; }

  /* ---- Header ---- */
  #header { background-image: linear-gradient(#f1f0f6, #f1f0f6); }
  #header .top {
    display: flex; align-items: center; justify-content: space-between;
    height: 62px; padding: 0 48px;
  }
  #header .heading { font-family: Georgia, serif; font-size: 26px; font-weight: 600; line-height: 1.2; }
  #header .heading a { color: #990000; text-decoration: none; }
  #header ul.user { display: flex; gap: 22px; }
  #header ul.user a { color: #111111; font-size: 15px; font-weight: 500; text-decoration: none; }
  #header ul.primary {
    display: flex; align-items: center; height: 30px; padding: 0 16px;
    background: #990000;
  }
  #header ul.primary > li.dropdown { width: 162px; }
  #header ul.primary > li > a { color: #ffffff; font-size: 14.5px; font-weight: 500; text-decoration: none; }
  #header ul.primary > li.search { margin-left: auto; margin-right: 100px; }
  #header #search { position: relative; }
  #header #search input {
    width: 282px; height: 20px; padding: 0 26px 0 10px; border: none; border-radius: 3px;
    background: #ffffff; color: #111111; font: inherit; font-size: 12px;
  }
  #header #search .magnifier {
    position: absolute; right: 11px; top: 4px; width: 10px; height: 10px;
    border: 1.6px solid #333333; border-radius: 50%;
  }
  #header #search .magnifier::after {
    content: ''; position: absolute; right: -5px; bottom: -3px; width: 5px; height: 1.6px;
    background: #333333; transform: rotate(45deg);
  }

  /* ---- Main: listado + Sort and Filter ---- */
  #main {
    display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 32px;
    align-items: start; padding: 40px 48px 48px;
  }
  #main h2.heading { font-family: Georgia, serif; font-size: 28px; font-weight: 700; line-height: 1.3; color: #111111; }
  ol.pagination {
    display: flex; justify-content: center; align-items: center; gap: 8px;
    margin: 14px 0 24px; font-size: 14px;
  }
  ol.pagination .previous span { color: #777777; margin-right: 2px; }
  ol.pagination li > span.current,
  ol.pagination li > a {
    display: grid; place-items: center; min-width: 28px; height: 28px; padding: 0 4px;
    border: 1px solid #cccccc; border-radius: 3px; background: #ffffff; color: #111111; text-decoration: none;
  }
  ol.pagination li > span.current { background: #990000; border-color: #990000; color: #ffffff; }
  ol.pagination li.next > a { border: none; background: none; color: #990000; font-weight: 600; margin-left: 2px; }

  /* ---- Blurb (tarjeta de work) ---- */
  ol.work.index { display: flex; flex-direction: column; gap: 18px; }
  li.blurb { position: relative; background: #ffffff; border: 1px solid #dddddd; border-radius: 3px; padding: 20px 20px 14px; }
  li.blurb .header { position: relative; min-height: 36px; padding-left: 50px; margin-bottom: 10px; }
  li.blurb ul.required-tags {
    position: absolute; left: 0; top: 2px;
    display: grid; grid-template-columns: 16px 16px; gap: 2px;
  }
  li.blurb ul.required-tags span { display: block; width: 16px; height: 16px; border-radius: 2px; }
  li.blurb .rating { background: #e8a600; }
  li.blurb .category { background: #d9d9d9; }
  li.blurb .warnings { background: #d6408f; }
  li.blurb .iswip { background: #17a03b; }
  li.blurb h4.heading { padding-right: 110px; font-size: 14px; line-height: 1.4; color: #555555; }
  li.blurb h4.heading a:first-child {
    font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #990000; text-decoration: none;
  }
  li.blurb h4.heading a[rel="author"] { font-weight: 600; color: #990000; text-decoration: underline; }
  li.blurb .datetime { position: absolute; top: 0; right: 0; font-size: 12px; color: #555555; }
  li.blurb h5.fandoms { margin-top: 2px; font-size: 12px; color: #444444; }
  li.blurb h5.fandoms a { color: #111111; font-weight: 600; text-decoration: none; }
  h6.landmark { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  li.blurb ul.tags { display: flex; flex-wrap: wrap; gap: 6px 8px; margin-bottom: 12px; }
  li.blurb ul.tags a.tag {
    display: inline-block; padding: 2px 6px; border-radius: 2px;
    background: #f6e6e8; color: #990000; font-size: 12.5px; text-decoration: none;
  }
  li.blurb blockquote.summary { padding: 0 10px; margin-bottom: 12px; font-size: 13px; line-height: 1.55; }
  li.blurb dl.stats {
    display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2px 12px;
    padding-top: 6px; border-top: 1px solid #dddddd; font-size: 12px; color: #444444;
  }
  li.blurb dl.stats div { white-space: nowrap; }
  li.blurb dl.stats dt, li.blurb dl.stats dd { display: inline; }
  li.blurb dl.stats dd { color: #111111; }

  /* ---- Sort and Filter ---- */
  form.filters fieldset {
    min-width: 0; margin: 0; padding: 20px 20px 22px;
    border: 1px solid #c8c8c8; border-radius: 4px; background: #efefef;
  }
  form.filters h3.heading { margin-bottom: 14px; font-family: Georgia, serif; font-size: 19px; font-weight: 700; color: #111111; }
  form.filters label { display: block; margin-bottom: 6px; font-size: 13px; color: #222222; }
  form.filters select,
  form.filters input[type="text"] {
    width: 100%; height: 32px; padding: 0 10px; border: 1px solid #bbbbbb; border-radius: 3px;
    font: inherit; font-size: 14px; color: #111111; background-color: #ffffff;
  }
  form.filters select {
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='10'%3E%3Cpath d='M0 0h12L6 10z' fill='%23444'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  form.filters ul.expandable { margin: 14px 0 16px; }
  form.filters ul.expandable li {
    display: flex; align-items: center; justify-content: space-between; height: 48px;
    border-bottom: 1px solid #c8c8c8; font-size: 13px; font-weight: 600; color: #222222;
  }
  form.filters ul.expandable li:first-child { border-top: 1px solid #c8c8c8; }
  form.filters ul.expandable .arrow { font-size: 11px; color: #555555; }
  form.filters dl.more dd { margin-bottom: 14px; }
  #main form.filters p.submit input[type="submit"] {
    width: 100%; height: 36px; border: none; border-radius: 3px; cursor: pointer;
    background-image: linear-gradient(#990000, #990000); color: #ffffff;
    font: inherit; font-size: 14px; font-weight: 700;
  }

  /* ---- Footer ---- */
  #footer {
    padding: 22px 48px; font-size: 13px; color: #ffffff;
    background-image: linear-gradient(#990000, #990000);
  }
  #footer .menu { display: flex; gap: 20px; margin-bottom: 6px; }
  #footer a { color: #ffffff; text-decoration: underline; }
`;

// Feedback de edición: contorno al pasar el mouse y en la zona abierta.
export const EDIT_STYLES = `
  [data-edit-hover] { outline: 2px dashed rgba(153, 0, 0, 0.6) !important; outline-offset: 2px; cursor: pointer; }
  [data-edit-active] { outline: 2px solid #990000 !important; outline-offset: 2px; }
  #outer[data-edit-hover], #outer[data-edit-active] { outline-offset: -3px; }
`;

// Inter y Lora para que los presets que las usan se vean igual que en el diseño.
export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap';
