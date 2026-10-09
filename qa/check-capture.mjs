/**
 * Email capture and immediate delivery, checked against a running preview.
 *
 * Kit is never contacted. Every provider response here is a MOCK served by Playwright
 * route interception, so this proves the site's behaviour for each response, not that
 * the live Kit form accepts or delivers anything.
 *
 * Analytics calls are read from window.vaq, the queue @vercel/analytics fills before
 * (or instead of) sending, so the payload audit works without a Vercel deployment.
 *
 * Usage: npm run preview -- --host 127.0.0.1 --port 4321, then node qa/check-capture.mjs
 */
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import fs from 'node:fs';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const KIT = 'https://api.convertkit.com/v3/forms/9283111/subscribe';
const manifest = JSON.parse(fs.readFileSync('src/data/frame-free-release.json', 'utf8'));
const browser = await chromium.launch();
const results = [];

async function check(name, fn) {
  try {
    const detail = await fn();
    results.push({ name, pass: true, detail: detail ?? '' });
  } catch (error) {
    results.push({ name, pass: false, detail: String(error?.message ?? error) });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

/** A fresh page on /free/ with the first form, and a counter of Kit requests. */
async function formPage({ kit, route = '/free/', context: ctxOptions = {}, init } = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...ctxOptions });
  if (init) await context.addInitScript(init);
  const page = await context.newPage();
  const calls = [];
  await page.route(KIT, async (r) => {
    calls.push(r.request().postDataJSON());
    if (kit) await kit(r, calls.length);
    else await r.fulfill({ status: 200, contentType: 'application/json', body: '{"subscription":{"id":1}}' });
  });
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const form = page.locator('.capture-form').first();
  await form.scrollIntoViewIfNeeded();
  await form.locator('input[type=email]').waitFor();
  return { context, page, form, calls };
}

const vaq = (page) => page.evaluate(() => (window.vaq ?? []).map((entry) => Array.from(entry)));

await check('empty address is refused without a request and focus stays on the field', async () => {
  const { context, page, form, calls } = await formPage();
  await form.locator('button[type=submit]').click();
  await page.waitForTimeout(200);
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('type'));
  assert(calls.length === 0, 'a request was sent');
  assert(/full email address/.test(await form.locator('.form-status').innerText()), 'no invalid message');
  assert(focused === 'email', 'focus is not on the email field');
  await context.close();
});

await check('invalid address keeps the typed value', async () => {
  const { context, form, calls } = await formPage();
  await form.locator('input').fill('not-an-address');
  await form.locator('button[type=submit]').click();
  assert(calls.length === 0, 'a request was sent');
  assert((await form.locator('input').inputValue()) === 'not-an-address', 'typed value lost');
  await context.close();
});

await check('no PDF link inside the form before acceptance', async () => {
  const { context, page } = await formPage();
  const inForms = await page.locator('.capture-island a[href$="frame-free.pdf"]').count();
  assert(inForms === 0, `${inForms} PDF links rendered in forms before submission`);
  await context.close();
});

await check('accepted (MOCK 200): PDF offered at once, heading focused, start link present', async () => {
  const { context, page, form, calls } = await formPage();
  await form.locator('input').fill('qa@example.com');
  await form.locator('button[type=submit]').click();
  const ready = page.locator('.capture-ready').first();
  await ready.waitFor({ timeout: 3000 });
  const download = ready.locator('a[download]');
  const href = await download.getAttribute('href');
  const focused = await page.evaluate(() => document.activeElement?.className);
  const text = await ready.innerText();
  assert(calls.length === 1 && calls[0].email === 'qa@example.com', 'request body wrong');
  assert(href?.endsWith('/frame-free.pdf'), `download href ${href}`);
  assert(/capture-ready__heading/.test(focused ?? ''), 'focus not moved to the ready heading');
  assert(await ready.locator('a[href$="/start/"]').count() === 1, 'start link missing');
  assert(!/saved|confirmed|downloaded/i.test(text), 'ready panel claims a save, confirmation or download');
  const events = (await vaq(page)).map((e) => e[1]?.name ?? e[0]);
  return `events queued: ${JSON.stringify(events)}`;
});

await check('slow response (MOCK 2.5 s): status shown, button disabled, double submit sends once', async () => {
  const { context, page, form, calls } = await formPage({
    kit: async (r) => { await new Promise((res) => setTimeout(res, 2500)); await r.fulfill({ status: 200, body: '{}' }); },
  });
  await form.locator('input').fill('slow@example.com');
  await form.locator('button[type=submit]').click();
  await form.locator('input').press('Enter').catch(() => {});
  await page.waitForTimeout(300);
  const disabled = await form.locator('button[type=submit]').isDisabled();
  const status = await form.locator('.form-status').innerText();
  await page.locator('.capture-ready').first().waitFor({ timeout: 5000 });
  assert(disabled, 'button not disabled while sending');
  assert(/Sending/.test(status), `status was "${status}"`);
  assert(calls.length === 1, `${calls.length} requests sent`);
  await context.close();
});

await check('timeout (MOCK no response, clock advanced 15 s): request stopped, value kept, retry possible', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.install();
  let hold;
  await page.route(KIT, (r) => { hold = r; });
  await page.goto(base + '/free/', { waitUntil: 'domcontentloaded' });
  await page.clock.runFor(2000);
  const form = page.locator('.capture-form').first();
  await form.scrollIntoViewIfNeeded();
  await page.clock.runFor(1000);
  await form.locator('input').fill('wait@example.com');
  await form.locator('button[type=submit]').click();
  await page.clock.runFor(15100);
  await page.waitForTimeout(300);
  const status = await form.locator('.form-status').innerText();
  assert(/took too long/.test(status), `status was "${status}"`);
  assert((await form.locator('input').inputValue()) === 'wait@example.com', 'value lost');
  assert(!(await form.locator('button[type=submit]').isDisabled()), 'button still disabled');
  await hold?.abort().catch(() => {});
  await context.close();
});

await check('network failure (MOCK abort): error, value kept, support address shown', async () => {
  const { context, form } = await formPage({ kit: (r) => r.abort('failed') });
  await form.locator('input').fill('net@example.com');
  await form.locator('button[type=submit]').click();
  await form.locator('.form-status--error').waitFor({ timeout: 3000 });
  const text = await form.locator('.form-status').innerText();
  assert(/could not reach/.test(text) && /hello@greensquare\.ai/.test(text), `status was "${text}"`);
  assert((await form.locator('input').inputValue()) === 'net@example.com', 'value lost');
  await context.close();
});

await check('provider rejection (MOCK 400) then corrected address succeeds', async () => {
  const { context, page, form, calls } = await formPage({
    kit: (r, n) => n === 1 ? r.fulfill({ status: 400, body: '{"error":"Invalid email"}' }) : r.fulfill({ status: 200, body: '{}' }),
  });
  await form.locator('input').fill('typo@example.con');
  await form.locator('button[type=submit]').click();
  await form.locator('.form-status--error').waitFor({ timeout: 3000 });
  assert(/did not accept/.test(await form.locator('.form-status').innerText()), 'no rejection message');
  assert(await page.locator('.capture-ready').count() === 0, 'ready panel shown after rejection');
  await form.locator('input').fill('fixed@example.com');
  await form.locator('button[type=submit]').click();
  await page.locator('.capture-ready').first().waitFor({ timeout: 3000 });
  assert(calls.length === 2 && calls[1].email === 'fixed@example.com', 'corrected request wrong');
  await context.close();
});

await check('repeat contact (MOCK 200 for an existing subscriber) is not rejected', async () => {
  const { context, page, form } = await formPage({
    kit: (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"subscription":{"id":1,"state":"active"}}' }),
  });
  await form.locator('input').fill('again@example.com');
  await form.locator('button[type=submit]').click();
  await page.locator('.capture-ready').first().waitFor({ timeout: 3000 });
  await context.close();
});

await check('analytics and storage blocked: capture and delivery still work', async () => {
  const { context, page, form } = await formPage({
    init: () => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
      window.va = () => { throw new Error('analytics blocked'); };
    },
  });
  await page.route('**/_vercel/insights/**', (r) => r.abort());
  await form.locator('input').fill('blocked@example.com');
  await form.locator('button[type=submit]').click();
  await page.locator('.capture-ready').first().waitFor({ timeout: 3000 });
  await context.close();
});

await check('attribution: tagged landing survives navigation; analytics carries no email or free text', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route(KIT, (r) => r.fulfill({ status: 200, body: '{}' }));
  await page.goto(`${base}/?utm_source=LinkedIn&utm_campaign=Frame-Free-Launch&utm_content=jane.doe@acme.com&gs_channel=sk_live_51HxYzAbCdEfGhIjKlMnOpQrStUvWxYz0123456789&token=secret123`, { waitUntil: 'networkidle' });
  await page.goto(`${base}/free/`, { waitUntil: 'networkidle' });
  const form = page.locator('.capture-form').first();
  await form.scrollIntoViewIfNeeded();
  await form.locator('input').fill('person@example.com');
  await form.locator('button[type=submit]').click();
  await page.locator('.capture-ready').first().waitFor({ timeout: 3000 });
  const queued = await vaq(page);
  const serialised = JSON.stringify(queued);
  const stored = await page.evaluate(() => localStorage.getItem('gs_acquisition_v3'));
  assert(/f:linkedin\/other\/frame-free-launch\//.test(serialised), `first touch not carried: ${serialised.slice(0, 300)}`);
  assert(!/person@example\.com|secret123|@|jane|acme|sk_live/.test(serialised), 'email, token or @ found in analytics payload');
  assert(!/secret123|person@|jane|acme|sk_live/.test(stored ?? ''), 'token or email found in storage');
  const props = queued.filter((e) => e[0] === 'event').map((e) => Object.keys(e[1]?.data ?? {}).length);
  assert(props.every((n) => n <= 2), `an event carries more than two properties: ${props}`);
  await context.close();
  return `stored: ${stored}`;
});

await check('attribution filter discards email-, token- and id-shaped tag values', async () => {
  const hostile = [
    ['utm_source', 'jane.doe@acme.com'], ['utm_source', 'jane(at)acme(dot)com'], ['utm_campaign', 'sk_live_51HxQ2token9876543210'],
    ['utm_campaign', 'ghp_abc123'], ['utm_content', 'eyJhbGciOiJIUzI1NiJ9'], ['utm_medium', 'Bearer abc'], ['utm_source', '0412345678'],
  ];
  const leaked = [];
  for (const [key, value] of hostile) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${base}/?${key}=${encodeURIComponent(value)}`, { waitUntil: 'networkidle' });
    const stored = (await page.evaluate(() => localStorage.getItem('gs_acquisition_v3'))) ?? '';
    const core = value.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
    if (stored.replace(/[^a-z0-9]/g, '').includes(core)) leaked.push(`${key}=${value}`);
    await context.close();
  }
  assert(leaked.length === 0, `kept: ${leaked.join(', ')}`);
  return `${hostile.length} hostile values discarded`;
});

await check('unique input ids on every route', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const dupes = [];
  for (const route of ['/', '/free/', '/product/', '/about/', '/start/', '/examples/', '/404']) {
    await page.goto(base + route, { waitUntil: 'networkidle' }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const ids = await page.evaluate(() => Array.from(document.querySelectorAll('[id]'), (el) => el.id));
    const seen = new Set();
    for (const id of ids) { if (seen.has(id)) dupes.push(`${route}#${id}`); seen.add(id); }
  }
  assert(dupes.length === 0, `duplicate ids: ${dupes.join(', ')}`);
  await context.close();
});

await check('no script: no submit button is shown; fallback explains and offers recovery', async () => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  // 'load', not 'domcontentloaded': with scripts off, DOMContentLoaded can fire before
  // the stylesheet that hides the island has applied.
  await page.goto(base + '/free/', { waitUntil: 'load' });
  const visibleSubmit = await page.locator('.capture-island button[type=submit]').evaluateAll((els) => els.filter((el) => el.offsetParent !== null).length);
  const body = await page.locator('body').innerText();
  assert(visibleSubmit === 0, `${visibleSubmit} visible submit buttons without scripts`);
  assert(/needs JavaScript/.test(body) && /open the Frame Free PDF directly/.test(body), 'fallback text missing');
  await context.close();
});

await check('served PDF matches the manifest (signature, bytes, pages, SHA-256)', async () => {
  const context = await browser.newContext();
  const res = await context.request.get(base + manifest.path);
  const body = await res.body();
  const sha = createHash('sha256').update(body).digest('hex');
  const pages = (body.toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
  assert(res.status() === 200, `HTTP ${res.status()}`);
  assert(/application\/pdf/.test(res.headers()['content-type'] ?? ''), `content-type ${res.headers()['content-type']}`);
  assert(body.subarray(0, 5).toString() === '%PDF-', 'no PDF signature');
  assert(body.length === manifest.bytes && pages === manifest.pages && sha === manifest.sha256, 'manifest mismatch');
  await context.close();
  return `${body.length} bytes, ${pages} pages, ${sha.slice(0, 12)}`;
});

await browser.close();
fs.mkdirSync('qa/capture', { recursive: true });
fs.writeFileSync('qa/capture/results.json', JSON.stringify({ base, mocked: 'Kit responses are mocked; live Kit not contacted', results }, null, 2));
for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.name}${r.detail ? `\n     ${r.detail}` : ''}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed} passed, ${failed} failed (Kit responses mocked).`);
process.exit(failed ? 1 : 0);
