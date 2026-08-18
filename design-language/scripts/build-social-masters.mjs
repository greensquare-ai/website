import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(scriptDir, '..', 'public', 'assets', 'social', 'canva');
const logoUrl = 'https://greensquare-brand-guideline.vercel.app/assets/logo-lockup-light.svg';
const logoForestUrl = 'https://greensquare-brand-guideline.vercel.app/assets/logo-lockup-forest.svg';
const logoPrimaryUrl = 'https://greensquare-brand-guideline.vercel.app/assets/logo-lockup-primary.svg';

const baseStyles = (width, height) => `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600&display=swap');
*{box-sizing:border-box}html,body{margin:0;background:#C7CBC0;font-family:'IBM Plex Sans',Arial,sans-serif;color:#12140F}
body{display:flex;flex-wrap:wrap;gap:32px;padding:32px}.page{position:relative;isolation:isolate;flex:0 0 auto;width:${width}px;height:${height}px;overflow:hidden;padding:76px;background:#FBF8F0}
.page.forest{background:#133F26;color:#fff}.page.black{background:#10110F;color:#fff}.page.white{background:#fff}
.page.vertical{padding:104px 78px 132px}.page.github{padding:60px 68px}
.safe-zone{position:absolute;inset:54px;z-index:5;border:2px dashed rgba(116,91,45,.58);pointer-events:none}.vertical .safe-zone{inset:220px 68px 300px}.github .safe-zone{inset:36px}
.safe-zone::before{position:absolute;top:-28px;right:0;padding:5px 8px;background:#FBF8F0;color:#745B2D;font-size:18px;font-weight:700;content:'SAFE ZONE • EDITOR OVERLAY'}
.forest .safe-zone,.black .safe-zone{border-color:rgba(255,255,255,.38)}.forest .safe-zone::before,.black .safe-zone::before{background:#10110F;color:#fff}
.logo{display:block;width:300px;height:auto}.github .logo{width:238px}.meta{display:flex;justify-content:space-between;gap:32px;align-items:center;padding-bottom:24px;border-bottom:2px solid #C7CBC0;font-size:21px;font-weight:700}
.forest .meta,.black .meta{border-color:rgba(255,255,255,.3)}.meta span:last-child{color:#686B65}.forest .meta span:last-child,.black .meta span:last-child{color:rgba(255,255,255,.65)}
h1,h2,h3,p{margin:0}h1,h2,h3{font-family:'Space Grotesk',Arial,sans-serif;font-weight:600;letter-spacing:-.03em}h1{max-width:930px;font-size:92px;line-height:.98}h2{font-size:72px;line-height:1.02}h3{font-size:36px;line-height:1.1}
.display{margin-top:100px}.vertical .display{margin-top:190px}.display p{max-width:760px;margin-top:40px;color:#63645C;font-size:31px;line-height:1.45}.forest .display p,.black .display p{color:rgba(255,255,255,.74)}
.rule{width:100%;height:2px;margin:48px 0;background:#12140F}.forest .rule,.black .rule{background:rgba(255,255,255,.45)}
.ledger{margin-top:56px;border-top:3px solid currentColor}.ledger-row{display:grid;grid-template-columns:48px 190px 1fr;gap:26px;align-items:start;padding:31px 0;border-bottom:2px solid #C7CBC0}.forest .ledger-row,.black .ledger-row{border-color:rgba(255,255,255,.25)}
.ledger-row strong{font-size:25px}.ledger-row p{font-size:28px;line-height:1.4}.source{margin-top:32px;padding-top:24px;border-top:2px solid #C7CBC0;color:#686B65;font-size:21px;line-height:1.4;overflow-wrap:anywhere}.forest .source,.black .source{border-color:rgba(255,255,255,.28);color:rgba(255,255,255,.68)}
.marker{position:relative;display:block;width:34px;height:34px;margin-top:2px}.confirmed{border-radius:0 100% 0 100%;background:#24553B}.confirmed::after{position:absolute;inset:11px;border-radius:0 100% 0 100%;background:#FBF8F0;content:''}.assumption{border:4px solid #745B2D;border-radius:0 100% 0 100%}.assumption::after{position:absolute;top:45px;left:0;width:40px;border-top:3px dashed #745B2D;content:''}.uncertainty{border:4px solid #686B65;border-radius:50%}.risk{width:27px;height:27px;margin:5px;background:#77372F;transform:rotate(45deg)}
.call{margin-top:64px;padding:48px;background:#133F26;color:#fff}.forest .call{background:#FBF8F0;color:#12140F}.call span{font-size:23px;font-weight:700}.call h2{margin-top:26px}.call dl{display:grid;grid-template-columns:1fr 1fr;gap:36px;margin:56px 0 0;padding-top:28px;border-top:2px solid rgba(255,255,255,.35)}.forest .call dl{border-color:#C7CBC0}.call dt{font-size:20px;font-weight:700}.call dd{margin:10px 0 0;font-size:24px;line-height:1.35}
.footer{position:absolute;right:76px;bottom:72px;left:76px;display:flex;justify-content:space-between;gap:30px;align-items:flex-end;padding-top:22px;border-top:2px solid #C7CBC0;font-size:20px}.vertical .footer{right:78px;bottom:120px;left:78px}.forest .footer,.black .footer{border-color:rgba(255,255,255,.3)}
.footer strong{max-width:62%;font-size:22px}.footer span{color:#686B65}.forest .footer span,.black .footer span{color:rgba(255,255,255,.62)}
.editor-note{position:absolute;right:0;bottom:0;left:0;padding:12px 28px;background:#745B2D;color:#fff;font-size:17px;font-weight:700;letter-spacing:.01em;text-align:center}.editor-note::before{content:'EDITOR FIELD — HIDE BEFORE EXPORT • '}
.arc{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:72px;border-block:3px solid currentColor}.arc div{min-height:230px;padding:30px 24px}.arc div+div{border-left:2px solid currentColor}.arc strong{display:block;font:600 32px/1.1 'Space Grotesk',Arial,sans-serif}.arc span{display:block;margin-top:96px;font-size:22px;line-height:1.35;opacity:.72}
.huge{font-size:138px;line-height:.9}.vertical .huge{font-size:120px}.vertical .stage{position:absolute;right:78px;bottom:390px;left:78px}.stage-label{display:inline-block;padding:10px 14px;border:2px solid currentColor;font-size:24px;font-weight:700}.stage h1{margin-top:38px}.stage p{max-width:780px;margin-top:42px;font-size:32px;line-height:1.45;color:#63645C}.forest .stage p,.black .stage p{color:rgba(255,255,255,.74)}
.axis{position:absolute;top:0;right:130px;width:2px;height:100%;background:#C7CBC0}.axis::after{position:absolute;bottom:310px;left:-12px;width:26px;height:26px;border-radius:0 100% 0 100%;background:#24553B;content:''}
.demo-window{margin-top:52px;border:3px solid #12140F;background:#fff}.demo-bar{display:flex;justify-content:space-between;padding:19px 24px;border-bottom:3px solid #12140F;background:#C7CBC0;font-size:21px;font-weight:700}.demo-body{display:grid;grid-template-columns:1fr 1.2fr;min-height:540px}.demo-panel{padding:36px}.demo-panel+.demo-panel{border-left:3px solid #12140F}.demo-panel span{color:#686B65;font-size:20px;font-weight:700}.demo-panel h3{margin-top:26px}.demo-line{height:16px;margin-top:24px;background:#C7CBC0}.demo-line.short{width:64%}.demo-result{margin-top:40px;padding:32px;background:#133F26;color:#fff}.demo-result p{margin-top:16px;font-size:24px;line-height:1.4}
.github-copy{display:grid;grid-template-columns:1.25fr .75fr;gap:70px;align-items:end;height:390px}.github-copy h1{font-size:70px}.github-copy p{margin-top:28px;color:#63645C;font-size:25px;line-height:1.45}.github-file{padding:32px;border:3px solid #133F26;background:#fff}.github-file strong{font:600 31px/1.2 'Space Grotesk',Arial,sans-serif}.github-file code{display:block;margin-top:28px;color:#686B65;font:22px/1.45 'IBM Plex Sans',Arial,sans-serif}.github-footer{display:flex;justify-content:space-between;align-items:end;padding-top:25px;border-top:2px solid #C7CBC0;font-size:19px}
`;

const meta = (right = '[WEEKLY SLUG]', variant = 'light') => {
  const source = variant === 'forest' ? logoForestUrl : variant === 'primary' ? logoPrimaryUrl : logoUrl;
  return `<div class="meta"><img class="logo" src="${source}" alt="GreenSquare AI"><span>${right}</span></div>`;
};
const footer = (left = '[SOURCE / OWNER / REVERSAL]', right = 'greensquare.ai/decision-frame') => `<div class="footer"><strong>${left}</strong><span>${right}</span></div>`;
const editor = (text) => `<div class="editor-note">ALT TEXT: ${text}</div>`;
const page = ({ label, body, className = '', notes = '' }) => `<section class="page ${className}" data-document-role="page" data-label="${label}" data-speaker-notes="${notes.replaceAll('"', '&quot;')}">${body}<div class="safe-zone" aria-hidden="true"></div></section>`;
const document = (title, width, height, pages) => `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><style>${baseStyles(width, height)}</style></head><body>${pages.join('')}</body></html>`;

const fourFivePages = [
  page({
    label: '01 Cover',
    notes: 'Editable: weekly slug, governing question, audience trigger, source. Keep the supplied lockup and safe-zone overlay locked. Hide editor overlay before export.',
    body: `${meta('[WEEKLY SLUG] / 01')}<div class="display"><h1>[Governing question?]</h1><p>[One sentence that names the audience trigger and why this decision matters now.]</p></div><div class="arc"><div><strong>Reveal</strong><span>Frame the question</span></div><div><strong>Inspect</strong><span>Show the evidence</span></div><div><strong>Align</strong><span>Expose risk</span></div><div><strong>Resolve</strong><span>Make the call</span></div></div>${footer('[PRIMARY SOURCE]')}${editor('[Describe the governing question and four-step decision arc.]')}`,
  }),
  page({
    label: '02 Evidence',
    notes: 'Editable: claim, evidence statements, state labels, source URL. State labels are mandatory. Keep marker geometry and colours locked.',
    body: `${meta('[WEEKLY SLUG] / 02')}<div class="display"><h2>What the evidence says.</h2></div><div class="ledger"><div class="ledger-row"><span class="marker confirmed"></span><strong>Confirmed</strong><p>[Verified evidence statement.]</p></div><div class="ledger-row"><span class="marker assumption"></span><strong>Assumption</strong><p>[Belief that still needs a test.]</p></div><div class="ledger-row"><span class="marker uncertainty"></span><strong>Uncertainty</strong><p>[Material gap or unresolved direction.]</p></div></div><p class="source">SOURCE: [Direct primary or authoritative source URL]</p>${footer('[INTERPRETATION BEGINS ON NEXT PAGE]')}${editor('[Summarise each written evidence state and the source.]')}`,
  }),
  page({
    label: '03 Recommendation',
    className: 'forest',
    notes: 'Editable: interpretation, recommendation, owner, material risk, reversal condition. Owner and reversal condition are required.',
    body: `${meta('[WEEKLY SLUG] / 03', 'forest')}<div class="display"><h2>The evidence does not make the call.</h2><p>[GreenSquare interpretation: explain what the evidence means without presenting judgement as fact.]</p></div><div class="call"><span>Recommendation</span><h2>[Action + scope + timing.]</h2><dl><div><dt>Owner</dt><dd>[Named decision owner]</dd></div><div><dt>Reverse when</dt><dd>[Observable threshold or event]</dd></div></dl></div>${footer('[MATERIAL RISK: WRITE IT HERE]')}${editor('[State the recommendation, owner, material risk, and reversal condition.]')}`,
  }),
  page({
    label: '04 Decision Frame CTA',
    className: 'black',
    notes: 'Editable: final line and UTM-tagged URL. Primary CTA stays the Decision Frame unless campaign strategy is explicitly changed.',
    body: `${meta('[WEEKLY SLUG] / 04', 'primary')}<div class="display"><h1>Frame it before AI answers it.</h1><p>Six questions to expose the real decision, test the assumption carrying the most risk, and separate evidence from interpretation.</p></div><div class="call"><span>Free Decision Frame</span><h2>greensquare.ai/decision-frame</h2></div>${footer('[UTM: CHANNEL / WEEKLY SLUG / CAROUSEL]')}${editor('[Invite the reader to download the free Decision Frame.]')}`,
  }),
];

const verticalPages = [
  page({ label: '01 Reveal', className: 'vertical black', notes: 'Motion action: Reveal. First-three-second hook. No essential meaning may depend on sound.', body: `${meta('[WEEKLY SLUG] / 00:00–00:03', 'primary')}<div class="axis"></div><div class="stage"><span class="stage-label">REVEAL</span><h1 class="huge">[The decision is not the prompt.]</h1><p>[One-line audience trigger.]</p></div>${footer('[CAPTIONS ON]')}${editor('[Describe the opening question and high-contrast text.]')}` }),
  page({ label: '02 Inspect', className: 'vertical', notes: 'Motion action: Inspect. Use canonical evidence labels and markers.', body: `${meta('[WEEKLY SLUG] / 00:04–00:12')}<div class="stage"><span class="stage-label">INSPECT</span><h1>[What is known?]</h1><div class="ledger"><div class="ledger-row"><span class="marker confirmed"></span><strong>Confirmed</strong><p>[Evidence.]</p></div><div class="ledger-row"><span class="marker assumption"></span><strong>Assumption</strong><p>[Belief.]</p></div><div class="ledger-row"><span class="marker risk"></span><strong>Material risk</strong><p>[Downside.]</p></div></div></div>${footer('[SOURCE URL]')}${editor('[Describe the three written evidence states.]')}` }),
  page({ label: '03 Align', className: 'vertical forest', notes: 'Motion action: Align. Distinguish GreenSquare interpretation from confirmed evidence.', body: `${meta('[WEEKLY SLUG] / 00:13–00:23', 'forest')}<div class="stage"><span class="stage-label">ALIGN</span><h1>[What the evidence means.]</h1><p>[Interpretation, written as judgement rather than fact.]</p><div class="rule"></div><h3>Owner: [Name or role]</h3></div>${footer('[COMMERCIALLY LICENSED SOUND]')}${editor('[State the interpretation and decision owner.]')}` }),
  page({ label: '04 Resolve', className: 'vertical black', notes: 'Motion action: Resolve. Recommendation and reversal condition remain readable without sound.', body: `${meta('[WEEKLY SLUG] / 00:24–00:34', 'primary')}<div class="stage"><span class="stage-label">RESOLVE</span><h1>[Make the call.]</h1><p>Reverse when: [observable threshold, event, or date].</p><div class="call"><span>Free Decision Frame</span><h3>greensquare.ai/decision-frame</h3></div></div>${footer('[UTM: CHANNEL / SLUG / VIDEO]')}${editor('[State the recommendation, reversal condition, and Decision Frame CTA.]')}` }),
];

const squarePages = [
  page({ label: '01 Evidence card', notes: 'Editable: state label, evidence statement, source. Use only one evidence state per standalone card.', body: `${meta('[WEEKLY SLUG] / EVIDENCE')}<div class="display"><span class="marker confirmed" style="width:62px;height:62px"></span><h1 style="margin-top:54px">Confirmed</h1><p>[One verified evidence statement. Keep it bounded.]</p></div><p class="source">SOURCE: [Direct source URL]</p>${footer('[INTERPRETATION: SEPARATE CAPTION OR NEXT CARD]')}${editor('[Name the Confirmed evidence and source.]')}` }),
  page({ label: '02 Reversal card', className: 'forest', notes: 'Editable: recommendation, owner, reversal condition. Do not omit the written reversal label.', body: `${meta('[WEEKLY SLUG] / REVERSAL', 'forest')}<div class="display"><h1>What would change the call?</h1><p>[Observable threshold, event, or date that reopens the recommendation.]</p></div><div class="call"><span>Current recommendation</span><h3>[Action.]</h3><dl><div><dt>Owner</dt><dd>[Name or role]</dd></div><div><dt>Reverse when</dt><dd>[Threshold]</dd></div></dl></div>${footer('[SOURCE URL]')}${editor('[State the current recommendation, owner, and reversal condition.]')}` }),
];

const horizontalPages = [
  page({ label: '01 Product demonstration', className: 'white', notes: 'Editable: demonstration title, simulated-data label, interface copy, source and owner. Replace the wireframe with a truthful capture when available.', body: `${meta('[WEEKLY SLUG] / PRODUCT DEMO')}<div class="demo-window"><div class="demo-bar"><span>GreenSquare decision workspace</span><span>[REAL CAPTURE / LABELLED SIMULATION]</span></div><div class="demo-body"><div class="demo-panel"><span>Governing question</span><h3>[What are we deciding, and why now?]</h3><div class="demo-line"></div><div class="demo-line short"></div><div class="demo-line"></div></div><div class="demo-panel"><span>Recommendation</span><div class="demo-result"><h3>[Action + owner]</h3><p>Reverse when: [threshold or event].</p></div><div class="ledger"><div class="ledger-row"><span class="marker confirmed"></span><strong>Confirmed</strong><p>[Evidence.]</p></div><div class="ledger-row"><span class="marker risk"></span><strong>Material risk</strong><p>[Downside.]</p></div></div></div></div></div>${footer('[SOURCE / OWNER / REVERSAL]')}${editor('[Describe the interface step, evidence, recommendation, and simulation label.]')}` }),
  page({ label: '02 Demonstration result', className: 'forest', notes: 'Editable: before/after state, recommendation, owner, reversal condition, CTA.', body: `${meta('[WEEKLY SLUG] / RESULT', 'forest')}<div class="display"><h1>From a weak brief to an owned decision.</h1><p>[One sentence describing the truthful product step demonstrated.]</p></div><div class="arc"><div><strong>Frame</strong><span>[Question]</span></div><div><strong>Inspect</strong><span>[Evidence]</span></div><div><strong>Call</strong><span>[Owner]</span></div><div><strong>Reverse</strong><span>[Threshold]</span></div></div>${footer('[SOURCE URL]')}${editor('[Describe the before-and-after decision state.]')}` }),
];

const githubPages = [
  page({ label: 'GitHub social preview', className: 'github', notes: 'Editable: repository or example title, one-line purpose, literal path or release. Keep the solid background and lockup. Export PNG under 1 MB.', body: `${meta('[REPOSITORY / RELEASE]')}<div class="github-copy"><div><h1>[Decision Frame example]</h1><p>[One-line statement of what the repository artefact helps a practitioner inspect or do.]</p></div><div class="github-file"><strong>[example-name]</strong><code>examples/[decision-slug]/README.md</code></div></div><div class="github-footer"><strong>Defensible decisions, inspectable in public.</strong><span>greensquare.ai</span></div>${editor('[Name the repository artefact and its purpose.]')}` }),
];

await mkdir(outputDir, { recursive: true });
const outputs = [
  ['greensquare-4x5-carousel.html', document('GreenSquare 4:5 carousel master', 1080, 1350, fourFivePages)],
  ['greensquare-9x16-motion.html', document('GreenSquare 9:16 motion storyboard master', 1080, 1920, verticalPages)],
  ['greensquare-1x1-evidence.html', document('GreenSquare 1:1 evidence master', 1080, 1080, squarePages)],
  ['greensquare-16x9-demo.html', document('GreenSquare 16:9 demonstration master', 1920, 1080, horizontalPages)],
  ['greensquare-github-preview.html', document('GreenSquare GitHub social preview master', 1280, 640, githubPages)],
];

for (const [name, contents] of outputs) {
  await writeFile(join(outputDir, name), contents, 'utf8');
}

console.log(`Built ${outputs.length} Canva-importable social masters in ${outputDir}`);
