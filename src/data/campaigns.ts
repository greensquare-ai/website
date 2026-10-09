/**
 * The campaign tag values the site will record. Anything else is recorded as `other`.
 *
 * Tags arrive in links other people write, so a value can carry an email address, a
 * name or a token. Pattern filters were tried and let those through, so only values on
 * these lists are kept. To track a new campaign, add its id here before its links go out:
 * lowercase letters, digits and hyphens, matching the utm value exactly.
 */
export const knownSources = [
  'linkedin', 'x', 'twitter', 'facebook', 'instagram', 'reddit', 'youtube', 'threads', 'bluesky',
  'google', 'bing', 'duckduckgo', 'chatgpt', 'perplexity',
  'newsletter', 'kit', 'email', 'partner', 'podcast', 'event',
] as const;

export const knownMediums = ['social', 'email', 'cpc', 'paid', 'organic', 'referral', 'partner', 'display', 'video', 'qr'] as const;

export const knownCampaigns = ['greensquare-free', 'frame-free-launch'] as const;

export const knownContents: readonly string[] = [];
