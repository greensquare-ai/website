import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderComposition } from './render.mjs';
import { validateComposition } from './qa.mjs';
import { renderCarousel, validateCarousel } from './carousel.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'public', 'intelligence', 'v1', 'specimens', 'design-runtime');
fs.mkdirSync(outDir, { recursive: true });

function writeCarousel(specimenFile, outputPrefix) {
  const spec = JSON.parse(fs.readFileSync(path.join(here, 'specimens', specimenFile), 'utf8'));
  const qa = validateCarousel(spec);
  if (!qa.pass) {
    console.error(JSON.stringify({ runtime:'GSIL.DESIGN_RUNTIME', carousel:spec.id, qa:{pass:qa.pass,failures:qa.failures} }, null, 2));
    process.exit(1);
  }
  const rendered = renderCarousel(spec);
  for (const slide of rendered) fs.writeFileSync(path.join(outDir, `${outputPrefix}-${String(slide.index).padStart(2,'0')}.svg`), slide.svg);
  fs.writeFileSync(path.join(outDir, `${outputPrefix}.manifest.json`), JSON.stringify({
    runtime:'GSIL.DESIGN_RUNTIME', runtime_version:'1.3.0', doctrine:'GSIL.DESIGN.THROUGH_FLOW_V4', specimen:spec.id, format:spec.format, slide_count:rendered.length,
    slides: rendered.map(s => ({ index:s.index, id:s.id, role:s.role, component:s.component, component_selection_reason:s.component_selection_reason, file:`${outputPrefix}-${String(s.index).padStart(2,'0')}.svg` })),
    qa:{pass:qa.pass,failures:qa.failures}
  }, null, 2));
  return { spec, rendered };
}

const opener = JSON.parse(fs.readFileSync(path.join(here, 'specimens', 'decision-frame-carousel.json'), 'utf8'));
const openerQa = validateComposition(opener);
if (!openerQa.pass) {
  console.error(JSON.stringify({ runtime:'GSIL.DESIGN_RUNTIME', specimen:opener.id, qa:openerQa }, null, 2));
  process.exit(1);
}
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel-opener.svg'), renderComposition(opener));

const standard = writeCarousel('decision-frame-carousel-full.json', 'decision-frame-carousel');
const automatic = writeCarousel('decision-frame-carousel-auto-components.json', 'decision-frame-carousel-auto');

const componentSet = JSON.parse(fs.readFileSync(path.join(here, 'specimens', 'content-components.json'), 'utf8'));
const componentManifest = [];
for (const [i, frame] of componentSet.frames.entries()) {
  const qa = validateComposition(frame);
  if (!qa.pass) {
    console.error(JSON.stringify({ runtime:'GSIL.DESIGN_RUNTIME', component_set:componentSet.id, frame:frame.id, qa }, null, 2));
    process.exit(1);
  }
  const file = `content-component-${String(i+1).padStart(2,'0')}-${frame.component.type}.svg`;
  fs.writeFileSync(path.join(outDir, file), renderComposition(frame));
  componentManifest.push({ id:frame.id, type:frame.component.type, file, qa });
}
fs.writeFileSync(path.join(outDir, 'content-components.manifest.json'), JSON.stringify({ runtime:'GSIL.DESIGN_RUNTIME', runtime_version:'1.3.0', specimen:componentSet.id, component_count:componentManifest.length, components:componentManifest }, null, 2));

console.log(`GSIL Design Runtime validated: ${opener.id}`);
console.log(`GSIL Carousel Runtime validated: ${standard.spec.id} (${standard.rendered.length} slides)`);
console.log(`GSIL Auto-Component Runtime validated: ${automatic.spec.id} (${automatic.rendered.filter(s=>s.component).length} selected components)`);
console.log(`GSIL Content Components validated: ${componentSet.id} (${componentManifest.length} components)`);
