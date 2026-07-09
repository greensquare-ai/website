# GreenSquare site roadmap (post-launch)

Launch goal is email capture: give away the free Decision Frame in exchange for an address. Everything
below is deliberately parked until that funnel is proven, then reintroduced.

## Parked for launch

- **Pricing page + buy flow.** The pricing page is kept in the repo, unlinked, at
  `src/pages/_pricing.astro` (the `_` prefix excludes it from the build). `/pricing` redirects to `/`.
  When we reintroduce paid conversion: rename it back to `pricing.astro`, remove the redirect in
  `astro.config.mjs`, restore the Pricing link in the nav and footer, and restore the `$49` / `$59`
  buy CTAs on the product page.
- **Stripe checkout.** The Stripe Payment Link is still wired in `_pricing.astro` (dormant). Before it
  goes live again, configure Stripe Tax and post-payment file delivery.
- **Team tier (A$490, 10 seats).** Held with pricing; reintroduce on the same pass.

## Later

- Gemini benchmark leg (pre-registered, pending) to complete the three-model grid, then publish full
  transcripts.
- Custom domain cutover from the Framer waitlist once the Astro site reaches parity.
