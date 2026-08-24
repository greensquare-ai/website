import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const KIT_FORM_ENDPOINT = 'https://api.convertkit.com/v3/forms/9283111/subscribe';
const KIT_PUBLIC_API_KEY = 'm707fr5_cPA1bExcvMKoEQ';
const ATTRIBUTION_KEY = 'gs_first_1000_attribution';

export interface Props {
  buttonLabel?: string;
  fineprint?: string;
  dark?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

type Attribution = {
  source: string;
  medium: string;
  campaignId: string;
  contentId: string;
  experimentId: string;
  channel: string;
  community: string;
  cta: string;
  landingVariant: string;
  firstLandingPath: string;
};

function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const stored = window.localStorage.getItem(ATTRIBUTION_KEY);
  let previous: Partial<Attribution> = {};
  if (stored) {
    try { previous = JSON.parse(stored); } catch { previous = {}; }
  }

  const attribution: Attribution = {
    source: params.get('utm_source') ?? previous.source ?? 'direct',
    medium: params.get('utm_medium') ?? previous.medium ?? 'none',
    campaignId: params.get('utm_campaign') ?? previous.campaignId ?? 'none',
    contentId: params.get('utm_content') ?? previous.contentId ?? 'none',
    experimentId: params.get('gs_experiment') ?? previous.experimentId ?? 'none',
    channel: params.get('gs_channel') ?? previous.channel ?? params.get('utm_medium') ?? 'unknown',
    community: params.get('gs_community') ?? previous.community ?? 'none',
    cta: params.get('gs_cta') ?? previous.cta ?? 'decision_frame_email',
    landingVariant: params.get('gs_variant') ?? previous.landingVariant ?? 'decision-frame-v1',
    firstLandingPath: previous.firstLandingPath ?? window.location.pathname,
  };

  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
}

export default function EmailCaptureForm({
  buttonLabel = 'Email me the Decision Frame',
  fineprint = 'Confirm your address to receive the PDF and occasional GreenSquare updates. Unsubscribe at any time.',
  dark = false,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [leaving, setLeaving] = useState(false);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const attribution = readAttribution();
    track('Decision Frame Product Visit', {
      source: attribution.source,
      medium: attribution.medium,
      campaign_id: attribution.campaignId,
      content_id: attribution.contentId,
      experiment_id: attribution.experimentId,
      channel: attribution.channel,
      community: attribution.community,
      landing_variant: attribution.landingVariant,
    });
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
        body: JSON.stringify({ api_key: KIT_PUBLIC_API_KEY, email }),
      });
      if (!res.ok) throw new Error('Request failed');

      const attribution = readAttribution();
      track('Decision Frame Signup', {
        source: attribution.source,
        medium: attribution.medium,
        campaign_id: attribution.campaignId,
        content_id: attribution.contentId,
        experiment_id: attribution.experimentId,
        channel: attribution.channel,
        community: attribution.community,
        cta: attribution.cta,
        landing_variant: attribution.landingVariant,
      });
      setEmail('');
      setLeaving(true);
      leaveTimeout.current = setTimeout(() => setStatus('success'), 150);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
        <p className="form-status form-status--success" role="status">
          Check your inbox and confirm your address. The Decision Frame will arrive immediately after.
        </p>
      </div>
    );
  }

  return (
    <div className="field-row-wrapper" style={{ minHeight: '4.75rem' }}>
      <form className={`field-row ${leaving ? 'is-leaving' : ''}`} onSubmit={handleSubmit} aria-label="Get the free Decision Frame">
        <label htmlFor="email_address" className="sr-only">Email address</label>
        <input id="email_address" name="email_address" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={dark ? 'btn btn-on-dark' : 'btn btn-primary'} type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
        {status === 'error' && <p className="form-status form-status--error" role="alert">The form could not be sent. Try again, or email hello@greensquare.ai.</p>}
        <p className="form-note" style={{ width: '100%' }}>{fineprint}</p>
      </form>
    </div>
  );
}
