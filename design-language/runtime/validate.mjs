import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderComposition } from './render.mjs';
import { validateComposition } from './qa.mjs';
import { renderCarousel, validateCarousel } from './carousel.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'public', 'intelligence', 'v1', 'specimens', 'design-runtime');
fs.mkdirSync(outDir, { recursive: true });

const openerPath = path.join(here, 'specimens', 'decision-frame-carousel.json');
const opener = JSON.parse(fs.readFileSync(openerPath, 'utf8'));
const openerQa = validateComposition(opener);
if (!openerQa.pass) {
  console.error(JSON.stringify({ runtime: 'GSIL.DESIGN_RUNTIME', specimen: opener.id, qa: openerQa }, null, 2));
  process.exit(1);
}
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel-opener.svg'), renderComposition(opener));
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel-opener.qa.json'), JSON.stringify({
  runtime: 'GSIL.DESIGN_RUNTIME', runtime_version: '1.1.0', doctrine: 'GSIL.DESIGN.THROUGH_FLOW_V4', specimen: opener.id, format: opener.format, pass: true, failures: []
}, null, 2));

const carouselPath = path.join(here, 'specimens', 'decision-frame-carousel-full.json');
const carousel = JSON.parse(fs.readFileSync(carouselPath, 'utf8'));
const carouselQa = validateCarousel(carousel);
if (!carouselQa.pass) {
  console.error(JSON.stringify({ runtime: 'GSIL.DESIGN_RUNTIME', carousel: carousel.id, qa: carouselQa }, null, 2));
  process.exit(1);
}
const rendered = renderCarousel(carousel);
for (const slide of rendered) {
  fs.writeFileSync(path.join(outDir, `decision-frame-carousel-${String(slide.index).padStart(2,'0')}.svg`), slide.svg);
}
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel.manifest.json'), JSON.stringify({
  runtime: 'GSIL.DESIGN_RUNTIME', runtime_version: '1.1.0', doctrine: 'GSIL.DESIGN.THROUGH_FLOW_V4', specimen: carousel.id, format: carousel.format, slide_count: rendered.length,
  slides: rendered.map(s => ({ index:s.index, id:s.id, role:s.role, file:`decision-frame-carousel-${String(s.index).padStart(2,'0')}.svg` })),
  qa: carouselQa
}, null, 2));
console.log(`GSIL Design Runtime validated: ${opener.id}`);
console.log(`GSIL Carousel Runtime validated: ${carousel.id} (${rendered.length} slides)`);
