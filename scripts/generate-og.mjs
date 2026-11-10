/**
 * Generate a platform-compatible social preview.
 * Source stays editable SVG; emitted PNG is generated at build time.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const output = new URL('../public/assets/og-image-v2.png', import.meta.url);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="#133f26"/>
  <g transform="translate(100 92)" fill="none" stroke="#133f26" stroke-width="3.2">
    <rect x="0" y="0" width="17" height="17" rx="7"/><rect x="22" y="0" width="17" height="17" rx="7"/>
    <rect x="0" y="22" width="17" height="17" rx="7"/><rect x="22" y="22" width="17" height="17" rx="7"/>
  </g>
  <text x="158" y="122" fill="#111111" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="29" letter-spacing="-0.6">GreenSquare AI</text>
  <text x="96" y="300" fill="#111111" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="68" letter-spacing="-2">Find the real question</text>
  <text x="96" y="382" fill="#111111" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="68" letter-spacing="-2">before AI answers it.</text>
  <rect x="0" y="470" width="1200" height="160" fill="#0b2e1c"/>
  <text x="100" y="560" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="26">Frame Free: a free PDF guide for ChatGPT, Claude or Gemini.</text>
  <text x="1100" y="560" text-anchor="end" fill="#cfe0d5" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700">greensquare.ai</text>
</svg>`;
await mkdir(new URL('../public/assets/', import.meta.url), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output.pathname);
console.log('Generated /assets/og-image-v2.png (1200×630)');
