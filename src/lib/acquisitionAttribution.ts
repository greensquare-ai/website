/**
 * Where a visitor came from, captured on the first page they land on.
 *
 * Campaign tags live in the landing URL and are gone after the first internal link, so
 * reading them only at form submission recorded most tagged visits as direct. Every page
 * now calls captureLanding() on load. The first touch is written once and never
 * overwritten; the latest campaign is replaced whenever a new tagged URL arrives.
 *
 * Only allowlisted parameters are read, and only values on the lists in
 * src/data/campaigns.ts are kept; anything else becomes `other`. The landing path is
 * kept only for the site's own sections. So a URL cannot carry an email address, a name,
 * a token or free text into storage or analytics.
 */
import { knownCampaigns, knownContents, knownMediums, knownSources } from '../data/campaigns';

export type Touch = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  path: string;
};

export type Attribution = { first: Touch; latest: Touch };

const KEY = 'gs_acquisition_v3';

const direct = (path: string): Touch => ({ source: 'direct', medium: 'none', campaign: 'none', content: 'none', path });

/**
 * A tag value from the allowlist in src/data/campaigns.ts, `other` for any value not on
 * it, or null when the tag is absent. A value is never stored or sent as written, so a
 * link cannot carry an email address, a name or a token into storage or analytics.
 */
function token(value: string | null, known: readonly string[]): string | null {
  if (!value) return null;
  const normalised = value.trim().toLowerCase();
  return known.includes(normalised) ? normalised : 'other';
}

/** The site's own top-level sections. A landing path outside them is recorded as /other. */
const SECTIONS = ['', 'free', 'examples', 'start', 'product', 'research', 'benchmark', 'methodology', 'about', 'legal'];

function safePath(pathname: string): string {
  const section = pathname.split('/')[1] ?? '';
  return SECTIONS.includes(section) ? `/${section}${section ? '/' : ''}` : '/other';
}

function touchFromUrl(): Touch | null {
  const params = new URLSearchParams(window.location.search);
  const source = token(params.get('utm_source'), knownSources);
  const medium = token(params.get('utm_medium'), knownMediums) ?? token(params.get('gs_channel'), knownMediums);
  const campaign = token(params.get('utm_campaign'), knownCampaigns);
  if (!source && !medium && !campaign) return null;
  return {
    source: source ?? 'unknown',
    medium: medium ?? 'unknown',
    campaign: campaign ?? 'none',
    content: token(params.get('utm_content'), knownContents) ?? 'none',
    path: safePath(window.location.pathname),
  };
}

let memory: Attribution | null = null;

function load(): Attribution | null {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // Storage blocked or unreadable: fall back to this page's memory.
  }
  return memory;
}

function save(value: Attribution) {
  memory = value;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Attribution stays usable for this page view when storage is unavailable.
  }
}

/** Call once per page load. Safe to call more than once. */
export function captureLanding(): Attribution {
  if (typeof window === 'undefined') return { first: direct('/'), latest: direct('/') };
  const previous = load();
  const tagged = touchFromUrl();
  const here = tagged ?? direct(safePath(window.location.pathname));
  const next: Attribution = {
    first: previous?.first ?? here,
    latest: tagged ?? previous?.latest ?? here,
  };
  save(next);
  return next;
}

export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return { first: direct('/'), latest: direct('/') };
  return load() ?? captureLanding();
}

/** One compact string per touch, so both fit inside the analytics property limit. */
export function touchLabel(touch: Touch): string {
  return `${touch.source}/${touch.medium}/${touch.campaign}${touch.path}`.slice(0, 120);
}
