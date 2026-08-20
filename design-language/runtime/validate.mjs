import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderComposition } from './render.mjs';
import { validateComposition } from './qa.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const specimenPath = path.join(here, 'specimens', 'decision-frame-carousel.json');
const specimen = JSON.parse(fs.readFileSync(specimenPath, 'utf8'));
const qa = validateComposition(specimen);
if (!qa.pass) {
  console.error(JSON.stringify({ runtime: 'GSIL.DESIGN_RUNTIME', specimen: specimen.id, qa }, null, 2));
  process.exit(1);
}
const svg = renderComposition(specimen);
const outDir = path.join(here, '..', 'public', 'intelligence', 'v1', 'specimens', 'design-runtime');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel-opener.svg'), svg);
fs.writeFileSync(path.join(outDir, 'decision-frame-carousel-opener.qa.json'), JSON.stringify({
  runtime: 'GSIL.DESIGN_RUNTIME',
  runtime_version: '1.0.0',
  doctrine: 'GSIL.DESIGN.THROUGH_FLOW_V4',
  specimen: specimen.id,
  format: specimen.format,
  pass: true,
  failures: []
}, null, 2));
console.log(`GSIL Design Runtime validated: ${specimen.id}`);
