/**
 * Every analytics event on the Frame Free journey goes through here.
 *
 * Two constraints shape this file.
 *
 * The Vercel Pro plan records two custom properties per event (eight with the Web
 * Analytics Plus add-on). Each event therefore carries exactly two: `cta`, which holds
 * the event schema version and where on the site the action happened, and `touch`,
 * which holds the first touch and the latest campaign. The served PDF is identified by
 * its hash in src/data/frame-free-release.json, which is fixed per deployment, so it is
 * not repeated on every event.
 *
 * Tracking must never block the journey. A failed or blocked call is swallowed.
 *
 * What each event means, and what it does not mean, is recorded in
 * docs/analytics-events.md. No email address or decision text is ever passed here.
 */
import { track } from '@vercel/analytics';
import { readAttribution, touchLabel } from './acquisitionAttribution';

export const EVENT_SCHEMA = 'ff1';

/* The three signup names keep the retired product name on purpose. They are the keys
   of a running time series, and renaming them splits the funnel in two with no way to
   join the halves. They are never rendered. */
export const EVENTS = {
  signupAttempt: 'GreenSquare Free Signup Attempt',
  signupSuccess: 'GreenSquare Free Signup Success',
  signupError: 'GreenSquare Free Signup Error',
  pdfReady: 'frame_free_pdf_ready',
  pdfRequested: 'frame_free_pdf_requested',
  startViewed: 'frame_free_start_viewed',
  starterCopied: 'frame_free_starter_copied',
  exampleSelected: 'frame_free_example_selected',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

/** A location is a fixed identifier chosen in code, never user input. */
export function trackFrameFree(name: EventName, location: string) {
  try {
    const { first, latest } = readAttribution();
    track(name, {
      cta: `${EVENT_SCHEMA}:${location.replace(/[^a-z0-9_-]/gi, '').slice(0, 40)}`,
      touch: `f:${touchLabel(first)}|l:${touchLabel(latest)}`,
    });
  } catch {
    // Analytics is never allowed to interrupt capture, delivery or guidance.
  }
}
