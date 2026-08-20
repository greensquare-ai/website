const LAYOUTS = {
  instagram_4x5: {
    none: { headline_y: 400, body_y: 770 },
    evidence_ledger: { headline_y: 360, component_y: 650 },
    options_comparison: { headline_y: 350, component_y: 700 },
    assumption_risk: { headline_y: 350, component_y: 650 },
    recommendation: { headline_y: 350, component_y: 650 },
    bar_exhibit: { headline_y: 350, component_y: 690 }
  },
  linkedin_square: {
    none: { headline_y: 340, body_y: 680 },
    evidence_ledger: { headline_y: 310, component_y: 570 },
    options_comparison: { headline_y: 300, component_y: 590 },
    assumption_risk: { headline_y: 300, component_y: 560 },
    recommendation: { headline_y: 300, component_y: 560 },
    bar_exhibit: { headline_y: 300, component_y: 590 }
  }
};

export function resolveSlideLayout(slide, { automatic=true } = {}) {
  const type = slide.component?.type || 'none';
  const layout = LAYOUTS[slide.format]?.[type] || LAYOUTS[slide.format]?.none;
  if (!layout) return slide;
  const content = { ...(slide.content || {}) };
  const component = slide.component ? { ...slide.component } : null;
  if (automatic) {
    content.headline_y = layout.headline_y;
    if (content.body) content.body_y = layout.body_y || content.body_y;
    if (component && layout.component_y) component.y = layout.component_y;
  }
  return {
    ...slide,
    content,
    component,
    runtime_trace: {
      ...(slide.runtime_trace || {}),
      layout_resolution: { format: slide.format, component: type, automatic }
    }
  };
}
