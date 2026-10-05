/**
 * Progressive loader for the Frame Free film.
 *
 * The server renders the poster, the reserved box, a hidden Pause/Play control and the
 * text equivalent, and nothing else. This script adds the <video> only when all of
 * these hold:
 *   - the reader has not asked for reduced motion;
 *   - the figure is within about 600px of the viewport.
 * It plays only while the figure is on screen and the document is visible, and it never
 * resumes a film the reader paused. If reduced motion becomes active the video is removed,
 * its download stopped, and the poster is what remains.
 *
 * The Pause/Play control (WCAG 2.2.2) is shown as soon as this script runs with motion
 * allowed, before any video exists, so a keyboard reader tabbing down the page meets it
 * before the film starts. Pressing Pause early stops the film from starting. It is hidden
 * only under reduced motion or when the film cannot play, and if it has focus when that
 * happens, focus moves to the text equivalent's summary rather than to <body>.
 *
 * The composition is chosen here from the mobile media query, not by <source media>:
 * engines before 2023 ignore `media` on video sources and would take the first file.
 */

const NEAR = '600px 0px';

export function observeFrameFreeFilms() {
  const mounted = new Map<HTMLElement, () => void>();
  const events = new AbortController();

  function mount(root: HTMLElement) {
    const frame = root.querySelector<HTMLElement>('[data-film-frame]');
    const toggle = root.querySelector<HTMLButtonElement>('[data-film-toggle]');
    if (!frame || !toggle) return () => {};
    const sources = { desktop: root.dataset.filmDesktop!, mobile: root.dataset.filmMobile! };
    const labels = { pause: toggle.dataset.labelPause!, play: toggle.dataset.labelPlay! };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia(root.dataset.filmMobileMedia!);
    const local = new AbortController();
    const currentSrc = () => (mobile.matches ? sources.mobile : sources.desktop);

    let video: HTMLVideoElement | null = null;
    /** Listeners on the current video only, released with it. */
    let videoEvents: AbortController | null = null;
    let near = false;
    let onScreen = false;
    /** Set only by the reader. A film they paused stays paused until they press play. */
    let userPaused = false;
    /** The browser could not play the asset for this layout. The poster stands in. */
    let failed = false;

    /** The film is running, or will run as soon as it is on screen and loaded. */
    const running = () => {
      if (userPaused) return false;
      if (!video) return true;
      return !video.paused || !onScreen || document.hidden;
    };

    const label = () => {
      toggle.textContent = running() ? labels.pause : labels.play;
      root.dataset.filmState = video ? (video.paused ? 'paused' : 'playing') : failed ? 'unavailable' : 'poster';
    };

    /** Show or hide the control. A focused control hands focus to the text, not to <body>. */
    const setControlHidden = (hide: boolean) => {
      if (hide && toggle.contains(document.activeElement)) {
        root.querySelector<HTMLElement>('[data-film-text] > summary')?.focus({ preventScroll: true });
      }
      toggle.hidden = hide;
    };

    const play = () => {
      if (!video || userPaused || !onScreen || document.hidden) return;
      video.play().catch(() => {
        // Muted inline playback can still be refused (data saver, a strict policy).
        // The poster stays underneath and the control offers Play. This is not the
        // reader's pause, so a later scroll back into view tries again. The same path
        // takes the AbortError of a play() interrupted by pause().
        label();
      });
    };

    const insert = () => {
      if (video || failed || reduce.matches || !near) return;
      const v = document.createElement('video');
      videoEvents = new AbortController();
      const signal = videoEvents.signal;
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'none';
      for (const name of ['muted', 'loop', 'playsinline', 'disablepictureinpicture']) v.setAttribute(name, '');
      v.setAttribute('preload', 'none');
      // Hidden from assistive technology, and not focusable: a <video> without controls
      // takes no focus unless given a tabindex.
      v.setAttribute('aria-hidden', 'true');
      v.className = 'film__video';
      v.dataset.filmVideo = '';
      /* A fetch or decode failure (a 404, or no H.264 in an open-source Chromium build)
         fires `error` on the video. The reader keeps the poster and is not offered a dead
         control. */
      v.addEventListener('error', () => {
        if (video !== v) return;
        failed = true;
        remove();
      }, { signal });
      // The poster stays painted underneath until the first frame exists, so nothing flashes.
      v.addEventListener('loadeddata', () => { v.dataset.ready = 'true'; }, { signal });
      v.addEventListener('play', label, { signal });
      v.addEventListener('pause', label, { signal });
      v.src = currentSrc();
      frame.append(v);
      video = v;
      label();
      play();
    };

    const remove = () => {
      if (video) {
        const v = video;
        video = null;
        v.pause();
        // Stop the download and release the decoder, not only the element.
        v.removeAttribute('src');
        v.load();
        videoEvents?.abort();
        videoEvents = null;
        v.remove();
      }
      setControlHidden(reduce.matches || failed);
      label();
    };

    /* Two observers: one wide, to start fetching shortly before the figure arrives, and
       one exact, so the film only runs while some of it is actually on screen. Each
       watches one element, and entries can queue, so the newest entry is the state. */
    const approach = new IntersectionObserver((entries) => {
      near = entries[entries.length - 1].isIntersecting;
      if (near) insert();
    }, { rootMargin: NEAR });
    const visible = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      if (onScreen) play();
      else video?.pause();
      label();
    });
    approach.observe(root);
    visible.observe(frame);

    toggle.addEventListener('click', () => {
      if (running()) {
        userPaused = true;
        video?.pause();
      } else {
        userPaused = false;
        // A direct request plays even if the figure is only partly on screen.
        video?.play().catch(() => label());
      }
      label();
    }, { signal: local.signal });

    reduce.addEventListener('change', () => {
      if (reduce.matches) remove();
      else { setControlHidden(failed); insert(); }
    }, { signal: local.signal });

    mobile.addEventListener('change', () => {
      // The other composition is a different file, so an earlier failure does not carry over.
      if (failed) { failed = false; setControlHidden(reduce.matches); insert(); label(); return; }
      if (!video) return;
      delete video.dataset.ready;
      video.src = currentSrc(); // runs the load algorithm
      play();
    }, { signal: local.signal });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video?.pause();
      else play();
      label();
    }, { signal: local.signal });

    setControlHidden(reduce.matches);
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
