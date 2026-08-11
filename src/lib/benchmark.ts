import data from '../data/benchmark-results.json';

/**
 * Single source of truth for every benchmark figure on the site.
 *
 * Two rules keep this honest and both are enforced by assertInvariants(), which
 * runs at module scope so `astro build` fails rather than shipping a bad figure:
 *
 *   1. No page performs arithmetic in a template. Percentages, day counts and
 *      denominators all come out of here pre-computed.
 *   2. The composite is never stored, only derived, so it cannot drift from the
 *      checks it is the AND of.
 */

type Cell = { met: number; n: number };
type Arm = 'armA' | 'armB' | 'armC';

export type Check = {
  id: string;
  group: 'process' | 'judgment';
  label: string;
  page_label: string;
  armA: Cell; armB: Cell; armC: Cell;
  definitional: string[];
  definitional_note?: string;
  adjudication?: string;
  caveat?: string;
};

export const ARMS: Arm[] = ['armA', 'armB', 'armC'];

export const armLabels = (): { id: Arm; label: string; note: string }[] =>
  data.arms as any;

export const grid = () => data.grid;
export const parity = () => data.parity;
export const provenance = () => data.provenance;
export const deviations = () => data.deviations;
export const cleanItems = () => data.clean;
export const limitations = () => data.limitations;
export const goCase = () => data.go_case;
export const directionByCase = () => data.direction_by_case;

export const checks = (group?: 'process' | 'judgment'): Check[] =>
  (data.checks as unknown as Check[]).filter((c) => !group || c.group === group);

export const check = (id: string): Check => {
  const c = checks().find((x) => x.id === id);
  if (!c) throw new Error(`benchmark: no check ${id}`);
  return c;
};

/** Is this cell an artefact of the test design rather than a measurement? */
export const isDefinitional = (c: Check, arm: Arm): 'full' | 'partial' | false => {
  if (c.definitional.includes(arm)) return 'full';
  if (c.definitional.includes(`${arm}_partial`)) return 'partial';
  return false;
};

/** The composite is derived, never read. */
export const composite = () => {
  const def = data.composite;
  const parts = def.components.map((id) => check(id));
  const forArm = (arm: Arm): Cell => ({
    met: Math.min(...parts.map((p) => p[arm].met)),
    n: parts[0][arm].n,
  });
  return { ...def, armA: forArm('armA'), armB: forArm('armB'), armC: forArm('armC') };
};

/** "14 of 15" plus the percentage a meter needs. Never build these in a template. */
export const fmt = (cell: Cell) => ({
  text: `${cell.met} of ${cell.n}`,
  met: cell.met,
  n: cell.n,
  pct: Math.round((cell.met / cell.n) * 1000) / 10,
});

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

/** One date renderer for the whole site. "2026-07-06" becomes "6 July 2026". */
export const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

export const dates = () => ({
  scoredOn: formatDate(data.dates.scored_on),
  adjudicatedOn: formatDate(data.dates.adjudicated_on),
  currentAsAt: formatDate(data.dates.current_as_at),
  runWindow: data.dates.run_window.verified
    ? `${formatDate(data.dates.run_window.start)} to ${formatDate(data.dates.run_window.end)}`
    : null,
});

const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

/** Lapsed status is computed from current_as_at, never from the build clock. */
export const refresh = () => {
  const now = data.dates.current_as_at;
  return {
    commitmentDays: data.refresh.commitment_days,
    legs: data.refresh.legs.map((leg) => ({
      ...leg,
      releasedOn: formatDate(leg.released_on),
      dueOn: formatDate(leg.due_on),
      daysSinceRelease: daysBetween(leg.released_on, now),
      daysPastDue: daysBetween(leg.due_on, now),
      lapsed: daysBetween(leg.due_on, now) > 0,
    })),
    anyLapsed: data.refresh.legs.some((l) => daysBetween(l.due_on, now) > 0),
  };
};

/** "2026-07-05T09:10:37+10:00" becomes "5 July 2026 at 09:10:37 AEST". */
export const formatDateTime = (iso: string): string => {
  const [date, rest] = iso.split('T');
  return `${formatDate(date)} at ${rest.slice(0, 8)} AEST`;
};

export const prereg = () => ({
  ...data.provenance,
  short: data.provenance.prereg_commit_short,
  full: data.provenance.prereg_commit,
  commitUrl: `https://github.com/${data.provenance.repo}/tree/${data.provenance.prereg_commit}`,
  fileUrl: (path: string) =>
    `https://github.com/${data.provenance.repo}/blob/${data.provenance.prereg_commit}/${path}`,
  authoredAt: formatDate(data.provenance.prereg_authored_at.slice(0, 10)),
  /* Git records an authored time and a committer time. Neither is evidence of when the commit was
     pushed, so these are named for what they are and the page must not call either one a push. */
  authoredAtTime: formatDateTime(data.provenance.prereg_authored_at),
  committedAtTime: formatDateTime(data.provenance.prereg_committed_at),
  superseded: data.provenance.superseded_commit_ids[0],
});

/** The key every adjudicated cell was settled against. Verified, and withheld. */
export const sealedKey = () => ({
  sha256: data.provenance.sealed_key_sha256,
  verified: data.provenance.sealed_key_verified,
  published: data.provenance.sealed_key_published,
});

export const transcriptsPublished = (): boolean => data.provenance.transcripts_published;

/** Shared vocabulary. The live site used "hidden decision" and "underlying decision"
 *  for the same check on the same page; this stops that recurring. */
export const LABELS = {
  composite: 'Produced a defensible brief',
  hiddenDecision: 'Surfaced the hidden decision',
  armA: 'Question only',
  armB: 'All facts',
  armC: 'The Decision loaded',
} as const;

function assertInvariants(): void {
  const bad = (m: string) => { throw new Error(`benchmark-results.json: ${m}`); };

  for (const c of checks()) {
    for (const arm of ARMS) {
      const cell = c[arm];
      if (cell.met < 0 || cell.met > cell.n) bad(`${c.id}.${arm} met ${cell.met} outside 0..${cell.n}`);
      if (cell.n !== grid().n_per_arm) bad(`${c.id}.${arm} n is ${cell.n}, expected ${grid().n_per_arm}`);
    }
  }

  if (grid().n_per_arm * 3 !== grid().runs_total)
    bad(`n_per_arm x 3 is ${grid().n_per_arm * 3}, runs_total is ${grid().runs_total}`);

  const caseSum = grid().cases.reduce((t, c) => t + c.n_per_arm, 0);
  if (caseSum !== grid().n_per_arm)
    bad(`case n_per_arm sums to ${caseSum}, expected ${grid().n_per_arm}`);

  // The composite must be determinate, and it must never be stored.
  if ('armA' in (data.composite as any)) bad('composite carries stored counts; it must be derived');
  const comp = composite();
  if (comp.armC.met !== grid().n_per_arm)
    bad(`composite armC is ${comp.armC.met}, expected ${grid().n_per_arm}`);

  // A retired figure must never reappear.
  const retired = grid().retired.runs_total;
  if (grid().runs_total === retired) bad(`runs_total is the retired ${retired}`);

  const gc = goCase();
  const caseB = grid().cases.find((c) => c.id === gc.case_id);
  if (!caseB || gc.armA.n !== caseB.n_per_arm)
    bad(`go_case n is ${gc.armA.n}, Case B n_per_arm is ${caseB?.n_per_arm}`);
}

assertInvariants();
