import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { attributionAnalyticsProperties, readAttribution } from '../lib/acquisitionAttribution';

const KIT_FORM_ENDPOINT = 'https://api.convertkit.com/v3/forms/9283111/subscribe';
const KIT_PUBLIC_API_KEY = 'm707fr5_cPA1bExcvMKoEQ';

export interface Props {
  buttonLabel?: string;
  fineprint?: string;
  dark?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailCaptureForm({
  buttonLabel = 'Email me the Decision Frame beta',
  fineprint = 'Confirm your address to receive Decision Frame V2 beta and occasional GreenSquare updates. Unsubscribe at any time.',
  dark = false,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [leaving, setLeaving] = useState(false);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const attribution = readAttribution();
    track('Decision Frame Product Visit', attributionAnalyticsProperties(attribution));
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;

    const attribution = readAttribution();
    const properties = attributionAnalyticsProperties(attribution);
    track('Decision Frame Form Attempt', properties);
    setStatus('loading');

    try {
      const response = await fetch(KIT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: KIT_PUBLIC_API_KEY, email }),
      });
      if (!response.ok) throw new Error('Request failed');

      track('Decision Frame Signup', properties);
      setEmail('');
      setLeaving(true);
      leaveTimeout.current = setTimeout(() => setStatus('success'), 150);
    } catch {
      track('Decision Frame Form Error', properties);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
        <p className="form-status form-status--success" role="status">
          Check your inbox and confirm your address. Decision Frame V2 beta will arrive immediately after.
        </p>
      </div>
    );
  }

  return (
    <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
      <form className={`field-row ${leaving ? 'is-leaving' : ''}`} onSubmit={handleSubmit} aria-label="Get the free Decision Frame V2 beta">
        <label htmlFor="email_address" className="sr-only">Email address</label>
        <input id="email_address" name="email_address" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button className={dark ? 'btn btn-on-dark' : 'btn btn-primary'} type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
        {status === 'error' && <p className="form-status form-status--error" role="alert">The form could not be sent. Try again, or email hello@greensquare.ai.</p>}
        <p className="form-note" style={{ width: '100%' }}>{fineprint}</p>
      </form>
    </div>
  );
}
