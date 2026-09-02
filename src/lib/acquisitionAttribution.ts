export type AcquisitionAttribution = {
  source: string;
  medium: string;
  campaignId: string;
  contentId: string;
  channel: string;
  cta: string;
  firstLandingPath: string;
  productCampaign: string;
  productVersion: string;
};

const ATTRIBUTION_KEY = 'gs_acquisition_v2';
const PRODUCT_CAMPAIGN = 'greensquare-free';
const PRODUCT_VERSION = '2.0-beta.2';

const fallback: AcquisitionAttribution = {
  source: 'direct',
  medium: 'none',
  campaignId: PRODUCT_CAMPAIGN,
  contentId: 'none',
  channel: 'unknown',
  cta: 'greensquare_free_email',
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
    channel: params.get('gs_channel') ?? previous.channel ?? params.get('utm_medium') ?? 'unknown',
    cta: params.get('gs_cta') ?? previous.cta ?? 'greensquare_free_email',
    firstLandingPath: previous.firstLandingPath ?? window.location.pathname,
    productCampaign: PRODUCT_CAMPAIGN,
    productVersion: PRODUCT_VERSION,
  };

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // The current-page attribution remains usable when storage is unavailable.
  }

  return attribution;
}

export function attributionAnalyticsProperties(attribution: AcquisitionAttribution) {
  return {
    source: attribution.source,
    medium: attribution.medium,
    campaign_id: attribution.campaignId,
    content_id: attribution.contentId,
    channel: attribution.channel,
    cta: attribution.cta,
    first_landing_path: attribution.firstLandingPath,
    product_campaign: attribution.productCampaign,
    product_version: attribution.productVersion,
  };
}
