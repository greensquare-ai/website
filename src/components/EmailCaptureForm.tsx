import { useEffect, useRef, useState } from 'react';

const KIT_FORM_ENDPOINT = 'https://api.convertkit.com/v3/forms/9283111/subscribe';
// Public site embed key for Kit form 9283111 (GreenSquare launch list). This is the
// same key ConvertKit browser embeds include in page source.
const KIT_PUBLIC_API_KEY = 'm707fr5_cPA1bExcvMKoEQ';

export interface Props {
  buttonLabel?: string;
  fineprint?: string;
  dark?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailCaptureForm({
  buttonLabel = 'Email me the Decision Frame',
  fineprint = 'Confirm by email to receive the PDF and occasional GreenSquare updates. Unsubscribe any time.',
  dark = false,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [leaving, setLeaving] = useState(false);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(KIT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: KIT_PUBLIC_API_KEY, email_address: email }),
      });
      if (!res.ok) throw new Error('Request failed');
      setEmail('');
      setLeaving(true);
      leaveTimeout.current = setTimeout(() => {
        setStatus('success');
      }, 150);
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
        <p className="form-status form-status--success" role="status">
          Check your inbox and confirm your address. We will send the Decision Frame straight after.
        </p>
      </div>
    );
  }

  return (
    <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
      <form
        className={`field-row ${leaving ? 'is-leaving' : ''}`}
        onSubmit={handleSubmit}
        aria-label="Get the free Decision Frame"
      >
        <label htmlFor="email_address" className="sr-only">Email address</label>
        <input
          id="email_address"
          name="email_address"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={dark ? 'btn btn-on-dark' : 'btn btn-primary'} type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
        {status === 'error' && (
          <p className="form-status form-status--error" role="alert">
            We could not send the form. Try again, or email hello@greensquare.ai.
          </p>
        )}
        <p className="form-note" style={{ width: '100%' }}>{fineprint}</p>
      </form>
    </div>
  );
}
