import { tokens } from './tokens.mjs';

function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}
const body = tokens.typography.body;

export function evidenceLedger({x=84,y=650,width=912,items=[],mode='paper'}) {
  const c=tokens.colourModes[mode]; const rowH=92;
  const rows=items.map((it,i)=>{const yy=y+i*rowH;return `<g><text x="${x}" y="${yy+24}" font-family="${body}" font-size="20" font-weight="700" fill="${c.text}">${esc(it.state)}</text><text x="${x+130}" y="${yy+24}" font-family="${body}" font-size="22" fill="${c.text}">${esc(it.text)}</text><line x1="${x}" y1="${yy+46}" x2="${x+width}" y2="${yy+46}" stroke="${c.neutral}" stroke-width="1"/></g>`}).join('');
  return `<g aria-label="Evidence ledger">${rows}</g>`;
}

export function optionsComparison({x=84,y=600,width=912,options=[],mode='paper'}) {
  const c=tokens.colourModes[mode]; const colW=width/Math.max(options.length,1);
  return `<g aria-label="Options comparison">${options.map((o,i)=>{const xx=x+i*colW;return `<g><text x="${xx}" y="${y}" font-family="${body}" font-size="20" font-weight="700" fill="${c.text}">${esc(o.label)}</text><text x="${xx}" y="${y+44}" font-family="${body}" font-size="30" font-weight="700" fill="${c.text}">${esc(o.title)}</text><text x="${xx}" y="${y+88}" font-family="${body}" font-size="20" fill="${c.text}">${esc(o.tradeoff||'')}</text><line x1="${xx}" y1="${y+120}" x2="${xx+colW-24}" y2="${y+120}" stroke="${c.neutral}" stroke-width="1"/></g>`}).join('')}</g>`;
}

export function assumptionRisk({x=84,y=620,width=912,assumption='',risk='',reversal='',mode='paper'}) {
  const c=tokens.colourModes[mode];
  return `<g aria-label="Assumption and risk"><text x="${x}" y="${y}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">CRITICAL ASSUMPTION</text><text x="${x}" y="${y+40}" font-family="${body}" font-size="28" fill="${c.text}">${esc(assumption)}</text><line x1="${x}" y1="${y+72}" x2="${x+width}" y2="${y+72}" stroke="${c.neutral}"/><text x="${x}" y="${y+120}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">DOWNSIDE IF WRONG</text><text x="${x}" y="${y+160}" font-family="${body}" font-size="24" fill="${c.text}">${esc(risk)}</text><text x="${x}" y="${y+220}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">REVERSAL SIGNAL</text><text x="${x}" y="${y+260}" font-family="${body}" font-size="24" fill="${c.text}">${esc(reversal)}</text></g>`;
}

export function recommendationBlock({x=84,y=620,width=912,recommendation='',because='',owner='',next='',mode='paper'}) {
  const c=tokens.colourModes[mode];
  return `<g aria-label="Recommendation"><rect x="${x}" y="${y-46}" width="${width}" height="300" fill="none" stroke="${c.neutral}"/><text x="${x+28}" y="${y}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">RECOMMENDATION</text><text x="${x+28}" y="${y+46}" font-family="${body}" font-size="32" font-weight="700" fill="${c.text}">${esc(recommendation)}</text><text x="${x+28}" y="${y+92}" font-family="${body}" font-size="22" fill="${c.text}">${esc(because)}</text><text x="${x+28}" y="${y+158}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">OWNER</text><text x="${x+118}" y="${y+158}" font-family="${body}" font-size="20" fill="${c.text}">${esc(owner)}</text><text x="${x+28}" y="${y+204}" font-family="${body}" font-size="18" font-weight="700" fill="${c.text}">NEXT</text><text x="${x+118}" y="${y+204}" font-family="${body}" font-size="20" fill="${c.text}">${esc(next)}</text></g>`;
}

export function barExhibit({x=84,y=640,width=912,height=260,items=[],mode='paper'}) {
  const c=tokens.colourModes[mode]; const max=Math.max(...items.map(i=>i.value),1); const gap=50;
  return `<g aria-label="Bar exhibit">${items.map((it,i)=>{const yy=y+i*gap;const w=(it.value/max)*(width-220);return `<g><text x="${x}" y="${yy+18}" font-family="${body}" font-size="18" fill="${c.text}">${esc(it.label)}</text><rect x="${x+180}" y="${yy}" width="${w}" height="22" fill="${i===0?c.accent:c.neutral}"/><text x="${x+190+w}" y="${yy+18}" font-family="${body}" font-size="18" fill="${c.text}">${esc(it.value)}</text></g>`}).join('')}</g>`;
}
