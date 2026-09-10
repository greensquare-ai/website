/* Full-page screenshots of every public route at desktop and mobile widths.
   Usage: node qa/shots.mjs [baseUrl]   (writes to qa/shots/, which is gitignored) */
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.argv[2] || 'http://127.0.0.1:4321';
const routes = ['/', '/product/', '/free/', '/research/', '/benchmark/', '/methodology/', '/about/', '/legal/privacy/', '/legal/terms/', '/legal/cookies/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
];
fs.mkdirSync('qa/shots', { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile ?? false, deviceScaleFactor: vp.deviceScaleFactor ?? 1 });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
    const file = `qa/shots/${name}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight, fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i) }));
    report.push({ route, vp: vp.name, overflow: m.sw > m.cw + 1 ? `${m.sw}/${m.cw}` : 'none', height: m.h, fonts: m.fonts.join(','), errors });
    await page.close();
  }
  await context.close();
}
await browser.close();
console.table(report);
