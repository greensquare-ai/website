/**
 * Every media file a built page references must exist in the build.
 *
 * The homepage film's video and posters live in public/media/ and arrive separately from
 * the code that references them (docs/decisions.md, 5 October 2026). `npm run build` is
 * the only gate Vercel runs before it deploys main, so without this check a missing file
 * would ship as an empty box and a video that fails. Nothing else reads these paths:
 * qa/check-static.mjs checks alt text and qa/check-links.mjs reads only href.
 *
 * Usage: node scripts/check-media.mjs   (runs against dist/, after a build)
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
/* src, srcset and the film's data attributes; one value per match, up to a space or comma. */
const REF = /(?:\bsrc|\bsrcset|data-film-(?:desktop|mobile))="([^"]*\/media\/[^"\s,]+)/g;
/* A srcset can hold several candidates; the pattern above takes the first, this the rest. */
const SRCSET = /\bsrcset="([^"]*)"/g;

/* astro.config.mjs sets no `base` today. If one is added, set BASE_PATH to it here. */
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

const missing = new Map();
let checked = 0;
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const refs = new Set([...html.matchAll(REF)].map((m) => m[1]));
  for (const m of html.matchAll(SRCSET)) {
    for (const candidate of m[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.includes('/media/')) refs.add(url);
    }
  }
  for (const ref of refs) {
    if (/^[a-z]+:\/\//i.test(ref)) continue; // another origin is not this build's to check
    let path = ref.split(/[?#]/)[0];
    if (base && path.startsWith(base + '/')) path = path.slice(base.length);
    checked += 1;
    if (!existsSync(join(DIST, decodeURI(path)))) {
      const pages = missing.get(path) ?? [];
      pages.push(relative(DIST, file));
      missing.set(path, pages);
    }
  }
}

if (missing.size) {
  console.error(`Media check failed: ${missing.size} referenced media file(s) missing from ${DIST}/.`);
  for (const [path, pages] of missing) console.error(`  ${path}  (referenced by ${[...new Set(pages)].join(', ')})`);
  console.error('Add the files under public/media/ before building. See docs/decisions.md, 5 October 2026.');
  process.exit(1);
}
console.log(`Media check passed: ${checked} reference(s) to /media/ resolve in ${DIST}/.`);
