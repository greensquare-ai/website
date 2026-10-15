# Frame Free journey events

What each analytics event means, and what it does not mean. Code: `src/lib/frameFreeEvents.ts`.

## Properties

The Vercel Pro plan records two custom properties per event (eight with the Web Analytics Plus add-on), so every event carries exactly two:

| Property | Holds | Example |
|---|---|---|
| `cta` | Event schema version and the fixed placement identifier; for `frame_free_role_selected`, the placement plus the chosen role id | `ff1:home_hero`, `ff1:free_hero_role_strategy` |
| `touch` | First touch and latest campaign, each as source/medium/campaign plus landing path | `f:linkedin/social/frame-free-launch/free/\|l:direct/none/none/` |

Campaign values come only from `utm_source`, `utm_medium` (or `gs_channel`), `utm_campaign` and `utm_content`. A value is kept only if it is on the allowlists in `src/data/campaigns.ts`; any other value is recorded as `other`. Pattern filters were tried first and let disguised email addresses, names and tokens through, so the allowlist is the mechanism. **Add a campaign's id to `src/data/campaigns.ts` before its links go out**, or its events will read `other`. The landing path is kept only as the top-level site section (`/other` for anything else). The typed email address and any decision text are never passed to analytics at all.

The served PDF is identified per deployment by its SHA-256 in `src/data/frame-free-release.json`, checked at build time by `scripts/pdf-manifest.mjs`.

## Events

| Event | Fires when | Means | Does not mean |
|---|---|---|---|
| `GreenSquare Free Signup Attempt` | A valid address is submitted | A capture was attempted | Anything was accepted |
| `GreenSquare Free Signup Success` | Kit returns a success response | Kit accepted the request | The address is confirmed, or an email arrived |
| `GreenSquare Free Signup Error` | Kit rejects, the network fails or 15 seconds pass | The capture failed | The visitor gave up |
| `frame_free_pdf_ready` | The accepted state shows the download | Delivery was offered | The file was downloaded |
| `frame_free_pdf_requested` | A Download or Open PDF link is activated | The file was requested | The file was saved or read |
| `frame_free_start_viewed` | The /start/ page loads | Guidance was viewed | A chat was started |
| `frame_free_starter_copied` | The clipboard write succeeds | The starter was copied | It was pasted or used |
| `frame_free_example_selected` | A decision situation link is followed | Interest in that situation | Relevance was confirmed |
| `frame_free_role_selected` | A visitor answers the optional role question shown after the PDF is offered. `cta` holds `ff1:<placement>_role_<id>` (`strategy`, `consultant`, `owner`, `functional` or `other`) | The visitor's self-described role, for audience fit by source | Anything about a specific Kit contact. The event carries no identifier shared with Kit, so it is not joined to an email address. It counts answers, not people: only visitors who answer are counted, and a visitor who submits two forms can answer twice |

The three signup event names keep the retired product name on purpose: they are the keys of a running time series.

## Counting people

Kit is the record of distinct captured contacts and, separately, of confirmed contacts. A repeat submission by the same address is one contact in Kit and two `Signup Success` events here.

Vercel's anonymous visitor identifier resets daily, so event counts cannot be joined to Kit contacts or deduplicated across days. `frame_free_pdf_requested` counts link activations, not people. A unique downloader count is not established by these events. Downloads through the no-script fallback link, or by anyone opening `/frame-free.pdf` directly, are not email captures and are not attributed.
