import { tokens } from './tokens.mjs';
import { throughFlow } from './through-flow.mjs';
import { validateComposition } from './qa.mjs';
import { evidenceLedger, optionsComparison, assumptionRisk, recommendationBlock, barExhibit } from './components.mjs';

function esc(value='') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c])); }

function textLines(lines, {x,y,size,leading,family,weight=600,fill}) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}">${lines.map((line,i)=>`<tspan x="${x}" dy="${i===0?0:size*leading}">${esc(line)}</tspan>`).join('')}</text>`;
}

function renderNativeComponent(component, mode) {
  if (!component) return '';
  switch (component.type) {
    case 'evidence_ledger': return evidenceLedger({...component, mode});
    case 'options_comparison': return optionsComparison({...component, mode});
    case 'assumption_risk': return assumptionRisk({...component, mode});
    case 'recommendation': return recommendationBlock({...component, mode});
    case 'bar_exhibit': return barExhibit({...component, mode});
    default: throw new Error(`Unsupported native component: ${component.type}`);
  }
}

export function renderComposition(spec) {
  const qa = validateComposition(spec);
  if (!qa.pass) throw new Error(`Composition failed QA: ${qa.failures.join(', ')}`);
  const format = tokens.formats[spec.format];
  const c = tokens.colourModes[spec.mode];
  const safe = format.safe;
  const lines = spec.content.headline_lines || [spec.content.headline];
  const pattern = spec.pattern.behaviour === 'none' ? '' : throughFlow({
    behaviour: spec.pattern.behaviour,
    orientation: spec.pattern.orientation || 0,
    mode: spec.mode,
    x: spec.pattern.region.x,
    y: spec.pattern.region.y,
    S: spec.pattern.S,
    prominence: spec.pattern.prominence || 'ambient'
  });
  const cta = spec.content.cta ? `<g><rect x="${safe}" y="${spec.content.cta_y || 1000}" width="420" height="74" fill="${c.text}"/><text x="${safe+28}" y="${(spec.content.cta_y || 1000)+47}" fill="${c.ground}" font-family="${tokens.typography.body}" font-size="${tokens.typography.bodySize}" font-weight="600">${esc(spec.content.cta)}</text></g>` : '';
  const nativeComponent = renderNativeComponent(spec.component, spec.mode);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${format.width}" height="${format.height}" viewBox="0 0 ${format.width} ${format.height}" role="img" aria-labelledby="title desc">
<title id="title">${esc(spec.content.headline)}</title><desc id="desc">GreenSquare ${esc(spec.role)} composition generated from GSIL Design Runtime.</desc>
<rect width="100%" height="100%" fill="${c.ground}"/>
${pattern}
<text x="${safe}" y="${safe+18}" fill="${c.text}" font-family="${tokens.typography.body}" font-size="${tokens.typography.eyebrow}" font-weight="600" letter-spacing="1.2">${esc(spec.content.eyebrow || 'GREENSQUARE')}</text>
${textLines(lines,{x:safe,y:spec.content.headline_y || 330,size:tokens.typography.headline,leading:tokens.typography.headlineLeading,family:tokens.typography.display,fill:c.text})}
${spec.content.body ? textLines(spec.content.body_lines || [spec.content.body],{x:safe,y:spec.content.body_y || 770,size:tokens.typography.bodySize,leading:tokens.typography.bodyLeading,family:tokens.typography.body,weight:400,fill:c.text}) : ''}
${nativeComponent}
${cta}
<line x1="${safe}" y1="${format.height-safe-72}" x2="${format.width-safe}" y2="${format.height-safe-72}" stroke="${c.neutral}" stroke-width="1"/>
<text x="${safe}" y="${format.height-safe-30}" fill="${c.text}" font-family="${tokens.typography.body}" font-size="${tokens.typography.meta}">${esc(spec.content.source || '')}</text>
<text x="${format.width-safe}" y="${format.height-safe-30}" text-anchor="end" fill="${c.text}" font-family="${tokens.typography.body}" font-size="${tokens.typography.meta}">${esc(spec.content.source_state || '')}</text>
</svg>`;
}
