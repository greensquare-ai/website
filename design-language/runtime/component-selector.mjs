const EVIDENCE_STATES = new Set(['GIVEN','DERIVED','INFERRED','UNKNOWN']);

export function selectNativeComponent(slide) {
  if (slide.component?.type) return { component: slide.component, reason: 'explicit_component' };
  const c = slide.content || {};

  if (Array.isArray(c.evidence_items) && c.evidence_items.length) {
    return { component: { type:'evidence_ledger', items:c.evidence_items, y:c.component_y || 690 }, reason:'evidence_items_present' };
  }
  if (Array.isArray(c.options) && c.options.length >= 2) {
    return { component: { type:'options_comparison', options:c.options, y:c.component_y || 690 }, reason:'multiple_options_present' };
  }
  if (c.assumption && c.risk && c.reversal) {
    return { component: { type:'assumption_risk', assumption:c.assumption, risk:c.risk, reversal:c.reversal, y:c.component_y || 680 }, reason:'assumption_risk_reversal_present' };
  }
  if (c.recommendation && c.owner && c.next_action) {
    return { component: { type:'recommendation', recommendation:c.recommendation, because:c.because || '', owner:c.owner, next:c.next_action, y:c.component_y || 680 }, reason:'recommendation_owner_next_present' };
  }
  if (Array.isArray(c.exhibit_items) && c.exhibit_items.length >= 2) {
    return { component: { type:'bar_exhibit', items:c.exhibit_items, y:c.component_y || 700 }, reason:'quantitative_exhibit_present' };
  }
  return { component:null, reason:'no_structured_component_signal' };
}

export function validateSelectedComponent(selection) {
  const failures=[];
  const component=selection?.component;
  if (!component) return { pass:true, failures };
  if (component.type === 'evidence_ledger') {
    if (!component.items?.length) failures.push('selected_evidence_ledger_without_items');
    for (const item of component.items || []) if (!EVIDENCE_STATES.has(item.state)) failures.push('selected_evidence_ledger_invalid_state');
  }
  if (component.type === 'options_comparison' && (component.options?.length || 0) < 2) failures.push('selected_options_comparison_requires_two_options');
  if (component.type === 'assumption_risk' && (!component.assumption || !component.risk || !component.reversal)) failures.push('selected_assumption_risk_incomplete');
  if (component.type === 'recommendation' && (!component.recommendation || !component.owner || !component.next)) failures.push('selected_recommendation_incomplete');
  if (component.type === 'bar_exhibit' && (component.items?.length || 0) < 2) failures.push('selected_bar_exhibit_requires_two_items');
  return { pass:failures.length===0, failures };
}
