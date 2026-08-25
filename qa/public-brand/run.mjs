import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321';
const output = 'qa/public-brand/artifacts';
fs.mkdirSync(output, { recursive: true });

const routes = [
  { path: '/', name: 'home', demos: ['adaptive-decision'] },
  { path: '/decision-frame/', name: 'decision-frame', demos: ['adaptive-decision', 'execution-path'] },
  { path: '/product/', name: 'product', demos: ['evidence-state', 'option-scorecard'] },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 1024, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

function isExpectedLocalPreviewMiss(url) {
  try {
    const parsed = new URL(url);
    return parsed.pathname.startsWith('/_vercel/insights/');
  } catch {
    return false;
  }
}

const browser = await chromium.launch();
const results = [];
let failed = false;

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });

  for (const route of routes) {
    const page = await context.newPage();
    const pageErrors = [];

    page.on('pageerror', (error) => pageErrors.push(`pageerror: ${String(error)}`));
    page.on('console', (message) => {
      if (message.type() === 'error' && !/^Failed to load resource:/i.test(message.text())) {
        pageErrors.push(`console: ${message.text()}`);
      }
    });
    page.on('response', (response) => {
      if (response.status() >= 400 && !isExpectedLocalPreviewMiss(response.url())) {
        pageErrors.push(`response ${response.status()}: ${response.url()}`);
      }
    });

    const response = await page.goto(`${base}${route.path}`, { waitUntil: 'networkidle' });
    const status = response?.status() ?? 0;
    const h1Visible = await page.locator('h1').first().isVisible().catch(() => false);
    const geometry = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    const horizontalOverflow = geometry.scrollWidth > geometry.clientWidth + 2;

    const demoChecks = [];
    for (const demoId of route.demos) {
      const locator = page.locator(`[data-product-demo="${demoId}"]`).first();
      const count = await locator.count();
      if (!count) {
        demoChecks.push({ demoId, present: false });
        pageErrors.push(`Missing product demo: ${demoId}`);
        continue;
      }

      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);

      const stepButtons = locator.locator('.pd__step');
      const stepCount = await stepButtons.count();
      if (stepCount > 0) await stepButtons.nth(stepCount - 1).click();

      if (demoId === 'option-scorecard') {
        await locator.getByRole('button', { name: 'Retention confirmed' }).click();
        const recommendation = await locator.locator('.pd-recommendation').innerText();
        if (!/Preferred: Acquire now/i.test(recommendation)) pageErrors.push('Option scorecard did not react to changed evidence');
      }

      if (demoId === 'adaptive-decision') {
        const question = await locator.locator('.pd__question').innerText();
        if (!/what result would be strong enough/i.test(question)) pageErrors.push('Adaptive demo did not reach the selected decision state');
      }

      const box = await locator.boundingBox();
      const visible = await locator.isVisible();
      const sized = Boolean(box && box.width >= Math.min(300, viewport.width - 32) && box.height >= 160);
      if (!visible || !sized) pageErrors.push(`Product demo not visibly sized: ${demoId}`);
      demoChecks.push({ demoId, present: true, visible, sized, box });

      await page.addStyleTag({ content: '.v-nav { visibility: hidden !important; }' });
      await locator.screenshot({ path: path.join(output, `${route.name}-${demoId}-${viewport.name}.png`) });
      await page.locator('style').last().evaluate((node) => node.remove());
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.addStyleTag({ content: '.v-nav { position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; }' });
    const screenshot = path.join(output, `${route.name}-${viewport.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const passed = status === 200 && h1Visible && !horizontalOverflow && pageErrors.length === 0;
    if (!passed) failed = true;
    results.push({ route: route.path, viewport: viewport.name, status, h1Visible, horizontalOverflow, demoChecks, pageErrors, passed });
    await page.close();
  }

  await context.close();
}

const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(`${base}/`, { waitUntil: 'networkidle' });
const adaptive = reducedPage.locator('[data-product-demo="adaptive-decision"]');
await adaptive.scrollIntoViewIfNeeded();
await reducedPage.waitForTimeout(150);
const reducedFinalStep = await adaptive.locator('.pd__step.is-active').innerText().catch(() => '');
if (reducedFinalStep !== '05') {
  failed = true;
  results.push({ route: '/', viewport: 'reduced-motion', passed: false, pageErrors: [`Reduced-motion final state expected 05, received ${reducedFinalStep || 'none'}`] });
} else {
  results.push({ route: '/', viewport: 'reduced-motion', passed: true, pageErrors: [] });
}
await reducedContext.close();
await browser.close();

fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ passed: !failed, results }, null, 2));
console.log(JSON.stringify({ passed: !failed, results }, null, 2));
if (failed) process.exit(1);
