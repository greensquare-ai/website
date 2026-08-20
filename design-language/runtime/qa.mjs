import { tokens } from './tokens.mjs';

export function validateComposition(spec) {
  const failures = [];
  const format = tokens.formats[spec.format];
  if (!format) failures.push(`unsupported_format:${spec.format}`);
  if (!tokens.colourModes[spec.mode]) failures.push(`unsupported_colour_mode:${spec.mode}`);
  if (!spec.content?.headline?.trim()) failures.push('missing_headline');
  if (!spec.role) failures.push('missing_role');
  if (!spec.pattern?.behaviour) failures.push('missing_pattern_behaviour');
  if (![0,90,180,270].includes(spec.pattern?.orientation ?? 0)) failures.push('invalid_pattern_orientation');
  if ((spec.pattern?.instances ?? 1) > tokens.rules.patternInstancesPerFrame) failures.push('too_many_pattern_instances');
  if (spec.pattern?.behaviour === 'passage' && !['carousel_opener','campaign_opener','closing_frame'].includes(spec.role)) failures.push('passage_used_for_non_signature_role');
  if (spec.content?.headline_lines && spec.content.headline_lines.length > tokens.rules.headlineMaxLines) failures.push('headline_too_many_lines');
  if (spec.content?.source_state && !['GIVEN','DERIVED','INFERRED','UNKNOWN'].includes(spec.content.source_state)) failures.push('invalid_evidence_state');
  if (spec.pattern?.behaviour !== 'none' && spec.content?.protected_region && spec.pattern?.region) {
    const a = spec.content.protected_region;
    const b = spec.pattern.region;
    const intersects = a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
    if (intersects) failures.push('pattern_intersects_protected_region');
  }
  return { pass: failures.length === 0, failures };
}
