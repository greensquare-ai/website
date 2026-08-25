export type AcquisitionAttribution = {
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
  productCampaign: string;
  productVersion: string;
};

const ATTRIBUTION_KEY = 'gs_first_1000_attribution';
const PRODUCT_CAMPAIGN = 'decision-frame-v2';
const PRODUCT_VERSION = '2.0-beta.2';

const fallback: AcquisitionAttribution = {
  source: 'direct',
  medium: 'none',
  campaignId: PRODUCT_CAMPAIGN,
  contentId: 'none',
  experimentId: 'none',
  channel: 'unknown',
  community: 'none',
  cta: 'decision_frame_email',
  landingVariant: 'decision-frame-v2',
  firstLandingPath: '/',
  productCampaign: PRODUCT_CAMPAIGN,
  productVersion: PRODUCT_VERSION,
};

export function readAttribution(): AcquisitionAttribution {
  if (typeof window === 'undefined') return fallback;

  const params = new URLSearchParams(window.location.search);
  let previous: Partial<AcquisitionAttribution> = {};

  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (stored) previous = JSON.parse(stored) as Partial<AcquisitionAttribution>;
  } catch {
    previous = {};
  }

  const attribution: AcquisitionAttribution = {
    source: params.get('utm_source') ?? previous.source ?? 'direct',
    medium: params.get('utm_medium') ?? previous.medium ?? 'none',
    campaignId: params.get('utm_campaign') ?? previous.campaignId ?? PRODUCT_CAMPAIGN,
    contentId: params.get('utm_content') ?? previous.contentId ?? 'none',
    experimentId: params.get('gs_experiment') ?? previous.experimentId ?? 'none',
    channel: params.get('gs_channel') ?? previous.channel ?? params.get('utm_medium') ?? 'unknown',
    community: params.get('gs_community') ?? previous.community ?? 'none',
    cta: params.get('gs_cta') ?? previous.cta ?? 'decision_frame_email',
    landingVariant: params.get('gs_variant') ?? previous.landingVariant ?? 'decision-frame-v2',
    firstLandingPath: previous.firstLandingPath ?? window.location.pathname,
    productCampaign: PRODUCT_CAMPAIGN,
    productVersion: PRODUCT_VERSION,
  };

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution remains usable for the current page even when storage is blocked.
  }

  return attribution;
}

export function attributionAnalyticsProperties(attribution: AcquisitionAttribution) {
  return {
    source: attribution.source,
    medium: attribution.medium,
    campaign_id: attribution.campaignId,
    content_id: attribution.contentId,
    experiment_id: attribution.experimentId,
    channel: attribution.channel,
    community: attribution.community,
    cta: attribution.cta,
    landing_variant: attribution.landingVariant,
    first_landing_path: attribution.firstLandingPath,
    product_campaign: attribution.productCampaign,
    product_version: attribution.productVersion,
  };
}
