/**
 * Same-site #fragment links resolve to an element id on the target page.
 *
 * qa/check-links.mjs checks that paths answer; it ignores the fragment. This walks every
 * built page, collects each same-site link that carries a fragment, follows the path
 * (including the meta-refresh redirect stubs Astro writes for /decision-frame, /evidence
 * and /pricing) and checks the fragment names an id in the final page's served HTML.
 *
 * Ids are read from the served HTML, not a hydrated DOM, so an anchor that only exists
 * after a script runs is reported as missing. That is deliberate: a reader following a
 * link from another site, or with scripts off, lands on the server-rendered page.
 *
 * Usage: preview on QA_BASE_URL (default http://127.0.0.1:4321), then node qa/check-fragments.mjs
 */
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const base = new URL(process.env.QA_BASE_URL || 'http://127.0.0.1:4321/');

/* Links the handoff names explicitly. They are checked whether or not a page links them. */
const REQUIRED = [
  '/product/#brief', '/product/#pro', '/product/#plans', '/free/#get-free',
  '/examples/#vendor-renewal', '/examples/#capacity-hiring', '/examples/#capital-purchase',
  '/examples/#project-continuation', '/examples/#pricing-change',
];
/* Redirects that must land on a live page, with any fragment resolving there. */
const REDIRECTS = { '/decision-frame': '/free', '/evidence': '/research', '/pricing': '/product#plans' };

const cache = new Map();
async function fetchFinal(pathname, hops = 0) {
  const url = new URL(pathname, base);
  const key = url.pathname;
  if (!cache.has(key)) {
    const res = await fetch(url, { redirect: 'follow' });
    cache.set(key, { status: res.status, body: await res.text(), finalPath: new URL(res.url).pathname });
  }
  const page = cache.get(key);
  const refresh = page.body.match(/http-equiv="?refresh"?\s+content="\d+;\s*url=([^"]+)"/i);
  if (refresh && hops < 5) {
    const next = new URL(refresh[1], url);
    const final = await fetchFinal(next.pathname, hops + 1);
    return { ...final, redirectedTo: next.pathname + next.hash, redirectHash: next.hash };
  }
  return page;
}

const idsIn = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const walk = (d) => readdirSync(d).flatMap((e) => { const p = join(d, e); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const links = new Map(); // "path#frag" -> set of source pages
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  const from = '/' + file.slice(5).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const m of html.matchAll(/href="([^"]*#[^"]+)"/g)) {
    const url = new URL(m[1].replace(/&amp;/g, '&'), new URL(from, base));
    if (url.origin !== base.origin) continue;
    const k = url.pathname + url.hash;
    if (!links.has(k)) links.set(k, new Set());
    links.get(k).add(from);
  }
}
for (const r of REQUIRED) if (!links.has(r)) links.set(r, new Set(['(required by handoff)']));

const failures = [];
const passes = [];
for (const [link, sources] of links) {
  const [path, frag] = [link.slice(0, link.indexOf('#')), decodeURIComponent(link.slice(link.indexOf('#') + 1))];
  const page = await fetchFinal(path);
  if (page.status >= 400) { failures.push(`${link}: HTTP ${page.status} (from ${[...sources].join(', ')})`); continue; }
  if (!idsIn(page.body).has(frag)) failures.push(`${link}: no element with id="${frag}" in served HTML (from ${[...sources].slice(0, 3).join(', ')})`);
  else passes.push(link);
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  for (const variant of [from, from + '/']) {
    const page = await fetchFinal(variant);
    const target = new URL(to, base);
    if (page.status >= 400) { failures.push(`redirect ${variant}: HTTP ${page.status}`); continue; }
    if (!page.redirectedTo || new URL(page.redirectedTo, base).pathname.replace(/\/$/, '') !== target.pathname.replace(/\/$/, '')) {
      failures.push(`redirect ${variant}: lands on ${page.redirectedTo ?? page.finalPath}, expected ${to}`);
      continue;
    }
    if (target.hash && !idsIn(page.body).has(target.hash.slice(1))) failures.push(`redirect ${variant}: ${to} fragment has no matching id`);
    else passes.push(`redirect ${variant} -> ${to}`);
  }
}

for (const p of passes) console.log(`PASS ${p}`);
for (const f of failures) console.log(`FAIL ${f}`);
console.log(`\n${passes.length} passed, ${failures.length} failed (${links.size} distinct fragment links, ${Object.keys(REDIRECTS).length} redirects)`);
process.exit(failures.length ? 1 : 0);
