// F4-1: markup estático que replica la estructura real de AO3.
// Página modelada: works-index de un tag (listado + Sort and Filter), que es
// donde se ve la mayor parte del skin (blurbs, tags, stats, filtros).
// Cada zona clickeable lleva data-edit (ver editRegions.ts) para abrir la
// nube de edición del preview.
// Estructura fiel al DOM real de AO3 (ver selectors_vf.md §13).
// Todo id/clase de AO3 sale de SELECTORS (src/lib/selectors.ts) — nunca strings
// hardcodeados. Wrappers estructurales sin equivalente en SELECTORS (layout no
// estilizado por generateCSS) sí pueden ser literales.
import { SELECTORS } from '@/lib/selectors';
import { EDIT_ATTR, type EditRegion } from '@/lib/editRegions';

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

const edit = (region: EditRegion) => ({ [EDIT_ATTR]: region });

interface BlurbData {
  title: string;
  author: string;
  date: string;
  fandom: string;
  tags: string[];
  summary: string;
  language: string;
  words: string;
  chapters: string;
  comments: string;
  kudos: string;
  bookmarks: string;
  hits: string;
}

const BLURBS: BlurbData[] = [
  {
    title: 'A Sweet Double Prompt Hill',
    author: 'RebeccaMySweet',
    date: '21 Jan 2024',
    fandom: 'Ted Lasso (TV)',
    tags: [
      'Sam Obisanya/Rebecca Welton',
      'Keeley Jones/Roy Kent',
      'Sam Obisanya',
      'Rebecca Welton',
      'Ted Lasso',
      'Keeley Jones',
      'Alternate Universe - Historical',
      'Fluff',
      'Anxiety',
      'Established Relationship',
    ],
    summary:
      "I will write and ask for prompts on Tumblr. These will mostly be short little drabbles, but I thought I'd post them here for people to read. Some of these I'm quite enamoured with and can't rule out the possibility that they may one day become longer stories.",
    language: 'English',
    words: '3,954',
    chapters: '13/17',
    comments: '15',
    kudos: '74',
    bookmarks: '4',
    hits: '1575',
  },
  {
    title: 'supposed to(o) sweat you out',
    author: 'angeldustonfield',
    date: '12 Jan 2024',
    fandom: 'Ted Lasso (TV)',
    tags: [
      'Sam Obisanya/Rebecca Welton',
      'Sam Obisanya',
      'Rebecca Welton',
      'Ted Lasso',
      'Roy Kent',
      'Post-Canon',
      'Emotional Hurting',
      'First Time',
      'Comfort',
      'Heavy Angst',
    ],
    summary:
      "This was supposed to be a simple training day, but Rebecca couldn't keep her eyes off the pitch. Or rather, off him. When the rain starts pouring down, things take an unexpected, steamier turn in the locker room.",
    language: 'English',
    words: '5,120',
    chapters: '1/1',
    comments: '28',
    kudos: '112',
    bookmarks: '18',
    hits: '2450',
  },
  {
    title: 'The Gaffer and the Owner',
    author: 'richmondtilldeath',
    date: '03 Jan 2024',
    fandom: 'Ted Lasso (TV)',
    tags: ['Sam Obisanya/Rebecca Welton', 'Slow Burn', 'Mutual Pining', 'Happy Ending'],
    summary:
      'Five times Sam almost told Rebecca how he felt, and the one time he finally did, halfway through a very long board meeting.',
    language: 'English',
    words: '12,488',
    chapters: '6/6',
    comments: '41',
    kudos: '389',
    bookmarks: '57',
    hits: '6012',
  },
];

const FILTER_GROUPS = [
  'Ratings',
  'Warnings',
  'Categories',
  'Fandoms',
  'Characters',
  'Relationships',
  'Additional Tags',
];

function Blurb({ data }: { data: BlurbData }) {
  return (
    <li className="work blurb group" role="article" {...edit('blurb')}>
      <div className="header module">
        {/* Badges 2x2: rating, categoría, advertencias, estado */}
        <ul className={classOf(SELECTORS.BLURB_REQUIRED_TAGS_GLOBAL)}>
          <li>
            <span className="rating" title="Rating" />
          </li>
          <li>
            <span className="category" title="Category" />
          </li>
          <li>
            <span className="warnings" title="Warnings" />
          </li>
          <li>
            <span className="iswip" title="Status" />
          </li>
        </ul>
        <h4 className={classOf(SELECTORS.BLURB_H4_HEADING)}>
          <a href="#" {...edit('link')}>
            {data.title}
          </a>{' '}
          by{' '}
          <a href="#" rel="author" {...edit('link')}>
            {data.author}
          </a>
        </h4>
        <p className={classOf(SELECTORS.BLURB_DATETIME)}>{data.date}</p>
        <h5 className={classOf(SELECTORS.BLURB_FANDOMS_HEADING)}>
          <span className={classOf(SELECTORS.LANDMARK)}>Fandom:</span>{' '}
          <a className={classOf(SELECTORS.A_TAG)} href="#" {...edit('heading')}>
            {data.fandom}
          </a>
        </h5>
      </div>

      <h6 className={classOf(SELECTORS.LANDMARK_HEADING)}>Tags</h6>
      <ul className={`${classOf(SELECTORS.TAGS_UL)} commas`}>
        {data.tags.map((tag) => (
          <li key={tag} className={classOf(SELECTORS.TAGS_LI_FREEFORMS)}>
            <a className={classOf(SELECTORS.A_TAG)} href="#" {...edit('tag')}>
              {tag}
            </a>
          </li>
        ))}
      </ul>

      <h6 className={classOf(SELECTORS.LANDMARK_HEADING)}>Summary</h6>
      <blockquote className={`${classOf(SELECTORS.USERSTUFF_BLOCKQUOTE)} summary`}>
        <p>{data.summary}</p>
      </blockquote>

      <dl className="stats">
        <div>
          <dt className="language">Language:</dt> <dd className="language">{data.language}</dd>
        </div>
        <div>
          <dt className="words">Words:</dt> <dd className="words">{data.words}</dd>
        </div>
        <div>
          <dt className="chapters">Chapters:</dt> <dd className="chapters">{data.chapters}</dd>
        </div>
        <div>
          <dt className="comments">Comments:</dt> <dd className="comments">{data.comments}</dd>
        </div>
        <div>
          <dt className="kudos">Kudos:</dt> <dd className="kudos">{data.kudos}</dd>
        </div>
        <div>
          <dt className="bookmarks">Bookmarks:</dt> <dd className="bookmarks">{data.bookmarks}</dd>
        </div>
        <div>
          <dt className="hits">Hits:</dt> <dd className="hits">{data.hits}</dd>
        </div>
      </dl>
    </li>
  );
}

export function MockAO3Layout() {
  return (
    <div id={idOf(SELECTORS.OUTER)} {...edit('page')}>
      <div id={idOf(SELECTORS.INNER)} className="wrapper">
        <header id={idOf(SELECTORS.HEADER)} className="region" role="banner" {...edit('header')}>
          <div className="top">
            <h1 className={classOf(SELECTORS.HEADER_HEADING_A, -2)}>
              <a href="#">Archive of Our Own</a>
            </h1>
            <ul className="user navigation actions">
              <li>
                <a href="#">Fandoms</a>
              </li>
              <li>
                <a href="#">Browse</a>
              </li>
              <li>
                <a href="#">Search</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>

          <ul
            className={`${classOf(SELECTORS.HEADER_PRIMARY)} navigation actions`}
            role="navigation"
            {...edit('nav')}
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
                <input type="text" placeholder="Search works..." aria-label="Search works" />
                <span className="magnifier" aria-hidden />
              </form>
            </li>
          </ul>
        </header>

        <main id={idOf(SELECTORS.MAIN)} className="works-index region" role="main">
          <div className="listing">
            <h2 className={classOf(SELECTORS.HEADING_H2, -1)} {...edit('heading')}>
              1 - 20 of 42 Works in Sam Obisanya/Rebecca Welton
            </h2>
            <ol className="pagination actions">
              <li className="previous">
                <span>← Previous</span>
              </li>
              <li>
                <span className={classOf(SELECTORS.CURRENT)}>1</span>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li className="next">
                <a href="#" {...edit('link')}>
                  Next →
                </a>
              </li>
            </ol>
            <ol className="work index group">
              {BLURBS.map((b) => (
                <Blurb key={b.title} data={b} />
              ))}
            </ol>
          </div>

          <form className="filters" id="work-filters" {...edit('filters')}>
            <fieldset>
              <h3 className={classOf(SELECTORS.HEADING_H3)} {...edit('heading')}>
                Sort and Filter
              </h3>
              <dl className="sort">
                <dt>
                  <label htmlFor="sortby">Sort by</label>
                </dt>
                <dd>
                  <select id="sortby" defaultValue="updated">
                    <option value="updated">Date Updated</option>
                    <option value="posted">Date Posted</option>
                    <option value="kudos">Kudos</option>
                  </select>
                </dd>
              </dl>
              <ul className="expandable">
                {FILTER_GROUPS.map((group) => (
                  <li key={group}>
                    <span>{group}</span>
                    <span className="arrow" aria-hidden>
                      ▶
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="more">
                <dt>
                  <label htmlFor="within">Search within results</label>
                </dt>
                <dd>
                  <input id="within" type="text" />
                </dd>
                <dt>
                  <label htmlFor="language">Language</label>
                </dt>
                <dd>
                  <select id="language" defaultValue="">
                    <option value="" />
                    <option value="en">English</option>
                  </select>
                </dd>
              </dl>
              <p className="submit actions">
                <input type="submit" value="Sort and Filter" {...edit('button')} />
              </p>
            </fieldset>
          </form>
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
          <p>Style preview — this is not the real site.</p>
        </footer>
      </div>
    </div>
  );
}
