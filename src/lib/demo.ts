import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { hashedInputs } from './benchmark';

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

const DEMO_PATH = new URL('../data/demonstrations/demo-1.md', import.meta.url);

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
const raw = readFileSync(fileURLToPath(DEMO_PATH), 'utf8').replace(/^﻿/, '');
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

/** The provenance strip, in the order it renders. Separator is " / ", never a middle dot. */
export const demoProvenance = (): string[] => {
  const d = demo();
  return [
    `Model ${d.model}`,
    `Run ${d.runOn}`,
    `Case ${d.caseName}, fictional`,
    `${d.productFile} ${d.productSha256.slice(0, 12)}`,
    d.label,
  ];
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
