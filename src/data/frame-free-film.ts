/**
 * The Frame Free film on the homepage, stated once: the section copy, the media, its
 * dimensions, the accessible description and the text equivalent.
 *
 * The film depicts the worked example printed on page 5 of the Frame Free guide
 * (public/frame-free.pdf), "The software was the surface". The text equivalent below
 * quotes that page and the guide's seven-part framing handoff (page 2). Three changes
 * are deliberate and are the only ones:
 *
 * 1. The guide prints the evidence classes and constraint states in capitals. The site
 *    sets labels in sentence case (docs/decisions.md, 4 September 2026), so they read
 *    Given, Derived, Inferred, Unknown, Verified and Assumed.
 * 2. The guide asks for each constraint to be marked verified or assumed. The worked
 *    example describes both constraints as untested without printing the word, so the
 *    state is written beside each one in plain words. Both are Assumed: one is "treated
 *    as fixed" while extensions exist, the other "has not been retested".
 * 3. The guide states the budget cap as a dollar figure. A dollar amount beside a free
 *    offer reads as a price, and scripts/check-copy.mjs fails any visible currency
 *    figure outside the benchmark, so the figure is omitted and the sentence otherwise
 *    kept: "The budget cap was set two years ago and has not been retested."
 *
 * Quotation marks are set curly, as qa/check-excerpts.mjs allows for the brief excerpt.
 */

/** Where the composition switches. Below this width the mobile film and poster are served. */
export const filmBreakpoint = 768;

export interface FilmAsset {
  video: string;
  poster: string;
  width: number;
  height: number;
  /** The media query this asset is served under. */
  media: string;
}

/**
 * The two compositions. The real film replaces these files under the same names. The
 * mobile size is held here and nowhere else: if the storyboard settles on 9:16, change
 * `height` to 1920 and the reserved box, the poster and the QA follow.
 */
export const filmMedia: { desktop: FilmAsset; mobile: FilmAsset } = {
  desktop: {
    video: '/media/frame-free-film-desktop.mp4',
    poster: '/media/frame-free-film-desktop-poster.webp',
    width: 1920,
    height: 1080,
    media: `(min-width: ${filmBreakpoint}px)`,
  },
  mobile: {
    video: '/media/frame-free-film-mobile.mp4',
    poster: '/media/frame-free-film-mobile-poster.webp',
    width: 1080,
    height: 1350,
    media: `(max-width: ${filmBreakpoint - 1}px)`,
  },
};

export type EvidenceTone = 'given' | 'derived' | 'inferred' | 'unknown' | 'verified' | 'assumed';

/** One line of a handoff part. `word` is an evidence class or constraint state set as a coloured word. */
export interface HandoffLine {
  word?: { text: string; tone: EvidenceTone };
  /** A sub-label inside a part, used where the guide's seventh part carries two rows. */
  lead?: string;
  text: string;
}

export interface HandoffPart {
  label: string;
  lines: HandoffLine[];
}

/** The seven parts of the framing handoff, in the guide's order. */
const handoffParts: HandoffPart[] = [
  {
    label: 'Presented decision',
    lines: [{ text: 'Choose vendor A or vendor B by the end of the month. The trigger is a renewal notice.' }],
  },
  {
    label: 'Decision underneath',
    lines: [{ text: 'Rosters are rebuilt by hand every week because the shift rules keep changing. The real question is what those rules should be.' }],
  },
  {
    label: 'Missing third option',
    lines: [{ text: 'Extend the current contract month to month, fix the roster rules first, then choose software against stable requirements.' }],
  },
  {
    label: 'Load-bearing assumption',
    lines: [{ text: '‘The pain is the software.’ If the pain is the rules, even the best platform changes nothing.' }],
  },
  {
    label: 'Untested constraints',
    lines: [
      { word: { text: 'Assumed', tone: 'assumed' }, text: 'The deadline is treated as fixed, but the vendor offers month-to-month extensions.' },
      { word: { text: 'Assumed', tone: 'assumed' }, text: 'The budget cap was set two years ago and has not been retested.' },
    ],
  },
  {
    label: 'Evidence map',
    lines: [
      { word: { text: 'Given', tone: 'given' }, text: 'current licence cost; rosters are rebuilt weekly.' },
      { word: { text: 'Derived', tone: 'derived' }, text: 'about 15 hours a week are lost to manual fixes.' },
      { word: { text: 'Inferred', tone: 'inferred' }, text: 'some turnover traces to roster chaos.' },
      { word: { text: 'Unknown', tone: 'unknown' }, text: 'whether award compliance is exposed.' },
    ],
  },
  {
    label: 'Reframed decision and evidence gap',
    lines: [
      { lead: 'Reframed decision', text: 'Verify the extension, stabilise the shift rules, then choose tooling against those rules.' },
      { lead: 'Evidence gap to test next', text: 'Confirm whether an award-compliance exposure already exists. If it does, the timing and scope of the next step change.' },
    ],
  },
];

export const frameFreeFilm = {
  id: 'worked-example',
  heading: 'One decision, framed before it is evaluated.',
  intro:
    'This is the worked example from the Frame Free guide: an operations manager told to choose between two rostering platforms before the current contract expires. The film follows the guide’s six questions in order, from the choice as presented to the decision underneath and the one evidence gap to test next. Frame Free stops before evaluation, so no option is scored and nothing is recommended.',

  /** Visually hidden figcaption. The film is muted and carries no information the text equivalent does not. */
  description:
    'A muted, looping film of the worked example from the Frame Free guide. A renewal notice asks an operations manager to choose between two rostering platforms. The guide’s six questions run in order: the decision underneath turns out to be the shift rules, a third option appears, the load-bearing assumption is named, the deadline and the budget cap are marked assumed, and each claim is tagged by its evidence class. The film ends on the reframed decision and the evidence gap to test next, without scoring or recommending an option. The complete text follows the film.',

  controls: {
    pause: 'Pause the film',
    play: 'Play the film',
  },

  textEquivalent: {
    summary: 'Read the worked example as text',
    label: 'The worked example from the Frame Free guide',
    title: 'The software was the surface',
    situation:
      'An operations manager at a 60-person home-services business is told to choose between two rostering platforms before the current contract expires.',
    parts: handoffParts,
    close: 'No options were scored. Nothing was recommended. The question became the right one - which is the point.',
  },
};
