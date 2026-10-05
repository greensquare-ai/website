/**
 * The Frame Free film section on the homepage (src/components/FrameFreeFilm.astro).
 *
 * At 1440, 820 and 390 it checks that:
 *   - the poster is visible in a box reserved at the data file's aspect ratio, and the box
 *     does not change size when the poster or the video arrives (no layout shift);
 *   - under reduced motion there is no <video> and no control, only poster and text;
 *   - with motion allowed the <video> is added only once the figure is near the viewport,
 *     and its source is the composition for that viewport;
 *   - the Pause/Play control is a real button, at least 44px tall, whose name follows
 *     state and whose clicks change the video's `paused` property; the film pauses off
 *     screen and when the document is hidden, and never resumes one the reader paused;
 *   - the text equivalent opens and holds all seven parts of the framing handoff;
 *   - with JavaScript off the reader gets the poster and the text, and no control.
 *
 * Codec note. Playwright's Chromium is an open-source build without H.264, so it cannot
 * decode the production MP4s (Chrome, Edge, Safari and Firefox can). When the browser
 * reports no H.264 support, the playback checks are run against a VP9 transcode of the
 * same served file, delivered at the same URL by request interception, and the report
 * says so. If ffmpeg is unavailable those checks are reported as not run rather than
 * passed. Source selection, insertion, removal and layout are tested on the real files.
 *
 * Usage: node qa/check-frame-free-film.mjs   (preview server on QA_BASE_URL)
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = process.env.QA_OUTPUT || 'qa/launch/frame-free-film';
await fs.mkdir(output, { recursive: true });

const viewports = [
  { width: 1440, height: 1000 },
  { width: 820, height: 1180 },
  { width: 390, height: 844 },
];
/* The seven parts as the guide's framing handoff names them (frame-free.pdf, pages 2 and 5).
   Held here independently of src/data/frame-free-film.ts so the page is checked against
   the guide, not against itself. */
const handoff = [
  'Presented decision',
  'Decision underneath',
  'Missing third option',
  'Load-bearing assumption',
  'Untested constraints',
  'Evidence map',
  'Reframed decision',
];
const mustContain = [
  'The software was the surface',
  'Choose vendor A or vendor B by the end of the month. The trigger is a renewal notice.',
  'The budget cap was set two years ago and has not been retested.',
  'Evidence gap to test next',
  'No options were scored. Nothing was recommended. The question became the right one',
];
const words = ['Given', 'Derived', 'Inferred', 'Unknown', 'Assumed'];

const has = (cmd) => { try { execFileSync(cmd, ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } };
const results = [];
const notRun = [];
const record = (name, viewport, errors, extra = {}) => results.push({ check: name, viewport, passed: errors.length === 0, errors, ...extra });

const browser = await chromium.launch();

/* Read what the page itself declares: sources, media queries and reserved ratios. */
async function declared(page) {
  return page.locator('[data-film]').evaluate((root) => {
    const style = root.getAttribute('style') || '';
    const ratio = (name) => {
      const m = style.match(new RegExp(`--film-ratio-${name}:\\s*(\\d+)\\s*/\\s*(\\d+)`));
      return m ? { w: Number(m[1]), h: Number(m[2]) } : null;
    };
    return {
      desktop: { src: root.dataset.filmDesktop, media: root.dataset.filmDesktopMedia, ratio: ratio('desktop') },
      mobile: { src: root.dataset.filmMobile, media: root.dataset.filmMobileMedia, ratio: ratio('mobile') },
      isMobile: matchMedia(root.dataset.filmMobileMedia).matches,
    };
  });
}

const frameBox = (page) => page.locator('[data-film-frame]').evaluate((el) => {
  const r = el.getBoundingClientRect();
  return { width: r.width, height: r.height };
});
const ratioError = (box, ratio, label) => {
  const measured = box.width / box.height;
  const expected = ratio.w / ratio.h;
  return Math.abs(measured - expected) / expected > 0.01 ? [`${label}: box ratio ${measured.toFixed(3)}, expected ${expected.toFixed(3)}`] : [];
};
/* Layout shifts recorded from the moment the reader scrolls towards the film. */
const watchShifts = (page) => page.evaluate(() => {
  window.__filmShifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__filmShifts.push(e.value);
  }).observe({ type: 'layout-shift' });
});
const shifts = (page) => page.evaluate(() => (window.__filmShifts || []).reduce((a, b) => a + b, 0));
const scrollToFilm = (page) => page.locator('[data-film-frame]').evaluate((el) => el.scrollIntoView({ block: 'center' }));

/* ---------- 0. The served media: codec and dimensions match what the page reserves ---------- */
{
  const page = await browser.newPage();
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  const d = await declared(page);
  await page.close();
  if (!has('ffprobe')) {
    notRun.push('Media probe: ffprobe not available');
  } else {
    for (const key of ['desktop', 'mobile']) {
      const errors = [];
      const tmp = path.join(os.tmpdir(), `film-${key}.mp4`);
      const res = await fetch(new URL(d[key].src, base));
      if (!res.ok) errors.push(`HTTP ${res.status} for ${d[key].src}`);
      else {
        await fs.writeFile(tmp, Buffer.from(await res.arrayBuffer()));
        const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,width,height,pix_fmt', '-of', 'json', tmp], { encoding: 'utf8' })).streams[0];
        if (probe.codec_name !== 'h264') errors.push(`codec ${probe.codec_name}, expected h264`);
        if (probe.pix_fmt !== 'yuv420p') errors.push(`pixel format ${probe.pix_fmt}, expected yuv420p`);
        if (probe.width !== d[key].ratio.w || probe.height !== d[key].ratio.h) errors.push(`${probe.width}x${probe.height}, page reserves ${d[key].ratio.w}x${d[key].ratio.h}`);
        const audio = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', tmp], { encoding: 'utf8' }).trim();
        if (audio) errors.push('audio track present; the film is published muted');
      }
      record(`media ${key}`, '-', errors, { src: d[key].src });
    }
  }
}

/* ---------- Playback substitute for a browser without H.264 ---------- */
let substitute = null;
{
  const page = await browser.newPage();
  const h264 = await page.evaluate(() => document.createElement('video').canPlayType('video/mp4; codecs="avc1.640028"'));
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  const d = await declared(page);
  await page.close();
  if (!h264) {
    if (!has('ffmpeg')) {
      notRun.push('Playback (paused property, pause toggle, off-screen and hidden-document pausing): this Chromium has no H.264 and ffmpeg is not available to make a VP9 stand-in');
    } else {
      substitute = {};
      for (const key of ['desktop', 'mobile']) {
        const src = path.join(os.tmpdir(), `film-${key}.mp4`);
        const out = path.join(os.tmpdir(), `film-${key}-vp9.mp4`);
        const res = await fetch(new URL(d[key].src, base));
        await fs.writeFile(src, Buffer.from(await res.arrayBuffer()));
        execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-t', '6', '-an', '-c:v', 'libvpx-vp9', '-deadline', 'realtime', '-cpu-used', '8', '-b:v', '400k', '-pix_fmt', 'yuv420p', '-f', 'mp4', out]);
        substitute[new URL(d[key].src, base).pathname] = await fs.readFile(out);
      }
    }
  }
}
const canPlay = Boolean(substitute) || notRun.every((n) => !n.startsWith('Playback'));
async function newContext(options) {
  const context = await browser.newContext(options);
  if (substitute) {
    await context.route('**/media/*.mp4', (route) => {
      const body = substitute[new URL(route.request().url()).pathname];
      return body ? route.fulfill({ status: 200, contentType: 'video/mp4', body }) : route.continue();
    });
  }
  return context;
}

for (const viewport of viewports) {
  const name = String(viewport.width);

  /* ---------- 1. Reduced motion: poster and text, no video, no control ---------- */
  {
    const errors = [];
    const context = await newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    const before = await frameBox(page);
    const d = await declared(page);
    const expected = d.isMobile ? d.mobile : d.desktop;
    await page.evaluate(() => document.fonts.ready);
    await watchShifts(page);
    await scrollToFilm(page);
    await page.waitForFunction(() => { const i = document.querySelector('[data-film-frame] img'); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 10000 }).catch(() => errors.push('Poster did not load'));
    await page.waitForTimeout(600);
    const after = await frameBox(page);
    const poster = await page.locator('[data-film-frame] img').evaluate((img) => {
      const r = img.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { src: img.currentSrc, visible: r.width > 0 && r.height > 0 && getComputedStyle(img).visibility === 'visible', onTop: hit === img };
    });
    if (!poster.visible || !poster.onTop) errors.push('Poster not visible');
    const posterName = path.basename(expected.src).replace('.mp4', '-poster.webp');
    if (!poster.src.endsWith(posterName)) errors.push(`Poster ${poster.src}, expected ${posterName}`);
    errors.push(...ratioError(after, expected.ratio, 'Reserved box'));
    if (Math.abs(before.height - after.height) > 1) errors.push(`Box height moved ${before.height} to ${after.height} as the poster loaded`);
    const cls = await shifts(page);
    if (cls > 0) errors.push(`Layout shift ${cls.toFixed(4)} while the film loaded`);
    const media = await page.locator('main video, main [autoplay]').count();
    if (media) errors.push(`${media} video element(s) under reduced motion`);
    if (await page.locator('[data-film-toggle]').isVisible()) errors.push('Pause control visible with no video');

    /* The text equivalent, checked once per width here. */
    const details = page.locator('[data-film-text]');
    const summary = (await details.locator('summary').innerText()).trim();
    if (summary !== 'Read the worked example as text') errors.push(`Summary reads "${summary}"`);
    await details.locator('summary').click();
    if (!(await details.evaluate((el) => el.open))) errors.push('Text equivalent did not open');
    await page.waitForTimeout(400);
    const text = await details.innerText();
    const labels = await details.locator('[data-film-part] dt').allInnerTexts();
    if (labels.length !== 7) errors.push(`${labels.length} handoff parts, expected 7`);
    handoff.forEach((label, i) => { if (!labels[i]?.includes(label)) errors.push(`Part ${i + 1} should be "${label}", found "${labels[i] ?? 'nothing'}"`); });
    for (const s of mustContain) if (!text.includes(s)) errors.push(`Missing: "${s.slice(0, 50)}"`);
    if (/\$\s?\d|\b40k\b/i.test(text)) errors.push('A currency figure is visible in the text equivalent');
    if (/\b(?:GIVEN|DERIVED|INFERRED|UNKNOWN|VERIFIED|ASSUMED)\b/.test(text)) errors.push('Evidence words set in capitals');
    const wordState = await page.evaluate((list) => {
      const token = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      const probe = document.createElement('span');
      document.body.append(probe);
      const rgb = (value) => { probe.style.color = value; return getComputedStyle(probe).color; };
      const tones = { given: rgb(token('--v-given')), derived: rgb(token('--v-derived')), inferred: rgb(token('--v-inferred')), unknown: rgb(token('--v-unknown')), assumed: rgb(token('--v-signal')), verified: rgb(token('--v-given')) };
      probe.remove();
      const found = [...document.querySelectorAll('[data-film-text] .film__word')].map((el) => ({
        word: el.textContent.replace(':', '').trim(),
        tone: [...el.classList].find((c) => c.startsWith('film__word--'))?.slice(12),
        colour: getComputedStyle(el).color,
        before: getComputedStyle(el, '::before').content,
        after: getComputedStyle(el, '::after').content,
      }));
      return { found, tones, missing: list.filter((w) => !found.some((f) => f.word === w)) };
    }, words);
    if (wordState.missing.length) errors.push(`Evidence words missing: ${wordState.missing.join(', ')}`);
    for (const f of wordState.found) {
      if (f.colour !== wordState.tones[f.tone]) errors.push(`${f.word} is ${f.colour}, expected the ${f.tone} token ${wordState.tones[f.tone]}`);
      if (f.before !== 'none' || f.after !== 'none') errors.push(`${f.word} carries a pseudo-element mark`);
    }
    const axe = await new AxeBuilder({ page }).include('#worked-example').analyze();
    const serious = axe.violations.filter((v) => ['critical', 'serious'].includes(v.impact ?? ''));
    if (serious.length) errors.push(`Axe: ${serious.map((v) => v.id).join(', ')}`);
    await page.locator('#worked-example').screenshot({ path: `${output}/reduced-${name}.png` });
    record('reduced motion: poster, no video, text equivalent', name, errors, { cls, box: after });
    await context.close();
  }

  /* ---------- 2. Motion allowed: insertion near the viewport, source, control ---------- */
  {
    const errors = [];
    const context = await newContext({ viewport, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const d = await declared(page);
    const expected = d.isMobile ? d.mobile : d.desktop;
    const before = await frameBox(page);
    const distance = await page.locator('[data-film]').evaluate((el) => el.getBoundingClientRect().top - innerHeight);
    let lazyChecked = false;
    if (distance > 650) {
      lazyChecked = true;
      await page.waitForTimeout(500);
      if (await page.locator('[data-film-video]').count()) errors.push('Video inserted while the figure was far below the viewport');
    }
    await watchShifts(page);
    await scrollToFilm(page);
    const inserted = await page.waitForSelector('[data-film-video]', { state: 'attached', timeout: 5000 }).then(() => true, () => false);
    if (!inserted) errors.push('Video not inserted when the figure came into view');
    else {
      const video = page.locator('[data-film-video]');
      const attrs = await video.evaluate((v) => ({
        muted: v.muted, loop: v.loop, inline: v.playsInline, preload: v.getAttribute('preload'),
        pip: v.hasAttribute('disablepictureinpicture'), hidden: v.getAttribute('aria-hidden'), autoplay: v.hasAttribute('autoplay'),
      }));
      if (!attrs.muted || !attrs.loop || !attrs.inline || attrs.preload !== 'none' || !attrs.pip || attrs.hidden !== 'true') errors.push(`Video attributes ${JSON.stringify(attrs)}`);
      await page.waitForFunction(() => document.querySelector('[data-film-video]')?.currentSrc, null, { timeout: 5000 }).catch(() => {});
      const current = await video.evaluate((v) => v.currentSrc).catch(() => '');
      if (!current.endsWith(expected.src)) errors.push(`Source ${current || 'none'}, expected ${expected.src}`);

      if (!canPlay) {
        notRun.push(`Playback at ${name}`);
      } else {
        const toggle = page.locator('[data-film-toggle]');
        const playing = await page.waitForFunction(() => { const v = document.querySelector('[data-film-video]'); return v && !v.paused && v.dataset.ready; }, null, { timeout: 10000 }).then(() => true, () => false);
        if (!playing) errors.push('Video did not start when on screen');
        const after = await frameBox(page);
        if (Math.abs(before.height - after.height) > 1) errors.push(`Box height moved ${before.height} to ${after.height} as the video arrived`);
        errors.push(...ratioError(after, expected.ratio, 'Video box'));
        const cls = await shifts(page);
        if (cls > 0) errors.push(`Layout shift ${cls.toFixed(4)} as the video arrived`);

        const control = await toggle.evaluate((b) => ({ tag: b.tagName, type: b.type, height: b.getBoundingClientRect().height, visible: !b.hidden && b.getBoundingClientRect().height > 0 }));
        if (control.tag !== 'BUTTON' || control.type !== 'button') errors.push('Control is not a button');
        if (!control.visible) errors.push('Control not visible while the video plays');
        if (control.height < 44) errors.push(`Control is ${control.height}px tall, below 44px`);
        const named = async (n) => (await page.getByRole('button', { name: n, exact: true }).count()) === 1;
        const paused = () => page.locator('[data-film-video]').evaluate((v) => v.paused);
        if (!(await named('Pause the film'))) errors.push('Control is not named "Pause the film" while playing');

        await toggle.focus();
        const ring = await toggle.evaluate((b) => { const s = getComputedStyle(b); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2; });
        if (!ring) errors.push('No visible focus indicator on the control');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        if (!(await paused())) errors.push('Pause did not pause the video');
        if (!(await named('Play the film'))) errors.push('Control not renamed "Play the film" after pausing');

        /* A film the reader paused stays paused through scrolling away and back. */
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(300);
        await scrollToFilm(page);
        await page.waitForTimeout(500);
        if (!(await paused())) errors.push('A reader-paused film resumed on returning to view');

        await toggle.click();
        await page.waitForTimeout(300);
        if (await paused()) errors.push('Play did not resume the video');
        if (!(await named('Pause the film'))) errors.push('Control not renamed "Pause the film" after playing');

        /* Off screen it pauses; back on screen it resumes, because the reader did not pause it. */
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(400);
        if (!(await paused())) errors.push('Video kept playing off screen');
        await scrollToFilm(page);
        await page.waitForTimeout(600);
        if (await paused()) errors.push('Video did not resume on returning to view');

        /* A hidden document pauses it. Headless Chromium does not change visibility on its
           own, so the state is simulated and the real event dispatched. */
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
        await page.waitForTimeout(200);
        if (!(await paused())) errors.push('Video kept playing in a hidden document');
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
        await page.waitForTimeout(400);
        if (await paused()) errors.push('Video did not resume when the document became visible');
        await page.locator('#worked-example').screenshot({ path: `${output}/playing-${name}.png` });
      }

      /* Reduced motion switched on mid-visit removes the video; switched off restores it. */
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      if (await page.locator('main video').count()) errors.push('Video not removed when reduced motion became active');
      if (await page.locator('[data-film-toggle]').isVisible()) errors.push('Control still visible after the video was removed');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(300);
      if (!(await page.locator('[data-film-video]').count())) errors.push('Video not restored when reduced motion was switched off');

      /* Crossing the breakpoint swaps the composition and the reserved box. */
      if (viewport.width === 1440) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(400);
        const swapped = await page.locator('[data-film-video]').evaluate((v) => v.currentSrc).catch(() => '');
        if (!swapped.endsWith(d.mobile.src)) errors.push(`After resizing to 390 the source is ${swapped || 'none'}, expected ${d.mobile.src}`);
        errors.push(...ratioError(await frameBox(page), d.mobile.ratio, 'Box after resizing to 390'));
        const poster = await page.locator('[data-film-frame] img').evaluate((img) => img.currentSrc);
        if (!poster.endsWith(path.basename(d.mobile.src).replace('.mp4', '-poster.webp'))) errors.push(`After resizing the poster is ${poster}`);
        await page.setViewportSize(viewport);
        await page.waitForTimeout(400);
        const back = await page.locator('[data-film-video]').evaluate((v) => v.currentSrc).catch(() => '');
        if (!back.endsWith(d.desktop.src)) errors.push(`After resizing back the source is ${back || 'none'}`);
      }
    }
    record('motion allowed: insertion, source, pause control', name, errors, { lazyChecked, substitute: Boolean(substitute) });
    await context.close();
  }

  /* ---------- 3. No JavaScript: poster plus text, no control ---------- */
  {
    const errors = [];
    const context = await browser.newContext({ viewport, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.locator('[data-film-frame]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const state = await page.evaluate(() => {
      const img = document.querySelector('[data-film-frame] img');
      const r = img.getBoundingClientRect();
      return { loaded: img.complete && img.naturalWidth > 0, visible: r.width > 0 && r.height > 0, video: document.querySelectorAll('main video').length };
    });
    if (!state.loaded || !state.visible) errors.push('Poster not shown without JavaScript');
    if (state.video) errors.push('Video present without JavaScript');
    if (await page.locator('[data-film-toggle]').isVisible()) errors.push('Control visible without JavaScript');
    const details = page.locator('[data-film-text]');
    await details.locator('summary').click();
    await page.waitForTimeout(400);
    const parts = await details.locator('[data-film-part]').count();
    if (parts !== 7) errors.push(`${parts} handoff parts without JavaScript, expected 7`);
    if (!(await details.innerText()).includes(mustContain[4])) errors.push('Closing line missing without JavaScript');
    await page.locator('#worked-example').screenshot({ path: `${output}/no-js-${name}.png` });
    record('no JavaScript: poster and text', name, errors);
    await context.close();
  }
}

await browser.close();
const report = { passed: results.every((r) => r.passed), base, substitute: substitute ? 'VP9 transcode of the served MP4 (this Chromium has no H.264)' : null, notRun, results };
await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
for (const r of results) console.log(`${r.passed ? 'PASS' : 'FAIL'} ${r.viewport.padEnd(5)} ${r.check}${r.errors.length ? `\n      ${r.errors.join('\n      ')}` : ''}`);
if (report.substitute) console.log(`NOTE playback used a ${report.substitute}`);
for (const n of notRun) console.log(`NOT RUN ${n}`);
console.log(`${results.filter((r) => r.passed).length}/${results.length} checks passed`);
if (!report.passed) process.exitCode = 1;
