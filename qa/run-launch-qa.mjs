import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = 'http://127.0.0.1:4321';
const routes = ['/', '/product/', '/free/', '/research/', '/benchmark/', '/about/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];
const output = 'qa/launch';
const browser = await chromium.launch();
const results = [];
let failed = false;

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${String(error)}`));
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(250);
    const status = response?.status() ?? 0;
    const state = await page.evaluate(() => ({
      h1: Boolean(document.querySelector('h1')),
      mains: document.querySelectorAll('main').length,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      body: document.body.innerText,
    }));
    if (status !== 200) errors.push(`HTTP ${status}`);
    if (!state.h1) errors.push('Primary heading missing');
    if (state.mains !== 1) errors.push(`Expected one main landmark, found ${state.mains}`);
    if (state.scrollWidth > state.clientWidth + 2) errors.push(`Horizontal overflow ${state.scrollWidth}/${state.clientWidth}`);
    if (/\b(?:Compass|Lens)\b|Decision Frame|The Decision(?! Brief)/.test(state.body)) errors.push('Retired product name visible');

    if (route === '/') {
      if (await page.getByRole('link', { name: /Try GreenSquare Free/i }).count() < 1) errors.push('Primary Free CTA missing');
      if (await page.locator('[data-decision-passage]').count() !== 1) errors.push('Decision animation missing');
    }
    if (route === '/free/') {
      if (await page.getByLabel('Email address').count() !== 1) errors.push('Email input missing');
      if (await page.getByRole('button', { name: /Email me GreenSquare Free/i }).count() !== 1) errors.push('Free submit action missing');
    }
    if (route === '/product/') {
      const tabs = page.getByRole('tab');
      if (await tabs.count() !== 3) errors.push('Product demo tabs missing');
      else {
        await page.getByRole('tab', { name: /Decision Brief/i }).click();
        if (!await page.getByRole('tabpanel', { name: /Decision Brief/i }).isVisible()) errors.push('Decision Brief panel did not activate');
        if (!/demo=brief/.test(page.url())) errors.push('Product demo state not deep-linked');
        await page.getByRole('tab', { name: /Decision Brief/i }).press('Home');
        if (await page.locator('[data-demo-tab="context"]').getAttribute('aria-selected') !== 'true') errors.push('Product demo keyboard navigation failed');
      }
      if (!/GreenSquare Pro[\s\S]*in development/i.test(state.body)) errors.push('Pro boundary missing');
    }
    if (route === '/research/' && !/not a test of the current GreenSquare Free plan or the future GreenSquare Pro plan/i.test(state.body)) errors.push('Research plan boundary missing');

    if (viewport.name === 'mobile') {
      // Use the stable control ID because the accessible name intentionally
      // changes between "Open menu" and "Close menu" as state changes.
      const menu = page.locator('#v-nav-toggle');
      if (await menu.count() !== 1) errors.push('Mobile menu button missing');
      else {
        await menu.click();
        if (await menu.getAttribute('aria-expanded') !== 'true') errors.push('Mobile menu did not open');
        await menu.press('Escape');
        if (await menu.getAttribute('aria-expanded') !== 'false') errors.push('Mobile menu did not close on Escape');
      }
    }

    const axe = await new AxeBuilder({ page }).analyze();
    const serious = axe.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''));
    if (serious.length) errors.push(`Axe: ${serious.map((item) => item.id).join(', ')}`);

    const safeRoute = route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '');
    const screenshot = path.join(output, `${safeRoute}-${viewport.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    const passed = errors.length === 0;
    if (!passed) failed = true;
    results.push({ route, viewport: viewport.name, status, errors, screenshot, passed });
    await page.close();
  }
  await context.close();
}

const reduced = await browser.newContext({ viewport: viewports[0], reducedMotion: 'reduce' });
const reducedPage = await reduced.newPage();
await reducedPage.goto(base + '/', { waitUntil: 'domcontentloaded' });
const reducedState = await reducedPage.evaluate(() => {
  const root = document.querySelector('[data-decision-passage]');
  const motion = root?.querySelector('.through-flow__desktop .through-flow__motion');
  const still = root?.querySelector('.through-flow__desktop .through-flow__still');
  return { motion: motion ? getComputedStyle(motion).display : 'missing', still: still ? getComputedStyle(still).display : 'missing' };
});
const reducedPassed = reducedState.motion === 'none' && reducedState.still !== 'none';
if (!reducedPassed) failed = true;
results.push({ route: '/', viewport: 'desktop-reduced-motion', reducedState, passed: reducedPassed });
await reduced.close();

await browser.close();
fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ passed: !failed, results }, null, 2));
console.log(JSON.stringify({ passed: !failed, results }, null, 2));
if (failed) process.exit(1);
