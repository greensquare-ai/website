import { tokens } from './tokens.mjs';

const orientations = new Set([0, 90, 180, 270]);
const behaviours = new Set(['passage', 'horizon', 'open_corner', 'none']);

export function throughFlow({ behaviour='none', orientation=0, mode='paper', x, y, S=360, prominence='ambient' }) {
  if (!behaviours.has(behaviour)) throw new Error(`Unsupported Through-flow behaviour: ${behaviour}`);
  if (!orientations.has(orientation)) throw new Error(`Orientation must be 0, 90, 180 or 270`);
  if (behaviour === 'none') return '';
  const colours = tokens.colourModes[mode];
  if (!colours) throw new Error(`Unsupported colour mode: ${mode}`);
  const q = S / 4;
  const stroke = tokens.stroke.social;
  const opacity = prominence === 'ambient' ? 0.72 : 1;

  const passage = [
    `M ${-q} 0 H ${S-q} V ${q}`,
    `M ${S} ${-q} V ${S-q} H ${S-q}`,
    `M ${S+q} ${S} H ${q} V ${S-q}`,
    `M 0 ${S+q} V ${q} H ${q}`
  ];
  const horizon = [
    `M ${-q} ${S/2} H ${S+q}`,
    `M ${S-q} ${q} V ${S-q} H ${S+q}`
  ];
  const openCorner = [
    `M ${-q} ${q} H ${S-q} V ${S/2}`,
    `M ${q} ${S+q} V ${S-q} H ${S/2}`
  ];
  const neutralPaths = behaviour === 'passage' ? passage : behaviour === 'horizon' ? horizon : openCorner;
  const accent = behaviour === 'passage'
    ? `M ${-q} ${S/2} H ${S/2} V ${S+q}`
    : behaviour === 'horizon'
      ? `M ${-q} ${S/2} H ${S+q}`
      : `M ${S/2} ${-q} V ${S/2} H ${S+q}`;

  return `<g transform="translate(${x} ${y}) rotate(${orientation} ${S/2} ${S/2})" fill="none" stroke-linecap="square" stroke-linejoin="miter" opacity="${opacity}">
${neutralPaths.map(d => `<path d="${d}" stroke="${colours.neutral}" stroke-width="${stroke}"/>`).join('\n')}
<path d="${accent}" stroke="${colours.accent}" stroke-width="${stroke}"/>
</g>`;
}
