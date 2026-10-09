import { useEffect, useId, useRef, useState } from 'react';
import { offer } from '../data/offer';
import release from '../data/frame-free-release.json';
import { EVENTS, trackFrameFree } from '../lib/frameFreeEvents';
import { withBase } from '../lib/paths';

const KIT_FORM_ENDPOINT = 'https://api.convertkit.com/v3/forms/9283111/subscribe';
// Public site embed key for Kit form 9283111 (GreenSquare launch list). This is the
// same key ConvertKit browser embeds include in page source.
const KIT_PUBLIC_API_KEY = 'm707fr5_cPA1bExcvMKoEQ';
/** A product choice, not a measured figure. Adjust after real traffic. */
const TIMEOUT_MS = 15000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface Props {
  /** Fixed identifier for where this form sits, used in analytics. Never user input. */
  location: string;
  buttonLabel?: string;
  dark?: boolean;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'accepted' }
  | { kind: 'invalid' }
  | { kind: 'failed'; reason: 'timeout' | 'network' | 'rejected' };

const failureText = {
  timeout: 'The request took too long and was stopped. Your address is still here: try again.',
  network: 'The request could not reach our email provider. Check your connection and try again.',
  rejected: 'Our email provider did not accept the request. Check the address and try again.',
} as const;

/**
 * The one conversion on the site. One field; on acceptance the PDF is offered on the
 * same page, with no inbox wait.
 *
 * Kit accepting the request means only that: it does not mean the address is
 * confirmed, that an email arrived or that the file was saved. Nothing here says so.
 */
export default function EmailCaptureForm({ location, buttonLabel = 'Get Frame Free PDF', dark = false }: Props) {
  const uid = useId().replace(/:/g, '');
  const inputId = `email-${uid}`;
  const noteId = `email-note-${uid}`;
  const statusId = `email-status-${uid}`;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const inputRef = useRef<HTMLInputElement>(null);
  const readyRef = useRef<HTMLHeadingElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (status.kind === 'accepted') readyRef.current?.focus();
    if (status.kind === 'invalid' || status.kind === 'failed') inputRef.current?.focus();
  }, [status.kind]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    const address = email.trim();
    if (!EMAIL_PATTERN.test(address)) {
      setStatus({ kind: 'invalid' });
      return;
    }
    inFlight.current = true;
    setStatus({ kind: 'submitting' });
    trackFrameFree(EVENTS.signupAttempt, location);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(KIT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // v3 names this field `email`. Sending `email_address` (the v4 name) returns 406.
        body: JSON.stringify({ api_key: KIT_PUBLIC_API_KEY, email: address }),
        signal: controller.signal,
      });
      if (!res.ok) {
        trackFrameFree(EVENTS.signupError, location);
        setStatus({ kind: 'failed', reason: 'rejected' });
        return;
      }
      trackFrameFree(EVENTS.signupSuccess, location);
      trackFrameFree(EVENTS.pdfReady, location);
      setStatus({ kind: 'accepted' });
    } catch (err) {
      trackFrameFree(EVENTS.signupError, location);
      setStatus({ kind: 'failed', reason: controller.signal.aborted ? 'timeout' : 'network' });
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
    }
  }

  if (status.kind === 'accepted') {
    const pdf = withBase(release.path);
    return (
      <div className="capture-ready" role="status">
        <h3 className="capture-ready__heading" tabIndex={-1} ref={readyRef}>{offer.free.ready.heading}</h3>
        <p className="capture-ready__body">{offer.free.ready.body}</p>
        <div className="capture-ready__actions">
          <a
            className={dark ? 'v-btn v-btn--on-green' : 'v-btn v-btn--green'}
            href={pdf}
            download="frame-free.pdf"
            onClick={() => trackFrameFree(EVENTS.pdfRequested, `${location}_download`)}
          >
            Download the PDF
          </a>
          <a
            className={dark ? 'v-btn v-btn--ghost-on-green' : 'v-btn'}
            href={pdf}
            target="_blank"
            rel="noopener"
            onClick={() => trackFrameFree(EVENTS.pdfRequested, `${location}_open`)}
          >
            Open the PDF
          </a>
          <a className="v-link" href={withBase('/start/')}>Start using Frame Free</a>
        </div>
        <p className="capture-ready__starter">
          Then paste this into the chat: <code>{offer.free.starter}</code>
        </p>
        <p className="capture-ready__meta">Six pages, PDF, {Math.round(release.bytes / 1024)} KB.</p>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const message =
    status.kind === 'invalid'
      ? 'Enter a full email address, such as name@company.com.'
      : status.kind === 'failed'
        ? failureText[status.reason]
        : submitting
          ? 'Sending your request…'
          : '';
  const isError = status.kind === 'invalid' || status.kind === 'failed';

  return (
    <form className="capture-form" onSubmit={handleSubmit} noValidate aria-label={buttonLabel}>
      <label htmlFor={inputId} className="capture-form__label">Email address</label>
      <div className="field-row">
        <input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          aria-invalid={isError ? true : undefined}
          aria-describedby={`${statusId} ${noteId}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={dark ? 'btn btn-on-dark' : 'btn btn-primary'} type="submit" aria-disabled={submitting} disabled={submitting}>
          <span>{buttonLabel}</span>
          {submitting ? <span className="form-spinner" aria-hidden="true" /> : null}
        </button>
      </div>
      <p id={statusId} className={`form-status${isError ? ' form-status--error' : ''}`} role="status" aria-live="polite">
        {message}
        {status.kind === 'failed' ? (
          <> If it keeps failing, email <a href="mailto:hello@greensquare.ai">hello@greensquare.ai</a>.</>
        ) : null}
      </p>
      <p id={noteId} className="form-note">
        {offer.free.emailExchange} <a href={withBase('/legal/privacy/')}>Privacy policy</a>.
      </p>
    </form>
  );
}
