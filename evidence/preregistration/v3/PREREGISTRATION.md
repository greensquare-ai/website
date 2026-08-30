# GreenSquare benchmark v3: pre-registration record

This file records the SHA-256 hashes of the frozen benchmark inputs. The hashes allow readers to verify that the cases, fact sheets, scoring rubric, sealed answer and product version were fixed before the scored runs began.

**Status: COMMITTED.** The pre-registration commit was authored and committed on 5 July 2026 before the scored grid began. The times below are git's authored and committer times; this record holds no independent evidence of when the commit was pushed.

## Hashed inputs

| File | SHA-256 |
|---|---|
| `cases/case-A-anchor-client.md` | `A4C362DC086D6FD9EE94D3F4CD53C6279ACD3C66D3148FE98F066544D5CF351C` |
| `cases/case-B-go-case.md` | `3776F6C7A0C6C71B5E444411C3AFB8EEE5B5DE3A31E3C9EC6D1E6C330FD1C941` |
| `cases/case-C-disguised-real.md` | `5D8FEB7A5F267A791455767EF89B55281B22D871F3148FBD862E5828B806C39E` |
| `protocol.md` | `E003D94C64F207CF03EB79805830AA743939D3DB3F3457E1AA241318B7C32CE6` |
| `rubric-operationalisations.md` | `9EC0DA0E97088B1584B0958798928ED3F72C10FCFB33392C254CC7FE4C400700` |
| `reference-answers-SEALED.md` | `7D1ED905C88B1288179B4892DE2D6251ED4350CC78CEBA860A1C8042E3B01FCA` |

## Product version

The product tested was `decision-brief-v2.0.md`.

SHA-256: `3FF4672830AD1AB590AFD58F0D56DDC4B14E095588F730FACACD14CE3ABBE1E1`

The paid product file is withheld from the public repository. A buyer can hash their copy and confirm that it matches the tested version.

## Sealed answer

The sealed answer remains withheld until the full scored grid is complete. Its hash fixes the answer in advance without revealing it during scoring. When the file is released, readers can confirm that it matches the hash recorded above.

## Commit record

Commit: `3e5e46f1a7cc154e1b91120ec9336e3eb089fd2c`

Authored: 5 July 2026 at 09:10:37 AEST. Committed: 5 July 2026 at 09:17:03 AEST.

**Correction, 11 August 2026.** This entry previously recorded the commit as
`5e89de4842693444c27e893470efecb242486cd2`. That identifier exists in no ref in this repository, so
anyone who followed the verification procedure below failed at its first step, and the failure would
have looked like their own mistake. The identifier above is the real pre-registration commit,
verified with `git cat-file`. The error is reported as departure 3 on the benchmark page. The
timestamps stated here are the commit's authored and committer times as recorded by git; they are not
independent evidence of when the commit was pushed.

Repository: `github.com/ks-projects-66/greensquare`

The published file hashes were checked against the table above.

## How to verify

1. Download the published inputs from the pre-registration commit.
2. Calculate the SHA-256 hash of each file.
3. Confirm that each hash matches the table above.
4. Confirm that the commit timestamp predates the scored run dates.
5. When the sealed answer is released, hash it and compare it with the recorded value.
