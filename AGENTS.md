# Repository Guidelines

## Project Structure & Module Organization

`prototypes/` contains reusable Argo packages. Each `argo-<destination>/` directory has a normative `SKILL.md`, a machine-readable `argo.json`, embedded capabilities under `skills/`, and optional supporting material under `references/`. `skills/argo-creator/` is the repository copy of the authoring skill. Controlled studies live in `experiments/<experiment-id>/`; keep prompts, conditions, raw runs, blinded artifacts, scripts, and results in their existing subdirectories. Root documentation includes `README.md`, `AGENTS.md`, and public-repository policy files.

## Build, Test, and Development Commands

There is no application build or package-manager setup. Use the checked-in Node.js scripts directly:

```bash
node experiments/e1.1/scripts/blind-runs.mjs
node experiments/e1.1/scripts/aggregate-results.mjs
node --check experiments/e1.1/batch-2/scripts/aggregate-results.mjs
git diff --check
```

The first two regenerate blinded fixtures and summaries for batch 1. Use the equivalent scripts under `batch-2/` for that batch. Run `git diff --check` before every commit and inspect `git status --short` plus the staged diff.

## Coding Style & Naming Conventions

English is required for tracked code, documentation, fixtures, reports, and commit messages. Use two-space indentation in JSON and JavaScript, ESM syntax in `.mjs` files, concise Markdown headings, and trailing newlines. Use lowercase kebab-case paths such as `argo-write-article` and `task-01.md`. Argo directories require the `argo-` prefix; member Skill names do not. Treat `SKILL.md` as authoritative when it conflicts with `argo.json`.

## Testing Guidelines

Experiments are the primary test suite. Preserve condition isolation, anonymize outputs before evaluation, validate every receipt and result as JSON, and never include hidden chain-of-thought. Name outputs `task-<number>.md` and evaluator files `evaluator-<model>.json`. No global coverage threshold exists; each experiment defines its rubric and decision rule.

## Commit & Pull Request Guidelines

Use focused Conventional Commits, for example `feat(argo-write-article): add QA fallback` or `test(experiment): record E1.1 runs`. PRs must explain intent, list validation performed, identify protocol deviations, and link the relevant issue or Notion experiment. Add screenshots only for visual changes.

## Public Repository & Agent Notes

Assume every tracked artifact is public. Never commit secrets, private URLs, personal data, unredacted logs, or material with unclear redistribution rights.

For `/init`, use the canonical Notion path `Ali B. Workspace → Build Studio → Project Portfolio → Argos Project`. Fetch Argos Project (`3cfeba09-656f-8094-90c8-e2f63a93b2bb`) first and Argos Documentation (`3caeba09-656f-8002-91ac-faa0ce6a3524`) for the conceptual model. Query Argo Research Lab (`collection://6fe58d55-2238-4c5d-8b01-713931a38c86`) or Argo Conclusions (`collection://207e60a4-bdd1-45f9-bdc5-ca95db8377a7`) instead of searching the workspace broadly.
