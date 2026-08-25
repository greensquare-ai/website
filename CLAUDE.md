# Claude Code instructions

Read and follow `AGENTS.md` before changing this repository.

For public-facing work, treat `qa/public-brand/BRAND_CAPITAL_GATE.md` as a release-blocking design standard, not optional polish. A technically correct surface that looks like generic AI/SaaS design does not ship.

When Context7 is configured in the local Claude Code environment, use it for current, version-specific library/API documentation before implementing or changing framework integrations. Context7 is development tooling only and must not become a production website dependency.

After changing React code, run the repository's React hooks lint gate and React Doctor changed-code/design checks. Use React Scan only as a preview diagnostic when render churn or interactive performance warrants it; do not ship React Scan instrumentation.
