# Pre-registration — GreenSquare benchmark v3

*This file records the SHA-256 hashes of the frozen benchmark inputs. Its purpose: to let anyone verify that the cases, fact sheets, scoring rubric, and the sealed answer key were fixed BEFORE any scored run, so the scoring cannot have been fitted to the results. The pre-registration becomes real when this file (and the hashed files) are committed to the public repo `ks-projects-66/greensquare` under `evidence/preregistration/` and time-stamped by the commit.*

**Status: PREPARED, NOT YET COMMITTED.** Hashes computed 2026-07-04 by the build. The commit (the actual pre-registration act) is left for Karim to push, since it writes to the public repo. Do not begin scored grid runs until this is committed. The pilot (n=3, Case A, Claude only) is a design-phase check and runs before pre-registration by design; its runs are not pooled with the pre-registered grid.

## Hashed inputs (SHA-256)

| File | SHA-256 |
|---|---|
| `cases/case-A-anchor-client.md` | `A4C362DC086D6FD9EE94D3F4CD53C6279ACD3C66D3148FE98F066544D5CF351C` |
| `cases/case-B-go-case.md` | `3776F6C7A0C6C71B5E444411C3AFB8EEE5B5DE3A31E3C9EC6D1E6C330FD1C941` |
| `cases/case-C-disguised-real.md` | `5D8FEB7A5F267A791455767EF89B55281B22D871F3148FBD862E5828B806C39E` |
| `protocol.md` | `E003D94C64F207CF03EB79805830AA743939D3DB3F3457E1AA241318B7C32CE6` |
| `rubric-operationalisations.md` | `9EC0DA0E97088B1584B0958798928ED3F72C10FCFB33392C254CC7FE4C400700` |
| `reference-answers-SEALED.md` | `7D1ED905C88B1288179B4892DE2D6251ED4350CC78CEBA860A1C8042E3B01FCA` |

The product under test is `decision-brief-v2.0.md`. Its SHA-256 is `3FF4672830AD1AB590AFD58F0D56DDC4B14E095588F730FACACD14CE3ABBE1E1`. The product file itself is the paid product and is deliberately NOT published here; only its hash is, which is enough to prove the exact version benchmarked without giving the product away. A buyer can hash their copy and confirm it matches.

`reference-answers-SEALED.md` is likewise NOT included in this commit; only its hash (in the table above) is published now. The file is released after scoring completes, and anyone can then confirm it matches its hash, proving the answer key was fixed before the runs without revealing it during scoring.

The cases, fact sheets, protocol, rubric, and methodology ARE published in full here: they are the reproduction pack, and a skeptic is meant to run them.

## How to verify (for a skeptic)
1. Download the six files above from the pre-registration commit.
2. Run `sha256sum <file>` (or PowerShell `Get-FileHash -Algorithm SHA256`) on each.
3. Confirm the hashes match this table and that the commit timestamp predates the run dates recorded in `methodology.md`.
4. `reference-answers-SEALED.md` is published only after scoring completes; its hash here proves it was fixed in advance without revealing the answer key during scoring.

## To commit (Karim, when ready)
```
# from the greensquare repo working tree
mkdir -p evidence/preregistration/v3
cp <these six files + decision-brief-v2.0.md> evidence/preregistration/v3/
git add evidence/preregistration/v3
git commit -m "Pre-register benchmark v3: cases, fact sheets, rubric, sealed answer key (hashes in PREREGISTRATION.md)"
git push
# then record the commit SHA and UTC timestamp below
```

Commit SHA: `5e89de4842693444c27e893470efecb242486cd2`  ·  pushed 2026-07-05 09:17 +1000 (AEST) to `github.com/ks-projects-66/greensquare` main, under `evidence/preregistration/v3/`. Remote blob hashes verified against this file's table. This is the pre-registration of record; scored grid runs begin after this.
