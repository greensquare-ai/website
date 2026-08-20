import { tokens } from './tokens.mjs';
import { selectNativeComponent } from './component-selector.mjs';
import { resolveSlideLayout } from './layout.mjs';

function patternRegionFor(formatName, pattern) {
  const format = tokens.formats[formatName];
  const S = Math.min(pattern?.S || 320, formatName === 'linkedin_square' ? 320 : 360);
  return {
    S,
    region: {
      x: format.width - format.safe - S,
      y: format.safe,
      width: S,
      height: S
    }
  };
}

function protectedRegionFor(formatName, hasComponent) {
  const f = tokens.formats[formatName];
  const width = Math.min(f.width - (f.safe * 2), formatName === 'linkedin_square' ? 700 : 660);
  return {
    x: f.safe,
    y: formatName === 'linkedin_square' ? 240 : 280,
    width,
    height: f.height - (formatName === 'linkedin_square' ? 390 : 500)
  };
}

export function adaptSlideFormat(slide, targetFormat) {
  if (!tokens.formats[targetFormat]) throw new Error(`Unsupported target format: ${targetFormat}`);
  const selection = selectNativeComponent(slide);
  const p = patternRegionFor(targetFormat, slide.pattern || {});
  const adapted = {
    ...slide,
    format: targetFormat,
    pattern: {
      ...(slide.pattern || {}),
      S: p.S,
      region: p.region
    },
    content: {
      ...(slide.content || {}),
      protected_region: protectedRegionFor(targetFormat, Boolean(selection.component || slide.component))
    },
    component: selection.component || slide.component || null,
    runtime_trace: {
      ...(slide.runtime_trace || {}),
      format_adaptation: {
        from: slide.format,
        to: targetFormat,
        method: 'recompose_from_runtime_grammar_not_scale'
      },
      component_selection: {
        type: (selection.component || slide.component)?.type || null,
        reason: selection.reason
      }
    }
  };
  return resolveSlideLayout(adapted, { automatic: selection.reason !== 'explicit_component' });
}

export function adaptCarouselFormat(carousel, targetFormat) {
  return {
    ...carousel,
    id: `${carousel.id}.${targetFormat.toUpperCase()}`,
    format: targetFormat,
    slides: (carousel.slides || []).map(slide => adaptSlideFormat(slide, targetFormat))
  };
}
