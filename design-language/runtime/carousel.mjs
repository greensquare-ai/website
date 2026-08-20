import { renderComposition } from './render.mjs';
import { validateComposition } from './qa.mjs';
import { selectNativeComponent, validateSelectedComponent } from './component-selector.mjs';
import { resolveSlideLayout } from './layout.mjs';

const ROLE_ORDER = ['carousel_opener','problem','reframe','method','example','implication','cta'];

export function resolveCarouselComponents(spec) {
  return {
    ...spec,
    slides: (spec.slides || []).map(slide => {
      const selection = selectNativeComponent(slide);
      const selected = {
        ...slide,
        component: selection.component || slide.component || null,
        runtime_trace: {
          ...(slide.runtime_trace || {}),
          component_selection: { type: selection.component?.type || null, reason: selection.reason }
        }
      };
      return resolveSlideLayout(selected, { automatic: selection.reason !== 'explicit_component' });
    })
  };
}

export function validateCarousel(spec) {
  const failures = [];
  const resolved = resolveCarouselComponents(spec);
  const slides = resolved.slides || [];
  if (!resolved.id) failures.push('missing_carousel_id');
  if (slides.length < 5 || slides.length > 8) failures.push('carousel_slide_count_out_of_bounds');
  if (slides[0]?.role !== 'carousel_opener') failures.push('first_slide_must_be_opener');
  if (slides.at(-1)?.role !== 'cta') failures.push('last_slide_must_be_cta');
  const roles = slides.map(s => s.role);
  if (!roles.includes('reframe')) failures.push('missing_reframe');
  if (!roles.includes('method')) failures.push('missing_method');
  const expectedPositions = roles.map(r => ROLE_ORDER.indexOf(r));
  for (let i=1;i<expectedPositions.length;i++) if (expectedPositions[i] < expectedPositions[i-1]) failures.push('narrative_role_order_invalid');
  const formats = new Set(slides.map(s => s.format));
  if (formats.size > 1) failures.push('mixed_carousel_formats');
  const passageCount = slides.filter(s => s.pattern?.behaviour === 'passage').length;
  if (passageCount > 1) failures.push('too_many_signature_passages');
  for (let i=0;i<slides.length;i++) {
    const selectionQa = validateSelectedComponent({ component: slides[i].component });
    for (const failure of selectionQa.failures) failures.push(`slide_${i+1}:${failure}`);
    const qa = validateComposition(slides[i]);
    for (const failure of qa.failures) failures.push(`slide_${i+1}:${failure}`);
    if (i > 0) {
      const previousHasPattern = slides[i-1].pattern?.behaviour !== 'none';
      const currentHasPattern = slides[i].pattern?.behaviour !== 'none';
      if (previousHasPattern && currentHasPattern) failures.push(`slide_${i+1}:adjacent_pattern_instance`);
    }
    if (slides[i].role !== 'cta' && slides[i].content?.cta) failures.push(`slide_${i+1}:cta_before_close`);
  }
  return { pass: failures.length === 0, failures, resolved };
}

export function renderCarousel(spec) {
  const qa = validateCarousel(spec);
  if (!qa.pass) throw new Error(`Carousel failed QA: ${qa.failures.join(', ')}`);
  return qa.resolved.slides.map((slide,index) => ({
    index: index + 1,
    id: slide.id,
    role: slide.role,
    component: slide.component?.type || null,
    component_selection_reason: slide.runtime_trace?.component_selection?.reason || null,
    layout_resolution: slide.runtime_trace?.layout_resolution || null,
    svg: renderComposition(slide)
  }));
}
