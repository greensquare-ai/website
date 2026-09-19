/* Every quoted string in src/data/brief-excerpt.ts must appear verbatim in the
   demonstration transcript, allowing only for line wrapping and curly quotes.
   Strings marked `paraphrased: true` are checked for their key phrases instead. */
import { readFileSync } from 'node:fs';

const norm = (s) => s.replace(/\*\*/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const transcript = norm(readFileSync('src/data/demonstrations/demo-1.md', 'utf8').replace(/^> ?/gm, ''));
const source = readFileSync('src/data/brief-excerpt.ts', 'utf8');

const quoted = [...source.matchAll(/(?:text|question|answer|consequence|reframe): (['"`])((?:\\.|(?!\1).)*)\1/g)].map((m) => m[2]);
const paraphrased = new Set(['A formal go/no-go gate for 15 January, with the rollback rehearsal and costed failure case reporting by 12 December.']);
let failed = 0;
for (const q of quoted) {
  const s = norm(q.replace(/\\'/g, "'"));
  if (paraphrased.has(s)) {
    const ok = ['go/no-go gate for 15 January', 'reporting by 12 December'].every((k) => transcript.includes(k));
    console.log(ok ? 'PASS (paraphrase, phrases present)' : 'FAIL', s.slice(0, 70));
    if (!ok) failed++;
    continue;
  }
  const ok = transcript.includes(s);
  console.log(ok ? 'PASS' : 'FAIL', s.slice(0, 70) + (s.length > 70 ? '…' : ''));
  if (!ok) failed++;
}
console.log(`${quoted.length} excerpts checked, ${failed} failed`);
process.exit(failed ? 1 : 0);
