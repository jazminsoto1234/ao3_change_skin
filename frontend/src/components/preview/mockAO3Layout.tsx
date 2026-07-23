// F4-1: markup estático que replica la estructura real de AO3.
// Página modelada: works-index / dashboard de usuario (3 columnas), que es
// donde se ve la mayor parte del skin (blurbs, tags, stats, dashboard, filtros).
// Estructura fiel al DOM real de AO3 (ver selectors_vf.md §13).
// Todo id/clase de AO3 sale de SELECTORS (src/lib/selectors.ts) — nunca strings
// hardcodeados. Wrappers estructurales sin equivalente en SELECTORS (layout no
// estilizado por generateCSS) sí pueden ser literales.
import { SELECTORS } from '@/lib/selectors';

interface Token {
  tag?: string;
  id?: string;
  classes: string[];
}

function parseSelector(selector: string): Token[] {
  return selector
    .trim()
    .split(/\s+/)
    .map((raw) => {
      const compound = raw.split(':')[0];
      const tagMatch = compound.match(/^[a-zA-Z][a-zA-Z0-9]*/);
      const idMatch = compound.match(/#([a-zA-Z0-9_-]+)/);
      const classMatches = compound.match(/\.[a-zA-Z0-9_-]+/g) ?? [];
      return {
        tag: tagMatch ? tagMatch[0] : undefined,
        id: idMatch ? idMatch[1] : undefined,
        classes: classMatches.map((c) => c.slice(1)),
      };
    });
}

function token(selector: string, index = -1): Token {
  const tokens = parseSelector(selector);
  return tokens[index < 0 ? tokens.length + index : index] ?? { classes: [] };
}

function idOf(selector: string, index = -1): string {
  return token(selector, index).id ?? '';
}

function classOf(selector: string, index = -1): string {
  return token(selector, index).classes.join(' ');
}

// Avatar inline (data URI) para no depender de red en el iframe sandbox.
const AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='16' height='16' rx='2' fill='%23b98'/></svg>";

interface BlurbData {
  title: string;
  author: string;
  date: string;
  fandom: string;
  rating: string;
  relationship: string;
  characters: string[];
  freeforms: string[];
  summary: string;
  language: string;
  words: string;
  chapters: string;
  kudos: string;
  hits: string;
}

const BLURBS: BlurbData[] = [
  {
    title: 'Bajo la lluvia de octubre',
    author: 'autora_ejemplo',
    date: '06 May 2024',
    fandom: 'Fandom Original',
    rating: 'G',
    relationship: 'Personaje A/Personaje B',
    characters: ['Personaje A', 'Personaje B'],
    freeforms: ['Fluff', 'Slow Burn'],
    summary:
      'Una tarde cualquiera de octubre, dos personas que se conocen hace años descubren algo que llevaban tiempo evitando decirse.',
    language: 'Español',
    words: '1.427',
    chapters: '1/1',
    kudos: '212',
    hits: '3.481',
  },
  {
    title: 'Cartas que nunca envié y otras historias del invierno largo',
    author: 'otra_persona',
    date: '03 May 2024',
    fandom: 'Otro Fandom',
    rating: 'T',
    relationship: 'Personaje C/Personaje D',
    characters: ['Personaje C', 'Personaje D', 'Personaje E'],
    freeforms: ['Angst', 'Hurt/Comfort', 'Final feliz'],
    summary:
      'Escribió cada carta sabiendo que jamás las mandaría. Hasta que un día alguien las encontró.',
    language: 'Español',
    words: '8.902',
    chapters: '4/12',
    kudos: '57',
    hits: '1.361',
  },
];

function Blurb({ data }: { data: BlurbData }) {
  return (
    <li className="work blurb group" role="article">
      <div className="header module">
        {/* Badges 2x2 a la izquierda: rating, categoría, advertencia, completo */}
        <ul className={classOf(SELECTORS.BLURB_REQUIRED_TAGS_GLOBAL)}>
          <li>
            <span className="rating" title="Rating">
              {data.rating}
            </span>
          </li>
          <li>
            <span className="category" title="Categoría">
              &nbsp;
            </span>
          </li>
          <li>
            <span className="warnings" title="Advertencias">
              &nbsp;
            </span>
          </li>
          <li>
            <span className="complete" title="Completo">
              ✓
            </span>
          </li>
        </ul>
        <h4 className={classOf(SELECTORS.BLURB_H4_HEADING)}>
          <a href="#">{data.title}</a> by{' '}
          <a href="#" rel="author">
            {data.author}
          </a>
        </h4>
        <p className={classOf(SELECTORS.BLURB_DATETIME)}>{data.date}</p>
        <h5 className={classOf(SELECTORS.BLURB_FANDOMS_HEADING)}>
          <span className={classOf(SELECTORS.LANDMARK)}>Fandoms:</span>{' '}
          <a className={classOf(SELECTORS.A_TAG)} href="#">
            {data.fandom}
          </a>
        </h5>
      </div>

      <h6 className={classOf(SELECTORS.LANDMARK_HEADING)}>Tags</h6>
      <ul className={`${classOf(SELECTORS.TAGS_UL)} commas`}>
        <li className={classOf(SELECTORS.TAGS_LI_WARNINGS)}>
          <a className={classOf(SELECTORS.A_TAG)} href="#">
            Sin advertencias
          </a>
        </li>
        <li className={classOf(SELECTORS.TAGS_LI_RELATIONSHIPS)}>
          <a className={classOf(SELECTORS.A_TAG)} href="#">
            {data.relationship}
          </a>
        </li>
        {data.characters.map((c) => (
          <li key={c} className={classOf(SELECTORS.TAGS_LI_CHARACTERS)}>
            <a className={classOf(SELECTORS.A_TAG)} href="#">
              {c}
            </a>
          </li>
        ))}
        {data.freeforms.map((f) => (
          <li key={f} className={classOf(SELECTORS.TAGS_LI_FREEFORMS)}>
            <a className={classOf(SELECTORS.A_TAG)} href="#">
              {f}
            </a>
          </li>
        ))}
      </ul>

      <h6 className={classOf(SELECTORS.LANDMARK_HEADING)}>Summary</h6>
      <blockquote className={`${classOf(SELECTORS.USERSTUFF_BLOCKQUOTE)} summary`}>
        <p>{data.summary}</p>
      </blockquote>

      <dl className="stats">
        <dt className="language">Language:</dt>
        <dd className="language">{data.language}</dd>
        <dt className="words">Words:</dt>
        <dd className="words">{data.words}</dd>
        <dt className="chapters">Chapters:</dt>
        <dd className="chapters">{data.chapters}</dd>
        <dt className="kudos">Kudos:</dt>
        <dd className="kudos">
          <a href="#">{data.kudos}</a>
        </dd>
        <dt className="hits">Hits:</dt>
        <dd className="hits">{data.hits}</dd>
      </dl>
    </li>
  );
}

export function MockAO3Layout() {
  return (
    <div id={idOf(SELECTORS.OUTER)}>
      <div id={idOf(SELECTORS.INNER)} className="wrapper">
        <header id={idOf(SELECTORS.HEADER)} className="region" role="banner">
          <h1 className={classOf(SELECTORS.HEADER_HEADING_A, -2)}>
            <a href="#">Archive of Our Own</a>
          </h1>

          {/* Saludo / acciones de usuario — arriba a la derecha */}
          <ul className="user navigation actions">
            <li id={idOf(SELECTORS.HEADER_GREETING)}>
              <img className="icon" src={AVATAR} alt="" width={16} height={16} />
              <span> Hi, lectora!</span>
            </li>
            <li>
              <a href="#">Post</a>
            </li>
            <li>
              <a href="#">Log Out</a>
            </li>
          </ul>

          {/* Barra de navegación roja full-width con buscador al final */}
          <ul
            className={`${classOf(SELECTORS.HEADER_PRIMARY)} navigation actions`}
            role="navigation"
          >
            <li className="dropdown">
              <a href="#">Fandoms</a>
            </li>
            <li className="dropdown">
              <a href="#">Browse</a>
            </li>
            <li className="dropdown">
              <a href="#">Search</a>
            </li>
            <li className="dropdown">
              <a href="#">About</a>
            </li>
            <li className="search" role="search">
              <form id="search">
                <input type="text" placeholder="Search works" aria-label="Search" />
                <input type="submit" value="Search" />
              </form>
            </li>
          </ul>
        </header>

        <main id={idOf(SELECTORS.MAIN)} className="dashboard region" role="main">
          {/* Sidebar izquierdo: navegación del usuario */}
          <div id={idOf(SELECTORS.DASHBOARD)} className="own">
            <ul className="navigation actions">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">Pseuds</a>
              </li>
            </ul>
            <ul className="navigation actions">
              <li className={classOf(SELECTORS.CURRENT)}>
                <a href="#">Works (27)</a>
              </li>
              <li>
                <a href="#">Series (0)</a>
              </li>
              <li>
                <a href="#">Bookmarks (0)</a>
              </li>
              <li>
                <a href="#">Collections (0)</a>
              </li>
            </ul>
            <ul className="navigation actions">
              <li>
                <a href="#">Gifts (0)</a>
              </li>
            </ul>
          </div>

          {/* Sidebar derecho: filtros */}
          <div className="filters">
            <form>
              <fieldset>
                <h3 className={classOf(SELECTORS.HEADING_H3)}>Sort and Filter</h3>
                <div className="actions">
                  <label htmlFor="sortby">Sort by</label>
                  <select id="sortby" defaultValue="updated">
                    <option value="updated">Date Updated</option>
                    <option value="posted">Date Posted</option>
                    <option value="kudos">Kudos</option>
                  </select>
                </div>
                <fieldset className="listbox group">
                  <h4 className={classOf(SELECTORS.LISTBOX_HEADING, -1)}>Include</h4>
                  <ul className="options index group">
                    <li>▸ Ratings</li>
                    <li>▸ Warnings</li>
                    <li>▸ Categories</li>
                    <li>▸ Fandoms</li>
                    <li>▸ Characters</li>
                    <li>▸ Relationships</li>
                    <li>▸ Additional Tags</li>
                  </ul>
                </fieldset>
                <div className="submit actions">
                  <input type="submit" value="Sort and Filter" />
                </div>
              </fieldset>
            </form>
          </div>

          {/* Listado central de works */}
          <h2 className={classOf(SELECTORS.HEADING_H2, -1)}>
            1 - 2 of 27 Works by lectora
          </h2>
          <ol className="pagination actions">
            <li>
              <span>← Previous</span>
            </li>
            <li>
              <a className={classOf(SELECTORS.CURRENT)} href="#">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">Next →</a>
            </li>
          </ol>
          <ol className="work index group">
            {BLURBS.map((b) => (
              <Blurb key={b.title} data={b} />
            ))}
          </ol>
        </main>

        <footer id={idOf(SELECTORS.FOOTER)} role="contentinfo">
          <ul className="menu">
            <li>
              <a href="#">About the Archive</a>
            </li>
            <li>
              <a href="#">Site Map</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
          <p>Vista previa de estilo — no es el sitio real.</p>
        </footer>
      </div>
    </div>
  );
}
