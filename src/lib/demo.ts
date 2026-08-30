/* The transcript is imported as text rather than read from disk. A path relative
   to import.meta.url resolves into the build output during `astro build`, where
   the markdown file does not exist, so the file has to travel with the module. */
import source from '../data/demonstrations/demo-1.md?raw';
import { formatDate, hashedInputs } from './benchmark';

/**
 * The demonstration run shown on the flagship page.
 *
 * A demonstration is not the study, and the two must never be confusable. Three
 * rules are enforced here rather than trusted to the copy:
 *
 *   1. The run must be against the product file whose hash the site publishes.
 *      If someone edits the product file, this fails the build rather than
 *      letting the page claim a demonstration of an artefact nobody can check.
 *   2. The demonstration label must be present and non-empty, so no figure can
 *      render without it.
 *   3. The transcript must be declared unedited. A trimmed or spliced
 *      transcript is not evidence of anything.
 */

export interface DemoMeta {
  id: string;
  label: string;
  model: string;
  runOn: string;
  caseName: string;
  productFile: string;
  productSha256: string;
  operator: string;
  harness: string;
  scored: boolean;
  edited: boolean;
  attemptsBefore: number;
  attemptNote: string;
}

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('demo-1.md: no frontmatter block');

  const out: Record<string, string> = {};
  let key = '';
  for (const line of match[1].split(/\r?\n/)) {
    // A folded scalar (`key: >-`) continues on the indented lines beneath it.
    if (key && /^\s+\S/.test(line)) {
      out[key] = `${out[key]} ${line.trim()}`.trim();
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    out[key] = kv[2].replace(/^["']|["']$/g, '').replace(/^>-?$/, '').trim();
  }
  return out;
}

// Windows editors and PowerShell write a BOM readily, and a BOM ahead of the
// opening `---` would otherwise read as "no frontmatter" and mask a real fault.
const raw = source.replace(/^﻿/, '');
const fm = parseFrontmatter(raw);

/** The transcript with its frontmatter removed, exactly as recorded. */
export const demoTranscript = (): string => raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();

export const demo = (): DemoMeta => ({
  id: fm.id,
  label: fm.label,
  model: fm.model,
  runOn: fm.run_on,
  caseName: fm.case_name,
  productFile: fm.product_file,
  productSha256: fm.product_sha256,
  operator: fm.operator,
  harness: fm.harness,
  scored: fm.scored === 'true',
  edited: fm.edited === 'true',
  attemptsBefore: Number(fm.attempts_before_this ?? 0),
  attemptNote: fm.attempt_note,
});

/** The run date in the site's one date form. */
export const demoRunDate = (): string => formatDate(demo().runOn);

/** One item of the always-visible provenance strip above both panels. */
export interface DemoProvenanceItem {
  label?: string;
  value: string;
  /** Tabular figures, for the hash. */
  mono?: boolean;
  /** The full value, where the visible one is abbreviated. */
  title?: string;
}

/**
 * The provenance strip, in the order it renders. Separation is by the strip's own
 * flex gap; where a separator character is unavoidable it is " / ", never a middle
 * dot. The last item is the demonstration label, which the invariants below force
 * to exist, so no figure can render without it.
 */
export const demoProvenance = (): DemoProvenanceItem[] => {
  const d = demo();
  return [
    { label: 'Model', value: d.model },
    { label: 'Run', value: demoRunDate() },
    { label: 'Case', value: `${d.caseName}, fictional` },
    { label: d.productFile, value: d.productSha256.slice(0, 16), mono: true, title: d.productSha256 },
    { value: d.label },
  ];
};

/* The transcript's own section headings, used to split it. Matched as literals so
   a change to the file's shape fails loudly here rather than rendering a panel
   with the wrong half of the run in it. */
const EXCHANGE_HEADING = '## The operator';
const BRIEF_HEADING = '## Compass, the Decision Brief';

/**
 * The three ways this run differs from a buyer's own use, read from the file's own
 * preamble so the figure cannot show the run without them.
 */
export const demoDifferences = (): string[] => {
  const preamble = demoTranscript().split(/\r?\n---\r?\n/)[0];
  const items = [...preamble.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) => m[1].trim());
  if (items.length === 0) throw new Error('demo-1.md: the preamble lists no ways this run differs from a buyer\'s use');
  return items;
};

/**
 * The Prompt panel: the operator's opening message and the exchange, up to but not
 * including the final message that carried the brief. The words are the transcript's
 * own; only the log's markdown markers (the "> " relay quoting, the "## " heading
 * marks and the ** emphasis pairs) are removed, because they are the log's device
 * and not anyone's speech. No word is changed, added, re-ordered or removed.
 */
export const demoExchange = (): string => {
  const transcript = demoTranscript();
  const start = transcript.indexOf(EXCHANGE_HEADING);
  const end = transcript.indexOf(BRIEF_HEADING);
  if (start < 0 || end <= start) throw new Error('demo-1.md: the exchange could not be located between its own headings');
  return transcript
    .slice(start, end)
    .split(/\r?\n/)
    .map((line) => line.replace(/^>\s?/, '').replace(/^##\s+/, '').replace(/\*\*/g, ''))
    .join('\n')
    .trim();
};

/**
 * The Result panel: the Decision Brief the run produced, taken from the file as
 * Astro rendered it and cut at the file's own heading, so the panel cannot drift
 * from the transcript the invariants above guard.
 *
 * Three transformations, all structural rather than editorial. The relay blockquote
 * is unwrapped, because the brief is the product's output and not a quotation the
 * page is making. The brief's own part headings drop a level, so the figure's title
 * stays the most senior heading in the object. And the evidence markers the product
 * writes in parentheses are wrapped as .v-tag spans.
 *
 * The options table is put in the page's own focusable scroll region, because a bare
 * table of four columns is wider than a phone and would scroll the whole page.
 */
export const demoBriefHtml = (rendered: string, idPrefix: string): string => {
  const at = rendered.indexOf('id="compass-the-decision-brief"');
  if (at < 0) throw new Error('demo-1.md: the Decision Brief heading was not found in the rendered file');
  const opens = rendered.indexOf('</h2>', at);
  if (opens < 0) throw new Error('demo-1.md: the Decision Brief heading is unterminated');

  return rendered
    .slice(opens + '</h2>'.length)
    .replace(/<\/?blockquote>/g, '')
    .replace(/<h2 id="([^"]+)">/g, `<h3 class="bm-brief__part" id="${idPrefix}-$1">`)
    .replace(/<\/h2>/g, '</h3>')
    .replace(/\((given|derived|inferred|unknown)((?:,[^)]*)?)\)/g, '<span class="v-tag">$1$2</span>')
    .replace(
      /<table>/g,
      '<p class="v-small bm-scrollhint" aria-hidden="true">Scroll the table sideways to read every option.</p>' +
        '<div class="bm-table-wrap bm-brief__table" role="region" aria-label="The options the demonstration run compared" tabindex="0"><table>',
    )
    .replace(/<\/table>/g, '</table></div>')
    .trim();
};

function assertDemoInvariants(): void {
  const bad = (m: string) => { throw new Error(`demo-1.md: ${m}`); };
  const d = demo();

  if (d.productSha256.toUpperCase() !== hashedInputs().product_sha256.toUpperCase())
    bad(`product hash ${d.productSha256} is not the published ${hashedInputs().product_sha256}; the demonstration is not of the benchmarked file`);

  if (!d.label || !/demonstration/i.test(d.label))
    bad('the demonstration label is missing or does not say "demonstration"');

  if (d.scored) bad('a demonstration is not scored; nothing here may claim it was');
  if (d.edited) bad('the transcript is marked edited and must not be published');

  if (d.attemptsBefore > 0 && !d.attemptNote)
    bad(`${d.attemptsBefore} earlier attempt(s) recorded with no note explaining why they were abandoned`);
}

assertDemoInvariants();
