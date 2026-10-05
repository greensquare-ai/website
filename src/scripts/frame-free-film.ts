/**
 * Progressive loader for the Frame Free film.
 *
 * The server renders the poster, the reserved box and the text equivalent, and nothing
 * else. This script adds the <video> only when all of these hold:
 *   - the reader has not asked for reduced motion;
 *   - the figure is within about 600px of the viewport.
 * It plays only while the figure is on screen and the document is visible, and it never
 * resumes a film the reader paused. If reduced motion becomes active the video is removed
 * and the poster is what remains. The Pause/Play control (WCAG 2.2.2) is shown only
 * while there is a video to control.
 */

const NEAR = '600px 0px';

export function observeFrameFreeFilms() {
  const mounted = new Map<HTMLElement, () => void>();
  const events = new AbortController();

  function mount(root: HTMLElement) {
    const frame = root.querySelector<HTMLElement>('[data-film-frame]');
    const toggle = root.querySelector<HTMLButtonElement>('[data-film-toggle]');
    if (!frame || !toggle) return () => {};
    const sources = {
      desktop: { src: root.dataset.filmDesktop!, media: root.dataset.filmDesktopMedia! },
      mobile: { src: root.dataset.filmMobile!, media: root.dataset.filmMobileMedia! },
    };
    const labels = { pause: toggle.dataset.labelPause!, play: toggle.dataset.labelPlay! };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia(sources.mobile.media);
    const local = new AbortController();

    let video: HTMLVideoElement | null = null;
    let near = false;
    let onScreen = false;
    /** Set only by the reader. A film they paused stays paused until they press play. */
    let userPaused = false;
    /** The browser could not play the asset for this layout. The poster stands in. */
    let failed = false;

    const label = () => {
      const playing = Boolean(video && !video.paused);
      toggle.textContent = playing ? labels.pause : labels.play;
      root.dataset.filmState = video ? (playing ? 'playing' : 'paused') : failed ? 'unavailable' : 'poster';
    };

    const play = () => {
      if (!video || userPaused || !onScreen || document.hidden) return;
      video.play().catch(() => {
        // Muted inline playback can still be refused (data saver, a strict policy).
        // The poster stays underneath and the control offers Play.
        label();
      });
    };

    const insert = () => {
      if (video || failed || reduce.matches || !near) return;
      const v = document.createElement('video');
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'none';
      for (const name of ['muted', 'loop', 'playsinline', 'disablepictureinpicture']) v.setAttribute(name, '');
      v.setAttribute('preload', 'none');
      v.setAttribute('aria-hidden', 'true');
      v.setAttribute('tabindex', '-1');
      v.className = 'film__video';
      v.dataset.filmVideo = '';
      /* A source the browser cannot decode (no H.264 in an open-source Chromium build, for
         one) fires `error` on the <source>; a failure after selection fires it on the
         video. Either way the reader keeps the poster and is not offered a dead control. */
      const fail = () => {
        if (video !== v) return;
        failed = true;
        remove();
      };
      // Mobile first, as in the earlier hero film; each source is gated by its own query.
      for (const key of ['mobile', 'desktop'] as const) {
        const source = document.createElement('source');
        source.src = sources[key].src;
        source.type = 'video/mp4';
        source.media = sources[key].media;
        // Only the last candidate failing means there is nothing left to try.
        source.addEventListener('error', () => setTimeout(() => {
          if (v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
        }), { signal: local.signal });
        v.append(source);
      }
      v.addEventListener('error', fail, { signal: local.signal });
      // The poster stays painted underneath until the first frame exists, so nothing flashes.
      v.addEventListener('loadeddata', () => { v.dataset.ready = 'true'; }, { signal: local.signal });
      v.addEventListener('play', label, { signal: local.signal });
      v.addEventListener('pause', label, { signal: local.signal });
      frame.append(v);
      video = v;
      toggle.hidden = false;
      label();
      play();
    };

    const remove = () => {
      if (!video) return;
      video.pause();
      video.remove();
      video = null;
      toggle.hidden = true;
      label();
    };

    /* Two observers: one wide, to start fetching shortly before the figure arrives, and
       one exact, so the film only runs while some of it is actually on screen. */
    const approach = new IntersectionObserver((entries) => {
      near = entries.some((e) => e.isIntersecting);
      if (near) insert();
    }, { rootMargin: NEAR });
    const visible = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      if (onScreen) play();
      else video?.pause();
    });
    approach.observe(root);
    visible.observe(frame);

    toggle.addEventListener('click', () => {
      if (!video) return;
      if (video.paused) {
        userPaused = false;
        // A direct request plays even if the figure is only partly on screen.
        video.play().catch(() => label());
      } else {
        userPaused = true;
        video.pause();
      }
    }, { signal: local.signal });

    reduce.addEventListener('change', () => {
      if (reduce.matches) remove();
      else insert();
    }, { signal: local.signal });

    mobile.addEventListener('change', () => {
      // The other composition is a different file, so an earlier failure does not carry over.
      if (failed) { failed = false; insert(); return; }
      if (!video) return;
      // <source media> is only consulted at load, so a breakpoint crossing reloads.
      delete video.dataset.ready;
      video.load();
      play();
    }, { signal: local.signal });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video?.pause();
      else play();
    }, { signal: local.signal });

    label();
    return () => { approach.disconnect(); visible.disconnect(); local.abort(); remove(); };
  }

  function scan() {
    for (const [root, dispose] of mounted) if (!root.isConnected) { dispose(); mounted.delete(root); }
    document.querySelectorAll<HTMLElement>('[data-film]').forEach((root) => {
      if (!mounted.has(root)) mounted.set(root, mount(root));
    });
  }
  function clear() { mounted.forEach((dispose) => dispose()); mounted.clear(); }

  document.addEventListener('astro:page-load', scan, { signal: events.signal });
  document.addEventListener('astro:before-swap', clear, { signal: events.signal });
  scan();
  return () => { events.abort(); clear(); };
}
