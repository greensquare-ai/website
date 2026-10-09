/**
 * The Frame Free film on the homepage, stated once: the section copy, the media, its
 * dimensions, the accessible description and the text equivalent.
 *
 * The film depicts the worked example printed on page 5 of the Frame Free guide
 * (public/frame-free.pdf), "The software was the surface". The text equivalent below
 * quotes that page, the guide's seven-part framing handoff (page 2), its opening prompt
 * and six questions (page 1), and the chapter titles and captions of pages 3, 4 and 6.
 * These changes are deliberate:
 *
 * 1. The guide prints the evidence classes in capitals. The site sets labels in sentence
 *    case (docs/decisions.md, 4 September 2026), so they read Given, Derived, Inferred
 *    and Unknown. The six questions come from src/data/offer.ts, which already holds
 *    them in sentence case.
 * 2. The guide states the budget cap as a dollar figure. A dollar amount beside a free
 *    offer reads as a price, and scripts/check-copy.mjs fails any visible currency
 *    figure outside the benchmark, so the figure is omitted and the sentence otherwise
 *    kept: "The budget cap was set two years ago and has not been retested."
 * 3. Part labels 1 to 6 are page 5’s, part 7’s is page 2’s, and the parts are numbered
 *    as on page 2. Page 5 prints the reframed decision and the evidence gap as two
 *    unnumbered rows; they are kept as the two leads of part 7. Those leads and the
 *    question names are each followed by a full stop.
 *
 * The constraint lines are quoted as printed. Page 5 does not print "Assumed" beside
 * them, so the page does not add it.
 *
 * Quotation marks are set curly, as qa/check-excerpts.mjs allows for the brief excerpt.
 */
import { freeQuestions } from './offer';

/** Where the composition switches. Below this width, in portrait, the mobile film and poster are served. */
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
 *
 * The portrait composition is served only in portrait. A landscape phone narrower than
 * the breakpoint gets the 16:9 film, which fits its screen. The mobile query ends at
 * 767.98px so that no fractional width under zoom or display scaling falls between the
 * two; the loader picks the file from the mobile query alone, so the desktop query is
 * its complement and is not used to select anything.
 */
export const filmMedia: { desktop: FilmAsset; mobile: FilmAsset } = {
  desktop: {
    video: '/media/frame-free-film-desktop.mp4',
    poster: '/media/frame-free-film-desktop-poster.webp',
    width: 1920,
    height: 1080,
    media: `(min-width: ${filmBreakpoint}px), (orientation: landscape)`,
  },
  mobile: {
    video: '/media/frame-free-film-mobile.mp4',
    poster: '/media/frame-free-film-mobile-poster.webp',
    width: 1080,
    height: 1350,
    media: `(max-width: ${filmBreakpoint - 0.02}px) and (orientation: portrait)`,
  },
};

export type EvidenceTone = 'given' | 'derived' | 'inferred' | 'unknown';

/** One line of a handoff part. `word` is an evidence class set as a coloured word. */
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
      { text: 'The deadline is treated as fixed, but the vendor offers month-to-month extensions.' },
      { text: 'The budget cap was set two years ago and has not been retested.' },
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
    label: 'Reframed decision and the single evidence gap to verify next',
    lines: [
      { lead: 'Reframed decision', text: 'Verify the extension, stabilise the shift rules, then choose tooling against those rules.' },
      { lead: 'Evidence gap to test next', text: 'Confirm whether an award-compliance exposure already exists. If it does, the timing and scope of the next step change.' },
    ],
  },
];

/** One of the guide's six questions, as the film puts it on screen. */
export interface FilmQuestion {
  n: number;
  name: string;
  text: string;
  /** A muted line the film shows under the question, quoted from the same page. */
  note?: string;
}

const questions: FilmQuestion[] = freeQuestions.map(([name, text], i) => ({
  n: i + 1,
  name,
  text,
  ...(i === 2 ? { note: 'Do not evaluate it yet.' } : {}),
}));

export const frameFreeFilm = {
  id: 'worked-example',
  heading: 'A vendor choice, framed before it is evaluated.',
  intro:
    'This is the worked example from the Frame Free guide: an operations manager told to choose between two rostering platforms before the current contract expires. The film runs the guide’s six questions in order. Frame Free stops before evaluation: neither platform is scored, compared or chosen.',

  /** The provenance line in the exhibit's head, as every other exhibit on the site carries. */
  exhibit: { name: 'Worked example', source: 'from the Frame Free guide, page 5' },

  /**
   * Visually hidden figcaption, true whether the reader gets the film or its still frame.
   * The film is muted and must carry no information the text equivalent does not; check
   * the final cut before replacing the placeholders.
   */
  description:
    'The worked example from the Frame Free guide, as a muted film; a still frame is shown when motion is reduced or scripts are off. An operations manager is told to choose between two rostering platforms, and the trigger is a renewal notice. The guide’s six questions run in order: the real question turns out to be what the shift rules should be, a third option appears, the load-bearing assumption is named, the deadline and the budget cap are shown to be untested, and each material claim is tagged by its evidence class. The film ends on the reframed decision and the single evidence gap to test next, and no option is scored or chosen. The complete text follows.',

  controls: {
    pause: 'Pause the film',
    play: 'Play the film',
  },

  /**
   * Everything the film shows, in the film's order: the opening prompt, the six questions
   * under the guide's two chapter titles, the handoff under the third, the stop line and
   * the close. qa/check-frame-free-film.mjs holds the film's on-screen copy separately
   * (qa/frame-free-film-onscreen.json) and fails if any of it is missing here.
   */
  textEquivalent: {
    summary: 'Read the worked example as text',
    label: 'The worked example from the Frame Free guide',
    title: 'The software was the surface',
    situation:
      'An operations manager at a 60-person home-services business is told to choose between two rostering platforms before the current contract expires.',
    prompt: { lead: 'Start with', text: 'Use Frame Free in this PDF. Ask me one question at a time.' },
    chapters: [
      {
        title: 'Find the question behind the question',
        caption: 'The first three moves make the decision explicit, expose the deeper issue and reopen the option set.',
        questions: questions.slice(0, 3),
      },
      {
        title: 'Separate evidence from assumption',
        caption: 'The final three moves identify the belief carrying the decision, test what has been treated as fixed and make the evidence state visible.',
        questions: questions.slice(3),
      },
    ],
    handoffTitle: 'Framed is not decided',
    parts: handoffParts,
    stop: 'Stop here. Framing prepares a decision; it does not make the decision.',
    close: 'No options were scored. Nothing was recommended. The question became the right one - which is the point.',
  },
};
