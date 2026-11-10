/**
 * The guide's worked example, as the pages show it, with the plain labels the site uses.
 *
 * The content is page 5 of the Frame Free guide (public/frame-free.pdf), "The software
 * was the surface", with the deliberate departures recorded in src/data/frame-free-film.ts
 * (sentence-case evidence labels, the budget figure omitted under the price guard). The
 * pages read it from here rather than from the film's data, so the film can be re-cut
 * without moving the page copy. frame-free-film.ts holds the film's own text version.
 *
 * Plain labels (10 November 2026). The marketing pages use plain words. The PDF and the
 * chat use the guide's terms, so /start/ prints both side by side and every other page
 * shows the plain label only. The guide's wording of each part's content is unchanged.
 */

export type EvidenceTone = 'given' | 'derived' | 'inferred' | 'unknown';

export interface ExampleLine {
  /** An evidence class, set as a coloured word before the line. */
  word?: { text: string; tone: EvidenceTone };
  /** A sub-label inside a part. */
  lead?: string;
  text: string;
}

export interface ExamplePart {
  /** The guide's own name for the part. */
  guide: string;
  /** The plain name the site shows. */
  plain: string;
  lines: ExampleLine[];
}

export const workedExample = {
  title: 'The software was the surface',
  situation:
    'An operations manager at a 60-person home-services business is told to choose between two rostering platforms before the current contract expires.',
  parts: [
    {
      guide: 'Presented decision',
      plain: 'The decision as it was brought',
      lines: [{ text: 'Choose vendor A or vendor B by the end of the month. The trigger is a renewal notice.' }],
    },
    {
      guide: 'Decision underneath',
      plain: 'The real question',
      lines: [{ text: 'Rosters are rebuilt by hand every week because the shift rules keep changing. The real question is what those rules should be.' }],
    },
    {
      guide: 'Missing third option',
      plain: 'The option nobody had considered',
      lines: [{ text: 'Extend the current contract month to month, fix the roster rules first, then choose software against stable requirements.' }],
    },
    {
      guide: 'Load-bearing assumption',
      plain: 'The assumption everything rests on',
      lines: [{ text: '‘The pain is the software.’ If the pain is the rules, even the best platform changes nothing.' }],
    },
    {
      guide: 'Untested constraints',
      plain: 'Limits nobody had checked',
      lines: [
        { text: 'The deadline is treated as fixed, but the vendor offers month-to-month extensions.' },
        { text: 'The budget cap was set two years ago and has not been retested.' },
      ],
    },
    {
      guide: 'Evidence map',
      plain: 'What is known, and what is guessed',
      lines: [
        { word: { text: 'Given', tone: 'given' }, text: 'current licence cost; rosters are rebuilt weekly.' },
        { word: { text: 'Derived', tone: 'derived' }, text: 'about 15 hours a week are lost to manual fixes.' },
        { word: { text: 'Inferred', tone: 'inferred' }, text: 'some turnover traces to roster chaos.' },
        { word: { text: 'Unknown', tone: 'unknown' }, text: 'whether award compliance is exposed.' },
      ],
    },
    {
      guide: 'Reframed decision and the single evidence gap to verify next',
      plain: 'The better question, and what to check first',
      lines: [
        { lead: 'Better question', text: 'Verify the extension, stabilise the shift rules, then choose tooling against those rules.' },
        { lead: 'Check first', text: 'Confirm whether an award-compliance exposure already exists. If it does, the timing and scope of the next step change.' },
      ],
    },
  ] satisfies ExamplePart[],
  stop: 'Framing prepares a decision; it does not make the decision.',
};

const part = (guide: string) => workedExample.parts.find((p) => p.guide === guide)!;

/** The three lines the homepage before-and-after uses. */
export const beforeAfter = {
  before: part('Presented decision').lines[0].text,
  after: workedExample.parts[workedExample.parts.length - 1].lines[0].text,
  checkFirst: workedExample.parts[workedExample.parts.length - 1].lines[1].text,
};

/**
 * The six questions under plain names, in the guide's order. The question text itself is
 * the guide's and stays in src/data/offer.ts (freeQuestions), which the film's text
 * version also reads; only the name the site shows changes.
 */
export const plainQuestionNames = [
  'What you are deciding, and why now',
  'The real question',
  'The option you have not considered',
  'The assumption everything rests on',
  'Limits nobody has checked',
  'What is known, and what is guessed',
] as const;
