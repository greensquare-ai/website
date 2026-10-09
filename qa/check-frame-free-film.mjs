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
 *     state and whose clicks change the video's `paused` property; a keyboard reader
 *     tabbing down from the hero reaches it before the film starts, and pressing Pause
 *     before the film arrives keeps it from starting; the film pauses off screen and when
 *     the document is hidden, and never resumes one the reader paused; if the control has
 *     focus when it must hide, focus stays in the section rather than falling to <body>;
 *   - nothing on the page shifts when the video arrives, or when it fails and is removed;
 *   - the text equivalent opens, holds all seven parts of the framing handoff, carries
 *     every line in qa/frame-free-film-onscreen.json, and its title is a heading;
 *   - a landscape phone gets the 16:9 film, no taller than its screen;
 *   - with JavaScript off the reader gets the poster and the text, and no control.
 *
 * Scrolling is instant and waits are on state, not on time. The site sets smooth
 * scrolling, under which a scroll animates and an observer may not have fired when a
 * fixed wait ends, so an assertion could pass without the behaviour being exercised.
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
/* Page 5 prints no verified or assumed word beside the constraints, so the page adds none. */
const words = ['Given', 'Derived', 'Inferred', 'Unknown'];
/* The film's on-screen copy, held apart from the data file (see the file's status note). */
const onscreen = JSON.parse(await fs.readFile(new URL('./frame-free-film-onscreen.json', import.meta.url), 'utf8')).strings;
/* PROVISIONAL byte budgets per composition, to be agreed with the film team. The film starts
   downloading as soon as it nears the viewport, so its weight is a page-weight decision. */
const BYTE_BUDGET = { desktop: 10_000_000, mobile: 7_000_000 };

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
const scrollToFilm = (page) => page.locator('[data-film-frame]').evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
const scrollTop = (page) => page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
const scrollAway = (page) => page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
/* Two animation frames, so observers have delivered after a scroll. */
const settle = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const videoPaused = (page) => page.locator('[data-film-video]').evaluate((v) => v.paused);
const offScreenAndPaused = (page) => page.waitForFunction(() => {
  const frame = document.querySelector('[data-film-frame]');
  const v = document.querySelector('[data-film-video]');
  const r = frame.getBoundingClientRect();
  return (r.bottom < 0 || r.top > innerHeight) && v && v.paused;
}, null, { timeout: 5000 }).then(() => true, () => false);
const toggleShown = (page) => page.waitForFunction(() => { const t = document.querySelector('[data-film-toggle]'); return t && !t.hidden; }, null, { timeout: 5000 }).then(() => true, () => false);

/* The top-level boxes of an MP4, in order. */
function boxes(buffer) {
  const out = [];
  let at = 0;
  while (at + 8 <= buffer.length) {
    let size = buffer.readUInt32BE(at);
    const type = buffer.toString('latin1', at + 4, at + 8);
    if (size === 1) size = Number(buffer.readBigUInt64BE(at + 8));
    else if (size === 0) size = buffer.length - at;
    out.push(type);
    if (size < 8) break;
    at += size;
  }
  return out;
}

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
        const buffer = Buffer.from(await res.arrayBuffer());
        await fs.writeFile(tmp, buffer);
        /* moov before mdat (+faststart): with preload="none" a tail-moov file must be
           fetched to its end before the first frame. */
        const order = boxes(buffer);
        if (!order.includes('moov') || !order.includes('mdat') || order.indexOf('moov') > order.indexOf('mdat')) errors.push(`moov is not before mdat (top-level boxes: ${order.join(', ')}); export with +faststart`);
        if (buffer.length > BYTE_BUDGET[key]) errors.push(`${buffer.length} bytes, over the provisional ${BYTE_BUDGET[key]}-byte budget`);
        /* The poster must be the size the page reserves, or it letterboxes silently. */
        const posterUrl = d[key].src.replace('.mp4', '-poster.webp');
        const posterRes = await fetch(new URL(posterUrl, base));
        if (!posterRes.ok) errors.push(`HTTP ${posterRes.status} for ${posterUrl}`);
        else {
          const posterTmp = path.join(os.tmpdir(), `film-${key}-poster.webp`);
          await fs.writeFile(posterTmp, Buffer.from(await posterRes.arrayBuffer()));
          const p = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'json', posterTmp], { encoding: 'utf8' })).streams[0];
          if (p.width !== d[key].ratio.w || p.height !== d[key].ratio.h) errors.push(`poster ${p.width}x${p.height}, page reserves ${d[key].ratio.w}x${d[key].ratio.h}`);
        }
        const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,width,height,pix_fmt', '-of', 'json', tmp], { encoding: 'utf8' })).streams[0];
        if (probe.codec_name !== 'h264') errors.push(`codec ${probe.codec_name}, expected h264`);
        if (probe.pix_fmt !== 'yuv420p') errors.push(`pixel format ${probe.pix_fmt}, expected yuv420p`);
        if (probe.width !== d[key].ratio.w || probe.height !== d[key].ratio.h) errors.push(`${probe.width}x${probe.height}, page reserves ${d[key].ratio.w}x${d[key].ratio.h}`);
        const audio = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', tmp], { encoding: 'utf8' }).trim();
        if (audio) errors.push('audio track present; the film is published muted');
      }
      record(`media ${key}: codec, size, faststart, budget, poster`, '-', errors, { src: d[key].src });
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
        /* A missing file is already reported by block 0; record it here too and stop,
           rather than handing a 404 body to ffmpeg and losing the report. */
        if (!res.ok) { record('playback substitute', '-', [`HTTP ${res.status} for ${d[key].src}`]); substitute = null; break; }
        await fs.writeFile(src, Buffer.from(await res.arrayBuffer()));
        try {
          execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-t', '6', '-an', '-c:v', 'libvpx-vp9', '-deadline', 'realtime', '-cpu-used', '8', '-b:v', '400k', '-pix_fmt', 'yuv420p', '-f', 'mp4', out], { stdio: ['ignore', 'ignore', 'pipe'] });
        } catch (e) {
          record('playback substitute', '-', [String(e.stderr || e.message).split('\n')[0]]);
          substitute = null;
          break;
        }
        substitute[new URL(d[key].src, base).pathname] = await fs.readFile(out);
      }
    }
  }
}
const substituteFailed = results.some((r) => r.check === 'playback substitute');
if (substituteFailed) notRun.push('Playback: the VP9 stand-in could not be made (see the playback substitute failure)');
const canPlay = !substituteFailed && (Boolean(substitute) || notRun.every((n) => !n.startsWith('Playback')));
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
    /* Everything the film puts on screen must be in the text (WCAG 1.2.1). */
    const norm = (t) => t.replace(/\s+/g, ' ').toLowerCase();
    const flat = norm(text);
    const absent = onscreen.filter((line) => !flat.includes(norm(line)));
    if (absent.length) errors.push(`On-screen copy missing from the text equivalent: ${absent.map((l) => `"${l.slice(0, 40)}"`).join(', ')}`);
    const questions = await details.locator('[data-film-question]').count();
    if (questions !== 6) errors.push(`${questions} questions in the text equivalent, expected 6`);
    if (!(await details.getByRole('heading', { level: 3, name: 'The software was the surface' }).count())) errors.push('The worked example title is not an h3');
    /* The summary's name carries no plus or minus glyph. */
    const summaryName = (await details.locator('summary').ariaSnapshot()).trim();
    if (/[+\u2212]/.test(summaryName.replace(/^- /, ''))) errors.push(`Summary accessible name includes the glyph: ${summaryName}`);
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

  /* ---------- 2. Motion allowed: control first, insertion near the viewport, source, control ---------- */
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
      await settle(page);
      if (await page.locator('[data-film-video]').count()) errors.push('Video inserted while the figure was far below the viewport');
    }

    /* The control exists before the film does, and is the next stop after the hero's
       last action, so a keyboard reader can pause before the film starts. */
    if (!(await toggleShown(page))) errors.push('Control not shown before the video was inserted');
    await page.getByRole('link', { name: 'See the Free example' }).first().focus();
    await page.keyboard.press('Tab');
    const tabbed = await page.evaluate(() => document.activeElement?.matches('[data-film-toggle]') ?? false);
    if (!tabbed) errors.push(`One Tab from the hero's last action reaches ${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 80))}, not the film control`);
    await page.evaluate(() => document.activeElement?.blur());
    await scrollTop(page);

    await watchShifts(page);
    await scrollToFilm(page);
    const inserted = await page.waitForSelector('[data-film-video]', { state: 'attached', timeout: 5000 }).then(() => true, () => false);
    if (!inserted) errors.push('Video not inserted when the figure came into view');
    else {
      const video = page.locator('[data-film-video]');
      const attrs = await video.evaluate((v) => ({
        muted: v.muted, loop: v.loop, inline: v.playsInline, preload: v.getAttribute('preload'),
        pip: v.hasAttribute('disablepictureinpicture'), hidden: v.getAttribute('aria-hidden'), autoplay: v.hasAttribute('autoplay'),
        focusable: (() => { const was = document.activeElement; v.focus({ preventScroll: true }); const took = document.activeElement === v; was?.focus?.({ preventScroll: true }); return took || v.hasAttribute('tabindex'); })(),
      }));
      if (!attrs.muted || !attrs.loop || !attrs.inline || attrs.preload !== 'none' || !attrs.pip || attrs.hidden !== 'true') errors.push(`Video attributes ${JSON.stringify(attrs)}`);
      if (attrs.focusable) errors.push('The aria-hidden video is focusable');
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
        if (!(await named('Pause the film'))) errors.push('Control is not named "Pause the film" while playing');

        await toggle.focus();
        const ring = await toggle.evaluate((b) => { const s = getComputedStyle(b); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2; });
        if (!ring) errors.push('No visible focus indicator on the control');
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.querySelector('[data-film-video]').paused, null, { timeout: 2000 }).catch(() => errors.push('Pause did not pause the video'));
        if (!(await named('Play the film'))) errors.push('Control not renamed "Play the film" after pausing');

        /* A film the reader paused stays paused through scrolling away and back. The
           precondition, that the frame really left the screen, is asserted, not assumed. */
        await scrollAway(page); // QA fix 2026-10-09: the film now sits near the top, so leaving the screen means scrolling past it
        if (!(await offScreenAndPaused(page))) errors.push('Precondition failed: the frame did not leave the screen');
        await scrollToFilm(page);
        await settle(page);
        if (!(await videoPaused(page))) errors.push('A reader-paused film resumed on returning to view');

        await toggle.click();
        await page.waitForFunction(() => !document.querySelector('[data-film-video]').paused, null, { timeout: 2000 }).catch(() => errors.push('Play did not resume the video'));
        if (!(await named('Pause the film'))) errors.push('Control not renamed "Pause the film" after playing');

        /* Off screen it pauses; back on screen it resumes, because the reader did not pause it. */
        await scrollAway(page);
        if (!(await offScreenAndPaused(page))) errors.push('Video kept playing off screen');
        await scrollToFilm(page);
        await page.waitForFunction(() => !document.querySelector('[data-film-video]').paused, null, { timeout: 3000 }).catch(() => errors.push('Video did not resume on returning to view'));

        /* A hidden document pauses it. Headless Chromium does not change visibility on its
           own, so the state is simulated and the real event dispatched. */
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
        if (!(await videoPaused(page))) errors.push('Video kept playing in a hidden document');
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
        await page.waitForFunction(() => !document.querySelector('[data-film-video]').paused, null, { timeout: 3000 }).catch(() => errors.push('Video did not resume when the document became visible'));
        await page.locator('#worked-example').screenshot({ path: `${output}/playing-${name}.png` });
      }

      /* Reduced motion switched on mid-visit removes the video; switched off restores it.
         The control has focus when it hides, and focus must stay in the section. */
      await page.locator('[data-film-toggle]').focus();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => !document.querySelector('main video'), null, { timeout: 3000 }).catch(() => errors.push('Video not removed when reduced motion became active'));
      if (await page.locator('[data-film-toggle]').isVisible()) errors.push('Control still visible after the video was removed');
      const focusAfter = await page.evaluate(() => ({ tag: document.activeElement?.tagName, inText: Boolean(document.activeElement?.closest('[data-film-text]')) }));
      if (focusAfter.tag === 'BODY' || !focusAfter.inText) errors.push(`Focus fell to ${focusAfter.tag} when the control hid, not to the text equivalent`);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForSelector('[data-film-video]', { state: 'attached', timeout: 3000 }).catch(() => errors.push('Video not restored when reduced motion was switched off'));
      if (!(await toggleShown(page))) errors.push('Control not restored when reduced motion was switched off');

      /* Crossing the breakpoint swaps the composition and the reserved box. */
      if (viewport.width === 1440) {
        const src = (s) => page.waitForFunction((want) => document.querySelector('[data-film-video]')?.currentSrc.endsWith(want), s, { timeout: 5000 }).then(() => true, () => false);
        await page.setViewportSize({ width: 390, height: 844 });
        if (!(await src(d.mobile.src))) errors.push(`After resizing to 390 the source is ${await page.locator('[data-film-video]').evaluate((v) => v.currentSrc).catch(() => 'none')}, expected ${d.mobile.src}`);
        errors.push(...ratioError(await frameBox(page), d.mobile.ratio, 'Box after resizing to 390'));
        const poster = await page.locator('[data-film-frame] img').evaluate((img) => img.currentSrc);
        if (!poster.endsWith(path.basename(d.mobile.src).replace('.mp4', '-poster.webp'))) errors.push(`After resizing the poster is ${poster}`);
        await page.setViewportSize(viewport);
        if (!(await src(d.desktop.src))) errors.push(`After resizing back the source is ${await page.locator('[data-film-video]').evaluate((v) => v.currentSrc).catch(() => 'none')}`);
      }
    }
    record('motion allowed: control first, insertion, source, pause control', name, errors, { lazyChecked, substitute: Boolean(substitute) });
    await context.close();
  }

  /* ---------- 2a. Pressing Pause before the film arrives keeps it from starting ---------- */
  if (canPlay) {
    const errors = [];
    const context = await newContext({ viewport, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    if (!(await toggleShown(page))) errors.push('Control not shown before the video was inserted');
    else {
      await page.locator('[data-film-toggle]').focus();
      await page.keyboard.press('Enter');
      if ((await page.locator('[data-film-toggle]').innerText()).trim() !== 'Play the film') errors.push('Control not renamed "Play the film" after an early pause');
      await scrollToFilm(page);
      await page.waitForSelector('[data-film-video]', { state: 'attached', timeout: 5000 }).catch(() => {});
      /* A negative is being asserted, so this one wait is on time: long enough for an
         unpaused film to have started (it starts within a frame or two on these files). */
      await page.waitForTimeout(1000);
      const state = await page.evaluate(() => { const v = document.querySelector('[data-film-video]'); return v ? { paused: v.paused, time: v.currentTime } : null; });
      if (!state) errors.push('Video not inserted after an early pause');
      else if (!state.paused || state.time > 0) errors.push(`An early pause did not hold: ${JSON.stringify(state)}`);
    }
    record('early pause holds', name, errors);
    await context.close();
  } else notRun.push(`Early pause at ${name}`);

  /* ---------- 2b. No layout shift with the summary in view as the video arrives or fails ---------- */
  for (const outcome of ['arrives', 'fails']) {
    const errors = [];
    const context = await newContext({ viewport, reducedMotion: 'no-preference' });
    /* The 404 is held back so the control and the video are painted before the failure;
       an instant 404 can resolve inside the insertion frame and hide a shift. */
    if (outcome === 'fails') await context.route('**/media/*.mp4', async (route) => { await new Promise((r) => setTimeout(r, 800)); await route.fulfill({ status: 404, body: 'not found' }); });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await watchShifts(page);
    /* The film's lower edge and the summary are both in view before insertion. */
    await page.locator('[data-film-text] > summary').evaluate((el) => el.scrollIntoView({ block: 'end', behavior: 'instant' }));
    await page.waitForSelector('[data-film-video]', { state: 'attached', timeout: 5000 }).catch(() => {});
    if (outcome === 'arrives' && canPlay) {
      await page.waitForFunction(() => document.querySelector('[data-film-video]')?.dataset.ready, null, { timeout: 10000 }).catch(() => errors.push('Video did not load'));
    }
    if (outcome === 'fails') {
      await page.waitForFunction(() => document.querySelector('[data-film]').dataset.filmState === 'unavailable', null, { timeout: 10000 }).catch(() => errors.push('A failed source did not leave the poster in place'));
      if (await page.locator('[data-film-toggle]').isVisible()) errors.push('A dead control is offered after the film failed');
      if (await page.locator('main video').count()) errors.push('The failed video was not removed');
    }
    await settle(page);
    const cls = await shifts(page);
    if (cls > 0) errors.push(`Layout shift ${cls.toFixed(4)} as the video ${outcome === 'arrives' ? 'arrived' : 'failed'}`);
    record(`no layout shift as the video ${outcome}`, name, errors, { cls });
    await context.close();
  }

  /* ---------- 2b. The control does not move when its label changes ----------
     The label swaps between Pause and Play while it is on screen. The shift checks above
     only catch that when a swap happens to land inside their observation window, which made
     CI fail on one run and pass on the next. This measures the cause directly. */
  {
    const errors = [];
    const context = await newContext({ viewport });
    const page = await context.newPage();
    await page.goto(base + '/', { waitUntil: 'load' });
    const boxes = await page.evaluate(() => {
      const t = document.querySelector('[data-film-toggle]');
      const out = [];
      for (const label of [t.dataset.labelPause, t.dataset.labelPlay]) {
        t.textContent = label;
        const r = t.getBoundingClientRect();
        out.push({ label, x: r.x, width: r.width, height: r.height });
      }
      return out;
    });
    const [a, b] = boxes;
    if (Math.abs(a.x - b.x) > 0.5 || Math.abs(a.width - b.width) > 0.5 || Math.abs(a.height - b.height) > 0.5) {
      errors.push(`Control box changes with its label: ${JSON.stringify(boxes)}`);
    }
    record('control box stable across Pause and Play', name, errors, { boxes });
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

/* ---------- 4. Landscape phones: the 16:9 film, no taller than the screen ---------- */
for (const viewport of [{ width: 740, height: 360 }, { width: 667, height: 375 }]) {
  const errors = [];
  const context = await newContext({ viewport, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  const d = await declared(page);
  if (d.isMobile) errors.push('A landscape phone is served the portrait composition');
  await scrollToFilm(page);
  await page.waitForFunction(() => { const i = document.querySelector('[data-film-frame] img'); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 10000 }).catch(() => errors.push('Poster did not load'));
  const box = await frameBox(page);
  errors.push(...ratioError(box, d.desktop.ratio, 'Landscape box'));
  if (box.height > viewport.height) errors.push(`Film is ${Math.round(box.height)}px tall in a ${viewport.height}px viewport`);
  const poster = await page.locator('[data-film-frame] img').evaluate((img) => img.currentSrc);
  if (!poster.endsWith(path.basename(d.desktop.src).replace('.mp4', '-poster.webp'))) errors.push(`Landscape poster ${poster}`);
  record('landscape phone: 16:9, fits the screen', `${viewport.width}x${viewport.height}`, errors, { box });
  await context.close();
}

await browser.close();
const report = { passed: results.every((r) => r.passed), base, substitute: substitute ? 'VP9 transcode of the served MP4 (this Chromium has no H.264)' : null, notRun, results };
await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
for (const r of results) console.log(`${r.passed ? 'PASS' : 'FAIL'} ${r.viewport.padEnd(5)} ${r.check}${r.errors.length ? `\n      ${r.errors.join('\n      ')}` : ''}`);
if (report.substitute) console.log(`NOTE playback used a ${report.substitute}`);
for (const n of notRun) console.log(`NOT RUN ${n}`);
console.log(`${results.filter((r) => r.passed).length}/${results.length} checks passed`);
if (!report.passed) process.exitCode = 1;
