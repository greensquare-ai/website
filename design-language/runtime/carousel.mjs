import { renderComposition } from './render.mjs';
import { validateComposition } from './qa.mjs';

const ROLE_ORDER = ['carousel_opener','problem','reframe','method','example','implication','cta'];

export function validateCarousel(spec) {
  const failures = [];
  const slides = spec.slides || [];
  if (!spec.id) failures.push('missing_carousel_id');
  if (slides.length < 5 || slides.length > 8) failures.push('carousel_slide_count_out_of_bounds');
  if (slides[0]?.role !== 'carousel_opener') failures.push('first_slide_must_be_opener');
  if (slides.at(-1)?.role !== 'cta') failures.push('last_slide_must_be_cta');
  const roles = slides.map(s => s.role);
  if (!roles.includes('reframe')) failures.push('missing_reframe');
  if (!roles.includes('method')) failures.push('missing_method');
  const expectedPositions = roles.map(r => ROLE_ORDER.indexOf(r));
  for (let i=1;i<expectedPositions.length;i++) {
    if (expectedPositions[i] < expectedPositions[i-1]) failures.push('narrative_role_order_invalid');
  }
  const formats = new Set(slides.map(s => s.format));
  if (formats.size > 1) failures.push('mixed_carousel_formats');
  const passageCount = slides.filter(s => s.pattern?.behaviour === 'passage').length;
  if (passageCount > 1) failures.push('too_many_signature_passages');
  for (let i=0;i<slides.length;i++) {
    const qa = validateComposition(slides[i]);
    for (const failure of qa.failures) failures.push(`slide_${i+1}:${failure}`);
    if (i > 0) {
      const previousHasPattern = slides[i-1].pattern?.behaviour !== 'none';
      const currentHasPattern = slides[i].pattern?.behaviour !== 'none';
      if (previousHasPattern && currentHasPattern) failures.push(`slide_${i+1}:adjacent_pattern_instance`);
    }
    if (slides[i].role !== 'cta' && slides[i].content?.cta) failures.push(`slide_${i+1}:cta_before_close`);
  }
  return { pass: failures.length === 0, failures };
}

export function renderCarousel(spec) {
  const qa = validateCarousel(spec);
  if (!qa.pass) throw new Error(`Carousel failed QA: ${qa.failures.join(', ')}`);
  return spec.slides.map((slide,index) => ({
    index: index + 1,
    id: slide.id,
    role: slide.role,
    svg: renderComposition(slide)
  }));
}
