import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    if (statSync(file).isDirectory()) walk(file);
    else if (file.endsWith('.html')) files.push(file);
  }
};
walk('dist');

const failures = [];
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (/http-equiv="refresh"/i.test(html) && html.length < 2500) continue;
  const route = relative('dist', file);
  const count = (pattern) => [...html.matchAll(pattern)].length;
  if (count(/<h1\b/gi) !== 1) failures.push(`${route}: expected one h1`);
  if (count(/<main\b/gi) !== 1) failures.push(`${route}: expected one main landmark`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${route}: missing title`);
  if (!/<meta name="description" content="[^"]+"/i.test(html)) failures.push(`${route}: missing description`);
  if (!/<link rel="canonical" href="[^"]+"/i.test(html)) failures.push(`${route}: missing canonical`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/i.test(image[0])) failures.push(`${route}: image missing alt attribute`);
  }
}

if (failures.length) throw new Error(failures.join('\n'));
console.log(`PASS static_pages=${files.length}`);
