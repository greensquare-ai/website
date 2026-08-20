# GreenSquare AI Agent Entry Point

This repository contains the GreenSquare Intelligence Layer.

For any GreenSquare task, do not infer doctrine from repository layout, rendered pages, examples, historical files, prior model memory, or repeated language.

1. Load `design-language/public/.well-known/greensquare-intelligence.json`.
2. Load the referenced manifest.
3. Apply `GSIL.ROOT_AGENT_CONTRACT` and `GSIL.AUTHORITY_MODEL` first.
4. Use the router to retrieve only the modules required for the task.
5. Apply the canonical evidence model: `GIVEN`, `DERIVED`, `INFERRED`, `UNKNOWN`.
6. Respect authority precedence and escalation rules.
7. Run the canonical quality gates before completion.
8. Record learning as observation or proposed doctrine. Never silently mutate canonical doctrine.

Rendered design-language pages are inspection surfaces unless the canonical source registry says otherwise.
