/**
 * The Frame Free release is identified by the bytes of the file actually served, not
 * by a version label. No date or version is printed inside the PDF, so the SHA-256 is
 * the release identity the site and its analytics may quote.
 *
 * Usage:
 *   node scripts/pdf-manifest.mjs           check the manifest against the file (build guard)
 *   node scripts/pdf-manifest.mjs --write   regenerate the manifest from the file
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const PDF = 'public/frame-free.pdf';
const MANIFEST = 'src/data/frame-free-release.json';

const bytes = readFileSync(PDF);
const raw = bytes.toString('latin1');
const actual = {
  path: '/frame-free.pdf',
  bytes: bytes.length,
  pages: (raw.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length,
  sha256: createHash('sha256').update(bytes).digest('hex'),
};

if (!raw.startsWith('%PDF-')) {
  console.error(`pdf-manifest: ${PDF} does not start with a PDF signature.`);
  process.exit(1);
}

if (process.argv.includes('--write')) {
  writeFileSync(MANIFEST, `${JSON.stringify(actual, null, 2)}\n`);
  console.log(`pdf-manifest: wrote ${MANIFEST} (${actual.bytes} bytes, ${actual.pages} pages, ${actual.sha256.slice(0, 12)})`);
  process.exit(0);
}

const recorded = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const drift = Object.keys(actual).filter((key) => recorded[key] !== actual[key]);
if (drift.length) {
  console.error(`pdf-manifest: ${MANIFEST} no longer describes ${PDF} (${drift.join(', ')}).`);
  console.error('If the PDF was replaced on purpose, run: node scripts/pdf-manifest.mjs --write');
  process.exit(1);
}
console.log(`pdf-manifest: ${PDF} matches the manifest (${actual.pages} pages, ${actual.sha256.slice(0, 12)}).`);
