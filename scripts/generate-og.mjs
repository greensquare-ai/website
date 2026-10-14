/**
 * Generate a platform-compatible social preview.
 * Source stays editable SVG; emitted PNG is generated at build time.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const output = new URL('../public/assets/og-image-v2.png', import.meta.url);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f3ec"/>
  <rect x="46" y="46" width="1108" height="538" fill="none" stroke="#dedad2" stroke-width="1"/>
  <g transform="translate(100 96)" fill="none" stroke="#133f26" stroke-width="3.2">
    <rect x="0" y="0" width="17" height="17" rx="7"/><rect x="22" y="0" width="17" height="17" rx="7"/>
    <rect x="0" y="22" width="17" height="17" rx="7"/><rect x="22" y="22" width="17" height="17" rx="7"/>
  </g>
  <text x="158" y="126" fill="#133f26" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="29" letter-spacing="-0.8">GreenSquare</text>
  <line x1="100" y1="171" x2="1100" y2="171" stroke="#dedad2" stroke-width="1.3"/>
  <text x="100" y="250" fill="#6d756e" font-family="Arial,Helvetica,sans-serif" font-size="16" letter-spacing="3">FRAME THE DECISION</text>
  <text x="96" y="342" fill="#133f26" font-family="Georgia,'Times New Roman',serif" font-size="70" letter-spacing="-1.9">Frame the decision</text>
  <text x="96" y="421" fill="#133f26" font-family="Georgia,'Times New Roman',serif" font-size="70" letter-spacing="-1.9">before AI answers it.</text>
  <line x1="100" y1="486" x2="1100" y2="486" stroke="#dedad2" stroke-width="1.3"/>
  <text x="100" y="535" fill="#49564c" font-family="Arial,Helvetica,sans-serif" font-size="20">A more disciplined starting point for consequential decisions.</text>
  <text x="1098" y="535" text-anchor="end" fill="#133f26" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700">greensquare.ai</text>
</svg>`;
await mkdir(new URL('../public/assets/', import.meta.url), { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output.pathname);
console.log('Generated /assets/og-image-v2.png (1200×630)');
